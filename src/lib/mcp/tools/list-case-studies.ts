import { defineTool } from "@lovable.dev/mcp-js";
import { caseStudies } from "@/lib/case-studies";

export default defineTool({
  name: "list_case_studies",
  title: "List case studies",
  description:
    "List the featured marketing case studies with id, title, subtitle, summary, tags and headline metrics. Use get_case_study for the full write-up.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = caseStudies.map((cs) => ({
      id: cs.id,
      eyebrow: cs.eyebrow,
      title: cs.title,
      subtitle: cs.subtitle,
      summary: cs.summary,
      tags: cs.tags,
      highlights: cs.highlights.map((h) => ({ metric: h.k, label: h.v })),
    }));
    return {
      content: [{ type: "text" as const, text: JSON.stringify(items, null, 2) }],
      structuredContent: { caseStudies: items },
    };
  },
});
