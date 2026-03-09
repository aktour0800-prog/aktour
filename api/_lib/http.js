export const json = (res, statusCode, payload) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
};

export const methodNotAllowed = (res, allow) => {
  res.setHeader("Allow", allow);
  json(res, 405, { ok: false, message: "Method Not Allowed" });
};

export const readJsonBody = async (req) => {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  if (typeof req.body === "string") {
    if (!req.body.trim()) {
      return {};
    }

    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  let raw = "";

  for await (const chunk of req) {
    raw += chunk;
  }

  if (!raw.trim()) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

export const getClientIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];

  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0].split(",")[0].trim();
  }

  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }

  return req.socket?.remoteAddress ?? null;
};

export const getUserAgent = (req) => {
  const header = req.headers["user-agent"];

  if (Array.isArray(header)) {
    return header[0] ?? "";
  }

  return header ?? "";
};
