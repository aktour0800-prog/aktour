import crypto from "node:crypto";

import { json } from "./http.js";

const ADMIN_COOKIE_NAME = "alaska_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;

const getAdminPassword = () => process.env.ADMIN_PASSWORD ?? "";
const getSessionSecret = () => process.env.ADMIN_SESSION_SECRET ?? "";

const safeEqual = (a, b) => {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(aBuffer, bBuffer);
};

const sign = (value, secret) => crypto.createHmac("sha256", secret).update(value).digest("base64url");

const parseCookies = (cookieHeader = "") => {
  return cookieHeader
    .split(";")
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .reduce((acc, chunk) => {
      const eq = chunk.indexOf("=");
      if (eq <= 0) {
        return acc;
      }

      const key = chunk.slice(0, eq);
      const value = chunk.slice(eq + 1);
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
};

export const isAdminPasswordValid = (inputPassword) => {
  const expectedPassword = getAdminPassword();

  if (!expectedPassword) {
    throw new Error("ADMIN_PASSWORD is not configured");
  }

  return safeEqual(String(inputPassword ?? ""), expectedPassword);
};

export const createSessionToken = () => {
  const sessionSecret = getSessionSecret();

  if (!sessionSecret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured");
  }

  const payload = {
    iat: Date.now(),
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  };

  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = sign(encoded, sessionSecret);

  return `${encoded}.${signature}`;
};

export const setSessionCookie = (res, token) => {
  const parts = [
    `${ADMIN_COOKIE_NAME}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
  ];

  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }

  res.setHeader("Set-Cookie", parts.join("; "));
};

export const clearSessionCookie = (res) => {
  const parts = [`${ADMIN_COOKIE_NAME}=`, "Path=/", "HttpOnly", "SameSite=Lax", "Max-Age=0"];

  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }

  res.setHeader("Set-Cookie", parts.join("; "));
};

export const requireAdminAuth = (req, res) => {
  const sessionSecret = getSessionSecret();

  if (!sessionSecret) {
    json(res, 500, { ok: false, message: "ADMIN_SESSION_SECRET is not configured" });
    return false;
  }

  const cookies = parseCookies(req.headers.cookie ?? "");
  const token = cookies[ADMIN_COOKIE_NAME];

  if (!token) {
    json(res, 401, { ok: false, message: "UNAUTHORIZED" });
    return false;
  }

  const [encoded, providedSignature] = token.split(".");

  if (!encoded || !providedSignature) {
    json(res, 401, { ok: false, message: "UNAUTHORIZED" });
    return false;
  }

  const expectedSignature = sign(encoded, sessionSecret);
  if (!safeEqual(providedSignature, expectedSignature)) {
    json(res, 401, { ok: false, message: "UNAUTHORIZED" });
    return false;
  }

  let payload;

  try {
    payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
  } catch {
    json(res, 401, { ok: false, message: "UNAUTHORIZED" });
    return false;
  }

  if (!payload?.exp || Number(payload.exp) < Date.now()) {
    json(res, 401, { ok: false, message: "UNAUTHORIZED" });
    return false;
  }

  return true;
};
