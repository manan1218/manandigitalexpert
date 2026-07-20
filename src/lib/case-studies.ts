import cs1 from "@/assets/case-study-1.png.asset.json";
import cs2 from "@/assets/case-study-2.png.asset.json";
import cs3 from "@/assets/case-study-3.png.asset.json";
import cs4 from "@/assets/case-study-4.png.asset.json";
import cs5 from "@/assets/case-study-5.png.asset.json";

export type CaseStudySection = {
  heading: string;
  kind?: "paragraphs" | "bullets" | "checks" | "impact";
  body?: string[];
  items?: string[];
  subsections?: { heading: string; kind?: "paragraphs" | "bullets"; body?: string[]; items?: string[] }[];
};

export type CaseStudy = {
  id: string;
  banner: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  summary: string;
  tags: string[];
  highlights: { k: string; v: string }[];
  sections: CaseStudySection[];
  takeaway?: string;
  competencies: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "cs-01",
    banner: cs1.url,
    eyebrow: "Finding the Next Booking",
    title: "The Click-to-Book Framework",
    subtitle: "How I predicted bookings before spending marketing dollars.",
    summary:
      "How do you increase bookings without increasing the marketing budget? A commercial forecasting model that reallocated ~10% of media into higher-intent Search — unlocking a $10K–15K room-revenue opportunity.",
    tags: ["Hospitality", "Paid Search", "Forecasting"],
    highlights: [
      { k: "$35K", v: "Monthly media managed" },
      { k: "5–7", v: "Incremental bookings / mo" },
      { k: "$10–15K", v: "Room revenue opportunity" },
    ],
    sections: [
      {
        heading: "The Challenge",
        kind: "paragraphs",
        body: [
          "As Digital Marketing Manager for an ultra-luxury hotel in Bangkok, a 101-key ultra-luxury property, I managed a monthly paid media portfolio of approximately $35K across Google Search, Performance Max, Display and Meta campaigns targeting multiple international markets.",
          "During one of our planning cycles, we faced a common business challenge:",
        ],
      },
      {
        heading: "Constraints",
        kind: "bullets",
        items: [
          "APAC demand was softening.",
          "Revenue expectations remained unchanged.",
          "Increasing the marketing budget wasn't an option.",
          "Upper-funnel campaigns were delivering awareness but lower commercial returns.",
        ],
      },
      {
        heading: "Reframe",
        kind: "paragraphs",
        body: [
          "The challenge wasn't finding more budget. It was identifying where the next booking was most likely to come from.",
        ],
      },
      {
        heading: "My Solution",
        kind: "paragraphs",
        body: [
          "Rather than relying solely on traditional marketing metrics such as impressions, CTR and CPC, I combined booking-engine data with paid media performance to better understand the commercial value of every marketing dollar invested.",
          "My analysis focused on:",
        ],
      },
      {
        heading: "Analysis focus",
        kind: "checks",
        items: [
          "Look-to-Book ratio",
          "Average CPC",
          "Campaign efficiency",
          "Country-level booking trends",
          "Keyword analysis — location based",
        ],
      },
      {
        heading: "The Model",
        kind: "paragraphs",
        body: [
          "Historical campaign data showed that priority Search campaigns averaged approximately $1.65 CPC, with around 120 clicks required to generate one booking — an estimated acquisition cost of approximately $200 per booking.",
          "Based on these insights, I estimated that optimising approximately $1,200 of the existing media portfolio could generate around 725 additional clicks, translating into an estimated 5–7 incremental PPC-driven bookings per month and creating a potential $10K–15K direct room-revenue opportunity.",
          "This commercial forecasting model gave senior stakeholders the confidence to support a calculated, data-backed budget reallocation strategy.",
        ],
      },
      {
        heading: "Execution",
        kind: "bullets",
        items: [
          "Reallocated budget from lower commercial-efficiency campaigns into higher-intent Search activity.",
          "Increased investment behind priority keywords and source markets.",
          "Optimised approximately 10% of the existing media portfolio.",
          "Continuously monitored campaign performance against projections.",
          "Delivered without increasing the overall marketing budget.",
        ],
      },
      {
        heading: "Business Impact",
        kind: "impact",
        items: [
          "Improved ROAS across priority Search campaigns.",
          "Generated an estimated 5–7 incremental PPC-driven bookings per month.",
          "Created an estimated $10K–15K direct room-revenue opportunity.",
          "Improved campaign efficiency while maintaining the existing marketing investment.",
          "Demonstrated that commercial forecasting can support smarter marketing decisions.",
        ],
      },
    ],
    takeaway:
      "The best marketing decisions aren't about increasing budgets — they're about understanding customer behaviour, forecasting commercial outcomes and investing where the next booking is most likely to come from.",
    competencies: [
      "Commercial Strategy",
      "Performance Marketing",
      "Revenue Optimisation",
      "Marketing Analytics",
      "Forecasting",
      "Stakeholder Management",
      "Data-Driven Decision Making",
    ],
  },
  {
    id: "cs-02",
    banner: cs2.url,
    eyebrow: "Finding the Right Decision Makers",
    title: "Qualified Enterprise Leads Without a Landing Page",
    subtitle:
      "How I redesigned the customer journey to generate qualified enterprise leads without a dedicated landing page.",
    summary:
      "A leading global technology company needed MQLs for its cybersecurity solution across the Middle East — with no landing page and a locked-down press release. I redesigned the journey instead.",
    tags: ["B2B", "LinkedIn", "Demand Gen"],
    highlights: [
      { k: "MEA", v: "Target region" },
      { k: "2-Stage", v: "Journey design" },
      { k: "Quality", v: "> volume" },
    ],
    sections: [
      {
        heading: "Client Brief",
        kind: "paragraphs",
        body: [
          "A leading global technology company wanted to generate Marketing Qualified Leads (MQLs) for its cybersecurity solution across the Middle East by targeting a highly niche audience of enterprise IT and cybersecurity decision-makers through LinkedIn.",
        ],
      },
      {
        heading: "Objectives",
        kind: "bullets",
        items: [
          "Generate high-quality enterprise leads.",
          "Reach CIOs, CISOs, IT Directors and Security decision-makers.",
          "Prioritise lead quality over lead volume.",
        ],
      },
      {
        heading: "Challenges",
        kind: "bullets",
        items: [
          "The client didn't have a dedicated landing page.",
          "The only available asset was a press release, which couldn't be redesigned due to brand and compliance guidelines.",
          "Sending cold traffic directly to a Lead Gen Form would create friction and reduce lead quality.",
          "The target audience was extremely niche — every impression and click mattered.",
          "Success would be measured by lead quality rather than Cost per Lead (CPL).",
        ],
      },
      {
        heading: "My Solution",
        kind: "paragraphs",
        body: [
          "Instead of optimising a landing page that couldn't be changed, I redesigned the customer journey.",
        ],
        subsections: [
          {
            heading: "Stage 1 — Build Awareness & Engagement",
            kind: "bullets",
            items: [
              "Developed a visually engaging LinkedIn Carousel Ad to simplify the press release into a compelling story.",
              "Optimised the campaign for engagement to build a pool of high-intent users.",
              "Educated the audience before asking them to convert.",
            ],
          },
          {
            heading: "Stage 2 — Drive Qualified Lead Generation",
            kind: "bullets",
            items: [
              "Repurposed the press release into a visually appealing LinkedIn Document Ad.",
              "Retargeted users who had engaged with the Carousel campaign.",
              "Used LinkedIn Native Lead Gen Forms, allowing prospects to submit their details without leaving the platform.",
            ],
          },
        ],
      },
      {
        heading: "Campaign Optimisation",
        kind: "bullets",
        items: [
          "Marketing Qualified Leads (MQLs)",
          "Audience engagement quality",
          "Content consumption",
          "Lead relevance",
          "Sales readiness",
        ],
      },
      {
        heading: "Outcomes",
        kind: "impact",
        items: [
          "Successfully generated qualified enterprise Marketing Qualified Leads (MQLs).",
          "Improved engagement by educating prospects before asking them to convert.",
          "Eliminated the dependency on a traditional landing page by redesigning the customer journey.",
          "Built a scalable two-stage LinkedIn demand generation framework that could be replicated across future campaigns.",
          "Although the CPL was higher than a typical campaign, the client prioritised lead quality — resulting in highly relevant enterprise prospects for the sales team.",
        ],
      },
      {
        heading: "Why This Worked",
        kind: "paragraphs",
        body: [
          "Instead of forcing prospects to convert on their first interaction, I focused on building trust before capturing intent. By educating users through storytelling, nurturing engagement, and retargeting only high-intent audiences, the campaign delivered qualified leads despite the absence of a traditional landing page.",
        ],
      },
    ],
    competencies: [
      "Demand Generation",
      "LinkedIn Advertising",
      "Customer Journey Design",
      "Audience Strategy",
      "Enterprise B2B Marketing",
      "Marketing Analytics",
      "Problem Solving",
    ],
  },
  {
    id: "cs-03",
    banner: cs3.url,
    eyebrow: "Rethinking a €40K Media Strategy",
    title: "Audience Intelligence & Full-Funnel Planning",
    subtitle:
      "How I used audience intelligence and full-funnel planning to reshape an enterprise LinkedIn campaign.",
    summary:
      "The client wanted MQLs from 400 strategic enterprise accounts across 8 countries. I refined the audience from 9M to ~50K and rebuilt the plan as a three-stage full-funnel strategy.",
    tags: ["ABM", "LinkedIn", "Media Planning"],
    highlights: [
      { k: "€40K", v: "Media budget" },
      { k: "9M → 50K", v: "Audience precision" },
      { k: "40", v: "MQLs from 400 accounts" },
    ],
    sections: [
      {
        heading: "Client Brief",
        kind: "paragraphs",
        body: [
          "The client wanted to generate Marketing Qualified Leads (MQLs) from 400 strategic enterprise accounts across the United States, United Kingdom, Germany, Australia, Austria, Luxembourg, France and Hungary.",
          "The campaign targeted Cloud Engineers, IT Architects, Infrastructure Engineers and enterprise cloud decision-makers, using LinkedIn Lead Gen Forms as the primary conversion objective. Budget: €40,000.",
        ],
      },
      {
        heading: "Challenges",
        kind: "bullets",
        items: [
          "The projected audience size exceeded 9 million users — misaligned with the highly targeted account list.",
          "Audience targeting relied heavily on OR logic, significantly broadening the reach beyond the intended decision-makers.",
          "The agency forecasted 300 leads, which was unrealistic given the niche audience and campaign objective.",
          "All target countries were grouped into a single campaign, increasing the likelihood that larger markets would consume most of the budget.",
          "The strategy focused only on lead generation, overlooking the Awareness and Consideration stages of the buyer journey.",
        ],
      },
      {
        heading: "My Solution",
        kind: "paragraphs",
        body: [
          "Before recommending any changes, I validated the agency's assumptions by creating a proof-of-concept campaign in LinkedIn Campaign Manager — demonstrating how a more precise audience strategy would significantly improve campaign quality.",
        ],
        subsections: [
          {
            heading: "Audience Optimisation",
            kind: "bullets",
            items: [
              "Rebuilt the audience using AND logic instead of broad OR combinations.",
              "Reduced the estimated audience size from ~9 million to ~50,000 highly relevant professionals.",
              "Prioritised account relevance and buying intent over audience volume.",
            ],
          },
          {
            heading: "Campaign Architecture — Three-Stage Full-Funnel",
            kind: "bullets",
            items: [
              "Stage 1 — Awareness: two campaigns split by market size (USA/UK/AU and DE/AT/LU/FR/HU) to prevent large markets from consuming the budget.",
              "Stage 2 — Consideration: Website Traffic campaign to engage prospects and build a 30-day remarketing audience.",
              "Stage 3 — Conversion: LinkedIn Lead Gen retargeting only users who had already interacted with the brand.",
            ],
          },
        ],
      },
      {
        heading: "Outcomes",
        kind: "impact",
        items: [
          "Agency recommendations were revised based on my audience validation and campaign framework.",
          "Refined target audience from 9M to ~50K, significantly improving targeting precision.",
          "Implemented a structured full-funnel LinkedIn strategy covering Awareness, Consideration and Conversion.",
          "Improved budget distribution by segmenting countries based on market size and delivery potential.",
          "Generated 40 highly qualified MQLs from a target list of 400 strategic enterprise accounts.",
          "Established a scalable media planning framework that could be replicated across future enterprise campaigns.",
        ],
      },
      {
        heading: "Why This Worked",
        kind: "paragraphs",
        body: [
          "Rather than accepting the original media plan, I challenged the underlying assumptions with platform data and audience validation.",
          "By focusing on audience precision, campaign structure and the complete buyer journey, we shifted the campaign from chasing lead volume to generating qualified enterprise opportunities.",
        ],
      },
    ],
    competencies: [
      "Media Planning",
      "LinkedIn Advertising",
      "Account-Based Marketing (ABM)",
      "Audience Strategy",
      "Full-Funnel Marketing",
      "Demand Generation",
      "Agency Management",
      "Stakeholder Influence",
    ],
  },
  {
    id: "cs-04",
    banner: cs4.url,
    eyebrow: "The Learning Phase Trap",
    title: "Unlocking Campaign Performance Through Customer Behaviour",
    subtitle: "How understanding customer behaviour helped unlock campaign performance.",
    summary:
      "A Meta remarketing campaign was stuck in the Learning Phase. The fix wasn't audience size or creative — it was matching the audience window to the hotel's actual 35–55 day booking lead time.",
    tags: ["Meta Ads", "Remarketing", "Hospitality"],
    highlights: [
      { k: "30 → 60", v: "Day remarketing window" },
      { k: "1 week", v: "Exited Learning Phase" },
      { k: "0", v: "Added spend" },
    ],
    sections: [
      {
        heading: "Business Challenge",
        kind: "paragraphs",
        body: [
          "Capella Bangkok launched a promotional campaign consisting of a Prospecting campaign driving qualified website traffic, and a Remarketing campaign converting engaged visitors into direct bookings.",
          "Although Prospecting was performing well and generating sufficient website traffic, the Remarketing campaign remained stuck in Meta's Learning Phase — resulting in limited campaign delivery, inconsistent performance and delayed optimisation by Meta's algorithm.",
          "The agency initially focused on audience size, creatives and campaign settings, but the campaign continued to underperform.",
        ],
      },
      {
        heading: "My Observation",
        kind: "paragraphs",
        body: [
          "Instead of analysing only campaign metrics, I shifted the focus to customer behaviour. After reviewing the booking journey, I identified a critical mismatch:",
        ],
      },
      {
        heading: "The mismatch",
        kind: "bullets",
        items: [
          "Average hotel booking lead time: 35–55 days.",
          "Remarketing audience window: last 30 days only.",
          "A significant portion of high-intent users were being excluded before they were ready to book.",
          "The remarketing audience wasn't generating enough conversion signals for Meta's algorithm.",
          "The issue wasn't insufficient traffic — it was an audience window that didn't reflect actual customer behaviour.",
        ],
      },
      {
        heading: "My Solution",
        kind: "bullets",
        items: [
          "Expanded the website visitor audience from 30 days to 60 days.",
          "Matched the remarketing window with the hotel's 35–55 day booking lead time.",
          "Increased the pool of high-intent users available for optimisation.",
          "Allowed Meta's algorithm to receive stronger and more consistent conversion signals — without changing campaign objectives or increasing media spend.",
        ],
      },
      {
        heading: "Outcomes",
        kind: "impact",
        items: [
          "The campaign exited the Learning Phase within one week.",
          "Increased audience eligibility, enabling more efficient campaign delivery.",
          "Improved campaign stability and optimisation.",
          "Established a repeatable framework for aligning remarketing audiences with customer conversion behaviour.",
        ],
      },
      {
        heading: "Why This Worked",
        kind: "paragraphs",
        body: [
          "Most remarketing strategies are built around fixed audience windows. I built the strategy around customer behaviour.",
          "By aligning the audience duration with the hotel's actual booking lead time, the campaign generated sufficient conversion signals for Meta's algorithm to optimise effectively — improving performance without increasing budget or changing campaign structure.",
        ],
      },
    ],
    competencies: [
      "Meta Ads",
      "Customer Journey Analysis",
      "Remarketing Strategy",
      "Performance Marketing",
      "Marketing Analytics",
      "Conversion Optimisation",
      "Data-Driven Decision Making",
    ],
  },
  {
    id: "cs-05",
    banner: cs5.url,
    eyebrow: "Direct Booking Growth",
    title: "$1.05M in Direct Booking Revenue Through Smarter Paid Media",
    subtitle:
      "How I Generated an Additional $1.05M in Direct Booking Revenue Through Smarter Paid Media Optimisation.",
    summary:
      "Rather than increasing spend, I improved the efficiency of every marketing dollar — reallocating SEM, layering dynamic remarketing and PMAX, and enhancing GA4 attribution.",
    tags: ["Hospitality", "SEM", "PMAX"],
    highlights: [
      { k: "$1.05M", v: "Additional direct revenue" },
      { k: "0", v: "Increase in media budget" },
      { k: "↓ OTA", v: "Channel dependency" },
    ],
    sections: [
      {
        heading: "The Challenge",
        kind: "bullets",
        items: [
          "Increase direct bookings while reducing dependency on Online Travel Agencies (OTAs).",
          "Improve commercial performance without increasing the paid media budget.",
          "Identify high-value optimisation opportunities across the customer booking journey.",
          "Maximise revenue from existing Google Ads investment.",
        ],
      },
      {
        heading: "My Strategy",
        kind: "paragraphs",
        body: [
          "Rather than increasing spend, I focused on improving the efficiency of every marketing dollar.",
        ],
      },
      {
        heading: "Execution",
        kind: "bullets",
        items: [
          "Reallocated SEM budget from low-performing keywords to high-intent searches.",
          "Implemented dynamic remarketing campaigns targeting abandoned bookings.",
          "Enhanced GA4 conversion tracking to improve attribution and optimisation.",
          "Built personalised dynamic ads using hotel imagery and user intent.",
          "Targeted travellers researching competing luxury hotels using Performance Max campaigns.",
        ],
      },
      {
        heading: "Business Impact",
        kind: "impact",
        items: [
          "Generated an additional $1.05M in direct booking revenue.",
          "Increased direct bookings while maintaining the existing media investment.",
          "Improved campaign efficiency through smarter budget allocation.",
          "Reduced reliance on OTA channels by driving more direct reservations.",
          "Created a scalable optimisation framework for future campaigns.",
        ],
      },
    ],
    takeaway:
      "Revenue growth didn't come from increasing the budget — it came from understanding customer intent, improving attribution, and investing in the moments most likely to drive a direct booking.",
    competencies: [
      "Paid Search (SEM)",
      "Performance Max",
      "Dynamic Remarketing",
      "GA4 & Attribution",
      "Revenue Optimisation",
      "Hospitality Marketing",
    ],
  },
];
