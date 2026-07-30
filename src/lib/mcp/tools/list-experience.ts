import { defineTool } from "@lovable.dev/mcp-js";
import { experience } from "../profile";

export default defineTool({
  name: "list_experience",
  title: "List professional experience",
  description:
    "List Manan Gupta's professional experience: company, location, role, period and key responsibilities/achievements for each position.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text" as const, text: JSON.stringify(experience, null, 2) }],
    structuredContent: { experience },
  }),
});
