import { requireAdminAuth } from "../_lib/auth.js";
import { ensureSchema, getPool } from "../_lib/db.js";
import { json, methodNotAllowed, readJsonBody } from "../_lib/http.js";

const FOLLOW_STATUS_SET = new Set(["new", "called", "no_answer", "inquiry_left", "closed"]);

const parseLeadId = (value) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
};

const handleGet = async (req, res) => {
  const requestedLimit = Number(req.query?.limit ?? 200);
  const limit = Number.isFinite(requestedLimit) ? Math.max(1, Math.min(1000, Math.floor(requestedLimit))) : 200;

  const [itemsResult, summaryResult] = await Promise.all([
    getPool().query(
      `
        SELECT id, event_type, season, name, phone, ip, user_agent, follow_up_status, memo, created_at, updated_at
        FROM lead_events
        ORDER BY created_at DESC
        LIMIT $1
      `,
      [limit],
    ),
    getPool().query(
      `
        SELECT event_type, season, COUNT(*)::int AS count
        FROM lead_events
        GROUP BY event_type, season
        ORDER BY event_type, season
      `,
    ),
  ]);

  json(res, 200, {
    ok: true,
    items: itemsResult.rows,
    summary: summaryResult.rows,
    generatedAt: new Date().toISOString(),
  });
};

const handlePatch = async (req, res) => {
  const body = await readJsonBody(req);
  const leadId = parseLeadId(body.id);
  const followUpStatus = String(body.follow_up_status ?? "").trim();
  const memo = String(body.memo ?? "").trim().slice(0, 500);

  if (!leadId) {
    json(res, 400, { ok: false, message: "유효한 id가 필요합니다." });
    return;
  }

  if (!FOLLOW_STATUS_SET.has(followUpStatus)) {
    json(res, 400, { ok: false, message: "유효하지 않은 상태값입니다." });
    return;
  }

  const result = await getPool().query(
    `
      UPDATE lead_events
      SET follow_up_status = $2,
          memo = $3,
          updated_at = NOW()
      WHERE id = $1
      RETURNING id, follow_up_status, memo, updated_at
    `,
    [leadId, followUpStatus, memo],
  );

  if (result.rowCount === 0) {
    json(res, 404, { ok: false, message: "대상을 찾을 수 없습니다." });
    return;
  }

  json(res, 200, { ok: true, item: result.rows[0] });
};

const handleDelete = async (req, res) => {
  const idFromQuery = req.query?.id;
  const leadId = parseLeadId(idFromQuery);

  if (!leadId) {
    json(res, 400, { ok: false, message: "유효한 id가 필요합니다." });
    return;
  }

  const result = await getPool().query(
    `
      DELETE FROM lead_events
      WHERE id = $1
      RETURNING id
    `,
    [leadId],
  );

  if (result.rowCount === 0) {
    json(res, 404, { ok: false, message: "삭제할 대상을 찾을 수 없습니다." });
    return;
  }

  json(res, 200, { ok: true, id: result.rows[0].id });
};

export default async function handler(req, res) {
  if (!requireAdminAuth(req, res)) {
    return;
  }

  if (req.method !== "GET" && req.method !== "PATCH" && req.method !== "DELETE") {
    methodNotAllowed(res, "GET, PATCH, DELETE");
    return;
  }

  try {
    await ensureSchema();

    if (req.method === "GET") {
      await handleGet(req, res);
      return;
    }

    if (req.method === "PATCH") {
      await handlePatch(req, res);
      return;
    }

    await handleDelete(req, res);
  } catch (error) {
    console.error("admin leads handler error", error);
    json(res, 500, { ok: false, message: "리드 처리 중 오류가 발생했습니다." });
  }
}
