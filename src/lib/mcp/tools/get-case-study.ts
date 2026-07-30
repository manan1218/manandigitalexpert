import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { caseStudies } from "@/lib/case-studies";

export default defineTool({
  name: "get_case_study",
  title: "Get case study",
  description:
    "Get the complete write-up for one case study by its id (for example 'cs-01'), including all sections, takeaway and competencies.",
  inputSchema: {
    id: z.string().describe("Case study id, e.g. 'cs-01'. Use list_case_studies to discover ids."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const cs = caseStudies.find((c) => c.id.toLowerCase() === id.trim().toLowerCase());
    if (!cs) {
      return {
        content: [
          {
            type: "text" as const,
            text: `No case study with id "${id}". Available ids: ${caseStudies.map((c) => c.id).join(", ")}`,
          },
        ],
        isError: true,
      };
    }
    const { banner: _banner, ...rest } = cs;
    return {
      content: [{ type: "text" as const, text: JSON.stringify(rest, null, 2) }],
      structuredContent: { caseStudy: rest },
    };
  },
});
