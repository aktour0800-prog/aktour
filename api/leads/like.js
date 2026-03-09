import { ensureSchema, getPool } from "../_lib/db.js";
import { getClientIp, getUserAgent, json, methodNotAllowed, readJsonBody } from "../_lib/http.js";

const ALLOWED_SEASONS = new Set(["spring", "fall", "winter"]);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    methodNotAllowed(res, "POST");
    return;
  }

  const body = await readJsonBody(req);
  const season = String(body.season ?? "").toLowerCase();

  if (!ALLOWED_SEASONS.has(season)) {
    json(res, 400, { ok: false, message: "유효하지 않은 시즌입니다." });
    return;
  }

  try {
    await ensureSchema();

    await getPool().query(
      `
        INSERT INTO lead_events (event_type, season, ip, user_agent)
        VALUES ('like', $1, $2, $3)
      `,
      [season, getClientIp(req), getUserAgent(req)],
    );

    json(res, 201, { ok: true });
  } catch (error) {
    console.error("like insert error", error);
    json(res, 500, { ok: false, message: "좋아요 저장 중 오류가 발생했습니다." });
  }
}
