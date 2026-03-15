import crypto from "node:crypto";

import { ensureSchema, getPool } from "../_lib/db.js";
import { getClientIp, getUserAgent, json, methodNotAllowed, readJsonBody } from "../_lib/http.js";

const ALLOWED_SEASONS = new Set(["spring", "fall", "winter"]);

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

const createFallbackDeviceId = (req) => {
  const ip = getClientIp(req) ?? "";
  const userAgent = getUserAgent(req) ?? "";

  const hash = crypto.createHash("sha256").update(`${ip}|${userAgent}`).digest("hex").slice(0, 24);
  return `fp_${hash}`;
};

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

  const deviceId = sanitizeDeviceId(body.deviceId) ?? createFallbackDeviceId(req);

  try {
    await ensureSchema();

    await getPool().query(
      `
        INSERT INTO lead_events (event_type, season, phone, ip, user_agent)
        VALUES ('like', $1, $2, $3, $4)
      `,
      [season, deviceId, getClientIp(req), getUserAgent(req)],
    );

    json(res, 201, { ok: true });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "23505") {
      json(res, 200, { ok: true, duplicate: true });
      return;
    }

    console.error("like insert error", error);
    json(res, 500, { ok: false, message: "좋아요 저장 중 오류가 발생했습니다." });
  }
}
