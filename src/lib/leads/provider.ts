import { GhlProvider } from "./ghl.ts";
import type { CRMProvider } from "./types.ts";

/** Returns the configured CRM, or null when no CRM credentials are set. */
export function getCrmProvider(): CRMProvider | null {
  const token = process.env.GHL_API_KEY;
  const location = process.env.GHL_LOCATION_ID;
  if (token && location) return new GhlProvider(token, location);
  return null;
}
