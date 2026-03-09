import { requireAdminAuth } from "../_lib/auth.js";
import { ensureSchema, getPool } from "../_lib/db.js";
import { json, methodNotAllowed } from "../_lib/http.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    methodNotAllowed(res, "GET");
    return;
  }

  if (!requireAdminAuth(req, res)) {
    return;
  }

  const requestedLimit = Number(req.query?.limit ?? 200);
  const limit = Number.isFinite(requestedLimit) ? Math.max(1, Math.min(1000, Math.floor(requestedLimit))) : 200;

  try {
    await ensureSchema();

    const [itemsResult, summaryResult] = await Promise.all([
      getPool().query(
        `
          SELECT id, event_type, season, name, phone, ip, user_agent, created_at
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
  } catch (error) {
    console.error("admin leads query error", error);
    json(res, 500, { ok: false, message: "리드 조회 중 오류가 발생했습니다." });
  }
}
