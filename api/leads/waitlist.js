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
  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").replace(/\D/g, "");

  if (!ALLOWED_SEASONS.has(season)) {
    json(res, 400, { ok: false, message: "유효하지 않은 시즌입니다." });
    return;
  }

  if (name.length < 2) {
    json(res, 400, { ok: false, message: "이름을 2글자 이상 입력해주세요." });
    return;
  }

  if (phone.length < 10 || phone.length > 11) {
    json(res, 400, { ok: false, message: "휴대폰 번호를 정확히 입력해주세요." });
    return;
  }

  try {
    await ensureSchema();

    const result = await getPool().query(
      `
        INSERT INTO lead_events (event_type, season, name, phone, ip, user_agent)
        VALUES ('waitlist', $1, $2, $3, $4, $5)
        RETURNING id, created_at
      `,
      [season, name, phone, getClientIp(req), getUserAgent(req)],
    );

    json(res, 201, { ok: true, item: result.rows[0] });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "23505") {
      json(res, 409, { ok: false, message: "이미 등록된 번호입니다." });
      return;
    }

    console.error("waitlist insert error", error);
    json(res, 500, { ok: false, message: "서버 저장 중 오류가 발생했습니다." });
  }
}
