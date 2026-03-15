export type LeadSeason = "spring" | "summer" | "fall" | "winter";

export type CallIntentSurface =
  | "header"
  | "hero"
  | "gallery"
  | "final"
  | "floating"
  | "summer_top"
  | "summer_final"
  | "seat_sheet"
  | "season_card";

interface TrackCallIntentInput {
  season: LeadSeason;
  contact: string;
  surface: CallIntentSurface;
}

const DEVICE_ID_STORAGE_KEY = "alaska_device_id_v1";

const getDeviceId = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const existing = window.localStorage.getItem(DEVICE_ID_STORAGE_KEY);
  if (existing && /^[a-z0-9_-]{12,80}$/i.test(existing)) {
    return existing.toLowerCase();
  }

  const generated = `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 14)}`;
  window.localStorage.setItem(DEVICE_ID_STORAGE_KEY, generated);
  return generated;
};

export const trackCallIntent = ({ season, contact, surface }: TrackCallIntentInput) => {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    season,
    contact,
    surface,
    path: window.location.pathname,
    timestamp: new Date().toISOString(),
    deviceId: getDeviceId(),
  };

  const serialized = JSON.stringify(payload);

  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    const blob = new Blob([serialized], { type: "application/json" });
    navigator.sendBeacon("/api/leads/call-intent", blob);
    return;
  }

  void fetch("/api/leads/call-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    keepalive: true,
    body: serialized,
  }).catch(() => {
    // fire-and-forget
  });
};
