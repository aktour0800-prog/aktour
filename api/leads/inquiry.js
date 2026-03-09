import { ensureSchema, getPool } from "../_lib/db.js";
import { getClientIp, getUserAgent, json, methodNotAllowed, readJsonBody } from "../_lib/http.js";

const ALLOWED_SEASONS = new Set(["spring", "summer", "fall", "winter"]);
const ALLOWED_CONTACTS = new Set(["엄태인 대표", "정수미 대표", "상관없음"]);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    methodNotAllowed(res, "POST");
    return;
  }

  const body = await readJsonBody(req);
  const season = String(body.season ?? "summer").toLowerCase();
  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").replace(/\D/g, "");
  const preferredContactRaw = String(body.preferredContact ?? "상관없음").trim();
  const preferredContact = ALLOWED_CONTACTS.has(preferredContactRaw) ? preferredContactRaw : "상관없음";
  const message = String(body.message ?? "").trim();

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

  if (message.length < 5) {
    json(res, 400, { ok: false, message: "문의 내용을 5자 이상 입력해주세요." });
    return;
  }

  if (message.length > 500) {
    json(res, 400, { ok: false, message: "문의 내용은 500자 이하로 입력해주세요." });
    return;
  }

  const memo = `희망 담당: ${preferredContact} | 문의 내용: ${message}`;

  try {
    await ensureSchema();

    const result = await getPool().query(
      `
        INSERT INTO lead_events (event_type, season, name, phone, memo, ip, user_agent)
        VALUES ('inquiry', $1, $2, $3, $4, $5, $6)
        RETURNING id, created_at
      `,
      [season, name, phone, memo, getClientIp(req), getUserAgent(req)],
    );

    json(res, 201, { ok: true, item: result.rows[0] });
  } catch (error) {
    console.error("inquiry insert error", error);
    json(res, 500, { ok: false, message: "문의 저장 중 오류가 발생했습니다." });
  }
}
