/**
 * parseInputToPayload
 * -------------------------------------------------------------------------
 * Core inference handler for the Omni-Logger. Maps an arbitrary free-text
 * action description (or pasted receipt text) into a structured carbon
 * telemetry payload. This is a deterministic mock model standing in for a
 * production NLP/classification service.
 *
 * Returned payload shape:
 * {
 *   impact: number,        // kg CO2 saved/avoided
 *   category: string,      // 'Transit' | 'Diet' | 'General Analysis'
 *   methodology: string,   // explains how the figure was derived
 *   pivot: string,         // behavioral micro-suggestion
 *   confidence: number,    // 0-100 model confidence score
 * }
 */

const RULES = [
  {
    test: /\b(bike|cycle|cycling|biking)\b/i,
    impact: 3.8,
    category: "Transit",
    methodology:
      "Zero-emission human-powered transit over regional baselines.",
    pivot: "Integrate alternative transport options into your regular commutes.",
    confidence: 94,
  },
  {
    test: /\b(bus|train|metro)\b/i,
    impact: 2.1,
    category: "Transit",
    methodology:
      "Mass rapid transport efficiency profiles vs single-occupancy vehicles.",
    pivot: "Batch multiple transit errands into fixed operational windows.",
    confidence: 89,
  },
  {
    test: /\b(salad|vegan|vegetarian|lentil)\b/i,
    impact: 3.5,
    category: "Diet",
    methodology:
      "Plant-protein substitution index against high-impact ruminant items.",
    pivot:
      "Source clean, regional seasonal produce to eliminate supply chain logistics footprints.",
    confidence: 91,
  },
];

const FALLBACK = {
  impact: 1.2,
  category: "General Analysis",
  methodology: "Baseline behavioral model mapping applied to generalized text strings.",
  pivot: "Provide granular item details during entry processing for accurate tracking.",
  confidence: 62,
};

export function parseInputToPayload(text) {
  const safeText = (text || "").trim();

  for (const rule of RULES) {
    if (rule.test.test(safeText)) {
      return {
        impact: rule.impact,
        category: rule.category,
        methodology: rule.methodology,
        pivot: rule.pivot,
        confidence: rule.confidence,
        sourceText: safeText,
      };
    }
  }

  return { ...FALLBACK, sourceText: safeText };
}
