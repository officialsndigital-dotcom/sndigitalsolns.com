import { GhlProvider } from "./ghl.ts";
import type { CRMProvider } from "./types.ts";

/** Returns the configured CRM, or null when no CRM credentials are set. */
export function getCrmProvider(): CRMProvider | null {
  const token = process.env.GHL_API_KEY;
  const location = process.env.GHL_LOCATION_ID;
  if (!token || !location) return null;
  const pipelineId = process.env.GHL_PIPELINE_ID;
  const stageId = process.env.GHL_PIPELINE_STAGE_ID;
  const pipeline = pipelineId && stageId ? { pipelineId, stageId } : undefined;
  return new GhlProvider(token, location, pipeline);
}
