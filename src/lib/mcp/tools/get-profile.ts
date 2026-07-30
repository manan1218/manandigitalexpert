import { defineTool } from "@lovable.dev/mcp-js";
import { profile, impact, capabilities, skills, certifications, companies } from "../profile";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description:
    "Get Manan Gupta's professional profile: headline, summary, headline business-impact metrics, capabilities, skills, certifications, markets and companies worked with.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const data = {
      ...profile,
      impact,
      capabilities,
      skills,
      certifications,
      companies,
    };
    return {
      content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
      structuredContent: data,
    };
  },
});
