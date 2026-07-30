import { defineMcp } from "@lovable.dev/mcp-js";
import getProfileTool from "./tools/get-profile";
import listExperienceTool from "./tools/list-experience";
import listCaseStudiesTool from "./tools/list-case-studies";
import getCaseStudyTool from "./tools/get-case-study";

export default defineMcp({
  name: "manan-portfolio",
  title: "Manan Portfolio",
  version: "0.1.0",
  instructions:
    "Tools for Manan Gupta's portfolio. Use `get_profile` for his profile, metrics, capabilities and certifications; `list_experience` for career history; `list_case_studies` to browse featured work and `get_case_study` for a full write-up by id.",
  tools: [getProfileTool, listExperienceTool, listCaseStudiesTool, getCaseStudyTool],
});
