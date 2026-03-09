import { createSessionToken, isAdminPasswordValid, setSessionCookie } from "../_lib/auth.js";
import { json, methodNotAllowed, readJsonBody } from "../_lib/http.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    methodNotAllowed(res, "POST");
    return;
  }

  const body = await readJsonBody(req);
  const password = String(body.password ?? "");

  let isValid = false;

  try {
    isValid = isAdminPasswordValid(password);
  } catch (error) {
    console.error("admin password config error", error);
    json(res, 500, { ok: false, message: "ADMIN_PASSWORD is not configured" });
    return;
  }

  if (!isValid) {
    json(res, 401, { ok: false, message: "비밀번호가 올바르지 않습니다." });
    return;
  }

  let token;

  try {
    token = createSessionToken();
  } catch (error) {
    console.error("admin session config error", error);
    json(res, 500, { ok: false, message: "ADMIN_SESSION_SECRET is not configured" });
    return;
  }

  setSessionCookie(res, token);
  json(res, 200, { ok: true });
}
