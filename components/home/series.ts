import type { ReportMetric } from "lib/reportCard";

/**
 * The Report Card's three metrics, in its order, labels and colours, so a
 * metric is one colour everywhere on the site. Its own file because both a
 * server component (the proof band's figures) and a client one (the chart)
 * read it.
 */
export const SERIES: { key: ReportMetric; label: string; color: string }[] = [
  { key: "seen", label: "Found online", color: "#FCE903" },
  { key: "website", label: "Went to the website", color: "#3EA6FF" },
  { key: "reached", label: "Calls and/or directions", color: "#FF4D2E" },
];
