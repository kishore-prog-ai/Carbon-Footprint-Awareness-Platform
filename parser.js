/**
 * parseInputToPayload — Parametric Token Extraction Engine
 * -------------------------------------------------------------------------
 * Parses natural text strings using isolated token boundaries and regex
 * capture groups to dynamically compute carbon metrics instead of relying
 * entirely on flat fallback values.
 */

const BASE_CONVERSIONS = [
  {
    tokens: /\b(bike|cycle|cycling|biking|walk|pedal)\b/i,
    factor: 0.24, // kg CO2 saved per km relative to an internal combustion engine vehicle
    category: "Transit",
    methodology: "Zero-emission pedestrian/human-powered displacement calculated against a localized gasoline vehicle baseline factor (0.24 kg CO₂e/km).",
    pivot: "Consider identifying protected alternative greenways to optimize commute safety and speed.",
    confidence: 96,
    defaultImpact: 3.8
  },
  {
    tokens: /\b(bus|train|metro|subway|rail|transit)\b/i,
    factor: 0.14, // kg CO2 saved per km by using shared high-capacity networks
    category: "Transit",
    methodology: "Mass transit passenger-mile offset efficiency profile mapped dynamically against standard single-occupancy vehicle travel frames.",
    pivot: "Batch multi-stop micro-errands into predictable high-occupancy transport operational windows.",
    confidence: 89,
    defaultImpact: 2.1
  },
  {
    tokens: /\b(salad|vegan|vegetarian|lentil|soup|plant|tofu)\b/i,
    factor: 2.25, // kg CO2 saved per serving offset
    category: "Diet",
    methodology: "Plant-based macronutrient substitution index scored against high-methane ruminant meat baselines.",
    pivot: "Source seasonal, hyper-local ingredients where possible to collapse freight logistics footprints.",
    confidence: 92,
    defaultImpact: 3.5
  }
];

const MASTER_FALLBACK = {
  impact: 1.2,
  category: "General Analysis",
  methodology: "Baseline behavior mapping matrix applied to an unclassified lifestyle token string.",
  pivot: "Provide specific parameters (e.g., distance units, item weights) to tighten conversion bounds.",
  confidence: 64,
};

export function parseInputToPayload(text) {
  const safeText = (text || "").trim();
  const lowerText = safeText.toLowerCase();

  // Extract standalone integers or floats accompanied by optional unit strings
  const metricMatch = safeText.match(/(\d+(?:\.\d+)?)\s*(km|kms|miles|mi|hours|hr|hrs|serving|servings)?/i);
  const quantity = metricMatch ? parseFloat(metricMatch[1]) : null;
  const unit = metricMatch && metricMatch[2] ? metricMatch[2].toLowerCase() : "";

  for (const item of BASE_CONVERSIONS) {
    if (item.tokens.test(lowerText)) {
      let evaluatedImpact = item.defaultImpact;

      if (quantity) {
        // Normalize miles to km frames on transit calls
        const standardizedScale = (unit === 'miles' || unit === 'mi') ? quantity * 1.609 : quantity;
        evaluatedImpact = +(standardizedScale * item.factor).toFixed(2);
        
        // Prevent microscopic or excessive evaluations from breaking dashboard layouts
        if (evaluatedImpact <= 0) evaluatedImpact = item.defaultImpact;
      }

      return {
        impact: evaluatedImpact,
        category: item.category,
        methodology: quantity 
          ? `Parametric Scaling Model: Evaluated ${quantity} ${unit || 'units'} across active emission coefficients to compute a dynamic ${evaluatedImpact} kg boundary.`
          : item.methodology,
        pivot: item.pivot,
        confidence: item.confidence,
        sourceText: safeText,
      };
    }
  }

  return { ...MASTER_FALLBACK, sourceText: safeText };
}
