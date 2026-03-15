import { ensureSchema, getPool } from "../_lib/db.js";
import { getClientIp, getUserAgent, json, methodNotAllowed, readJsonBody } from "../_lib/http.js";

const ALLOWED_SEASONS = new Set(["spring", "summer", "fall", "winter"]);
const ALLOWED_SURFACES = new Set([
  "header",
  "hero",
  "gallery",
  "final",
  "floating",
  "summer_top",
  "summer_final",
  "seat_sheet",
  "season_card",
]);

const sanitizeDeviceId = (value) => {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return null;
  }

  if (!/^[a-z0-9_-]{12,80}$/.test(normalized)) {
    return null;
  }

  return normalized;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    methodNotAllowed(res, "POST");
    return;
  }

  const body = await readJsonBody(req);
  const season = String(body.season ?? "summer").toLowerCase();
  const contact = String(body.contact ?? "상담 담당").trim().slice(0, 40);
  const surfaceRaw = String(body.surface ?? "hero").toLowerCase();
  const surface = ALLOWED_SURFACES.has(surfaceRaw) ? surfaceRaw : "hero";
  const path = String(body.path ?? "/").trim().slice(0, 120);
  const timestampRaw = String(body.timestamp ?? "").trim();
  const timestamp = timestampRaw && !Number.isNaN(Date.parse(timestampRaw)) ? timestampRaw : new Date().toISOString();
  const deviceId = sanitizeDeviceId(body.deviceId);

  if (!ALLOWED_SEASONS.has(season)) {
    json(res, 400, { ok: false, message: "유효하지 않은 시즌입니다." });
    return;
  }

  if (!contact) {
    json(res, 400, { ok: false, message: "contact 값이 필요합니다." });
    return;
  }

  const memo = `surface=${surface};path=${path};deviceId=${deviceId ?? "unknown"};timestamp=${timestamp}`;

  try {
    await ensureSchema();

    const result = await getPool().query(
      `
        INSERT INTO lead_events (event_type, season, name, memo, ip, user_agent)
        VALUES ('call_intent', $1, $2, $3, $4, $5)
        RETURNING id, created_at
      `,
      [season, contact, memo, getClientIp(req), getUserAgent(req)],
    );

    json(res, 201, { ok: true, item: result.rows[0] });
  } catch (error) {
    console.error("call-intent insert error", error);
    json(res, 500, { ok: false, message: "전화 의도 저장 중 오류가 발생했습니다." });
  }
}
