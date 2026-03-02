/**
 * @file Static seed-style frontend content used for SSR pages and demos.
 */

import { addDays, subDays } from 'date-fns';

/**
 * Builds rich long-form SEO copy for a micro-location page.
 * @param {string} name - Location name.
 * @param {number} avgPrice - Average price per sqft.
 * @param {number} growth - Growth score.
 * @returns {string} Rich SEO description.
 */
function buildLongDescription(name, avgPrice, growth) {
  return `${name} has evolved from a simple residential pocket into one of Lucknow's most watched real estate zones for data-driven investors. Over the last few years, transaction behavior in ${name} shows a clear shift from speculative buying to conviction-led acquisition, where buyers compare fair value, rental resilience, infrastructure timelines, and developer credibility before taking positions. At an average benchmark near ₹${avgPrice}/sqft, the location sits in a sweet spot where affordability and upside potential can coexist, especially for investors balancing long-term capital growth with medium-term liquidity.\n\nOur location engine assigns ${name} a growth score of ${growth}/100 after combining supply absorption, demand spread, price velocity, and public infrastructure momentum. Instead of relying on broad city-level assumptions, we break the market down to street-level behavior and project-level pricing patterns. This reveals where real demand is sticky and where pricing is inflated by short-term noise. In ${name}, the strongest signals currently come from improving connectivity corridors, visible social infrastructure, and a widening buyer mix that includes end-users, rental-focused investors, and NRI demand.\n\nThe investment thesis for ${name} is built around three measurable pillars. First, pricing depth: compared with premium core zones, this market still offers entry points where value can be discovered through negotiation and timing. Second, infrastructure compounding: transport links, civic upgrades, and retail-commercial expansion are reducing friction for both living and leasing. Third, execution quality: reputed developers and better compliance visibility are improving buyer confidence and reducing legal uncertainty. Together, these drivers create a profile suitable for disciplined investors who prefer data-backed decisions over anecdotal market narratives.\n\nFor practical execution, we recommend tracking listing duration, real transaction comparables, and micro-cluster-level rental trends before finalizing. In many sub-pockets of ${name}, fair-value windows emerge when inventory cycles overlap with seller urgency. Our deal engine is designed to identify these windows early, rank opportunities by conviction, and map them to your budget and risk appetite. If your objective is to build a Lucknow-focused portfolio with balanced risk and credible upside, ${name} deserves active monitoring rather than occasional browsing.`;
}

/** Blog categories used in listing filter. */
export const blogCategories = [
  'Market Analysis',
  'Investment Guides',
  'Micro-Location Spotlights',
  'Data Deep Dives',
  'Regulatory Updates',
  'AI & Technology'
];

/** Blog post dataset. */
export const blogPosts = [
  {
    slug: 'why-shaheed-path-is-lucknows-next-growth-corridor',
    title: "Why Shaheed Path Is Lucknow's Next Growth Corridor",
    excerpt:
      "Our growth model gives Shaheed Path a 87/100 score. Here's the infrastructure pipeline and price trajectory data behind the prediction.",
    category: 'Market Analysis',
    readTime: '7 min read',
    date: subDays(new Date(), 2).toISOString(),
    author: 'Research Desk'
  },
  {
    slug: 'how-circle-rates-affect-your-property-valuation-in-lucknow',
    title: 'How Circle Rates Affect Your Property Valuation in Lucknow',
    excerpt:
      "Most investors ignore circle rates. Here's how they impact your actual vs. paper value and what our data shows across 50 micro-locations.",
    category: 'Regulatory Updates',
    readTime: '8 min read',
    date: subDays(new Date(), 5).toISOString(),
    author: 'Policy Intelligence Team'
  },
  {
    slug: 'the-science-behind-our-deal-scoring-algorithm',
    title: 'The Science Behind Our Deal Scoring Algorithm',
    excerpt:
      'We break down the 5 factors that go into every Deal Score: discount, growth, liquidity, legal safety, and urgency signals.',
    category: 'AI & Technology',
    readTime: '9 min read',
    date: subDays(new Date(), 8).toISOString(),
    author: 'ML Team'
  },
  {
    slug: 'gomti-nagar-extension-vs-sushant-golf-city-a-data-comparison',
    title: 'Gomti Nagar Extension vs. Sushant Golf City: A Data Comparison',
    excerpt:
      "Side-by-side analysis of two of Lucknow's most popular investment zones. Price trends, growth scores, developer presence, and more.",
    category: 'Data Deep Dives',
    readTime: '10 min read',
    date: subDays(new Date(), 10).toISOString(),
    author: 'Market Labs'
  },
  {
    slug: 'understanding-rera-compliance-in-uttar-pradesh',
    title: 'Understanding RERA Compliance in Uttar Pradesh',
    excerpt:
      "Before you invest, check the RERA status. Here's how to verify any project and why our platform flags non-compliant listings.",
    category: 'Regulatory Updates',
    readTime: '6 min read',
    date: subDays(new Date(), 12).toISOString(),
    author: 'Legal Intelligence Team'
  },
  {
    slug: '5-red-flags-our-ai-detects-that-youd-miss',
    title: "5 Red Flags Our AI Detects That You'd Miss",
    excerpt:
      'From relisted properties to urgency keyword patterns — our NLP models catch subtle signals that indicate distressed or risky listings.',
    category: 'AI & Technology',
    readTime: '6 min read',
    date: subDays(new Date(), 15).toISOString(),
    author: 'Signal Detection Team'
  }
];

/** Micro-location records used by listing/detail pages. */
export const microLocations = [
  { name: 'Gomti Nagar Extension', slug: 'gomti-nagar-extension', avgPricePerSqft: 5200, growthScore: 82, liquidityScore: 76, riskScore: 34, trend30d: 3.1, activeListings: 340, keyInfra: 'Metro line, IT Park', rentalYield: 3.9, circleRate: 4100 },
  { name: 'Shaheed Path', slug: 'shaheed-path', avgPricePerSqft: 4100, growthScore: 87, liquidityScore: 81, riskScore: 29, trend30d: 4.8, activeListings: 280, keyInfra: 'Airport road, SEZ', rentalYield: 4.1, circleRate: 3200 },
  { name: 'Sushant Golf City', slug: 'sushant-golf-city', avgPricePerSqft: 6500, growthScore: 71, liquidityScore: 66, riskScore: 41, trend30d: 1.2, activeListings: 190, keyInfra: 'Golf course, schools', rentalYield: 3.4, circleRate: 5000 },
  { name: 'Sultanpur Road', slug: 'sultanpur-road', avgPricePerSqft: 3800, growthScore: 79, liquidityScore: 73, riskScore: 36, trend30d: 3.5, activeListings: 220, keyInfra: 'NH bypass, industrial', rentalYield: 4.2, circleRate: 2900 },
  { name: 'Raebareli Road', slug: 'raebareli-road', avgPricePerSqft: 3200, growthScore: 84, liquidityScore: 79, riskScore: 32, trend30d: 5.2, activeListings: 310, keyInfra: 'Ring road, warehousing', rentalYield: 4.6, circleRate: 2600 },
  { name: 'Amar Shaheed Path', slug: 'amar-shaheed-path', avgPricePerSqft: 4800, growthScore: 76, liquidityScore: 71, riskScore: 39, trend30d: 2.1, activeListings: 170, keyInfra: 'Metro, commercial hub', rentalYield: 3.7, circleRate: 3600 },
  { name: 'Kanpur Road', slug: 'kanpur-road', avgPricePerSqft: 3500, growthScore: 73, liquidityScore: 70, riskScore: 40, trend30d: 2.8, activeListings: 260, keyInfra: 'Industrial, highway', rentalYield: 4.0, circleRate: 2800 },
  { name: 'Faizabad Road', slug: 'faizabad-road', avgPricePerSqft: 3100, growthScore: 81, liquidityScore: 77, riskScore: 35, trend30d: 4.1, activeListings: 200, keyInfra: 'Medical hub, bypass', rentalYield: 4.3, circleRate: 2500 },
  { name: 'Jankipuram Extension', slug: 'jankipuram-extension', avgPricePerSqft: 3900, growthScore: 68, liquidityScore: 65, riskScore: 46, trend30d: 1.5, activeListings: 150, keyInfra: 'Residential, schools', rentalYield: 3.5, circleRate: 3000 },
  { name: 'Vrindavan Yojna', slug: 'vrindavan-yojna', avgPricePerSqft: 4500, growthScore: 74, liquidityScore: 69, riskScore: 40, trend30d: 2.4, activeListings: 230, keyInfra: 'Planned township', rentalYield: 3.6, circleRate: 3500 },
  { name: 'Telibagh', slug: 'telibagh', avgPricePerSqft: 2800, growthScore: 85, liquidityScore: 80, riskScore: 31, trend30d: 6.1, activeListings: 180, keyInfra: 'Emerging, low base', rentalYield: 4.8, circleRate: 2200 },
  { name: 'Chinhat', slug: 'chinhat', avgPricePerSqft: 3600, growthScore: 77, liquidityScore: 72, riskScore: 38, trend30d: 3.3, activeListings: 160, keyInfra: 'Airport proximity', rentalYield: 4.0, circleRate: 2900 }
].map((location) => ({
  ...location,
  longDescription: buildLongDescription(location.name, location.avgPricePerSqft, location.growthScore),
  infrastructureTimeline: [
    { year: '2025', item: `${location.name} mobility corridor upgrade approved`, status: 'in-progress' },
    { year: '2026', item: `Commercial cluster expansion in ${location.name}`, status: 'tendered' },
    { year: '2027', item: `New social infrastructure package for ${location.name}`, status: 'planned' }
  ],
  developers: [
    { name: 'Shalimar Corp', projects: 6, avgRating: 4.3 },
    { name: 'Eldeco Group', projects: 4, avgRating: 4.1 },
    { name: 'Rishita Developers', projects: 3, avgRating: 4.2 }
  ],
  faq: [
    {
      q: `Is ${location.name} good for long-term property investment?`,
      a: `${location.name} shows improving fundamentals across growth, liquidity, and infrastructure visibility, making it suitable for long-term, data-led investors.`
    },
    {
      q: `What is the average property price in ${location.name}?`,
      a: `Current average pricing in ${location.name} is around ₹${location.avgPricePerSqft}/sqft, with variation by builder quality and exact micro-pocket.`
    },
    {
      q: `How does ${location.name} compare with other Lucknow zones?`,
      a: `${location.name} ranks competitively on growth score and transaction depth, especially for investors seeking balanced entry points.`
    },
    {
      q: `What are the biggest risks in ${location.name}?`,
      a: `Primary risks include project execution delays in select clusters and pricing overextension near premium inventory pockets.`
    },
    {
      q: `Can I receive instant deal alerts for ${location.name}?`,
      a: `Yes, you can configure WhatsApp and in-app alerts to track high-conviction listings for ${location.name} in real time.`
    }
  ]
}));

/** Report catalog data. */
export const reports = [
  {
    id: 'lko-q1-2026-growth-zones',
    title: 'Lucknow Growth Zones: Q1 2026 Investment Thesis',
    price: 4999,
    summary:
      'Institutional-grade analysis of 15 high-upside micro-locations with scenario-based returns and risk mapping.',
    pages: 68
  },
  {
    id: 'lko-rental-yield-atlas',
    title: 'Lucknow Rental Yield Atlas',
    price: 3499,
    summary:
      'Rental yield intelligence across key clusters with tenant demand segmentation and occupancy assumptions.',
    pages: 52
  },
  {
    id: 'lko-corridor-comparison',
    title: 'Sultanpur vs Raebareli vs Shaheed Path Corridor Comparison',
    price: 3999,
    summary:
      'Side-by-side corridor analysis for growth, liquidity, pricing dispersion, and infrastructure compounding.',
    pages: 59
  }
];

/** Deal list used in dashboard and deals page. */
export const deals = Array.from({ length: 12 }).map((_, index) => {
  const location = microLocations[index % microLocations.length];
  const dealScore = 78 + (index % 8) * 3;
  return {
    id: `deal-${index + 1}`,
    title: `${location.name} ${index % 2 === 0 ? '3BHK Apartment' : 'Plot Opportunity'}`,
    microLocation: location.name,
    price: 5500000 + index * 350000,
    fairValue: 6200000 + index * 360000,
    discountPercent: 8 + (index % 5) * 2,
    growthScore: location.growthScore,
    liquidityScore: location.liquidityScore,
    riskScore: location.riskScore,
    dealScore,
    conviction: dealScore > 85 ? 'high' : dealScore > 80 ? 'medium' : 'low',
    detectedAt: subDays(new Date(), index).toISOString(),
    status: 'detected'
  };
});

/** Property dataset used in property pages. */
export const properties = Array.from({ length: 50 }).map((_, index) => {
  const location = microLocations[index % microLocations.length];
  return {
    id: `property-${index + 1}`,
    sourceId: `src-${index + 1000}`,
    source: ['99acres', 'magicbricks', 'housing', 'olx'][index % 4],
    title: `${location.name} ${index % 3 === 0 ? '2BHK' : index % 3 === 1 ? '3BHK' : 'Plot'} Listing`,
    type: index % 3 === 2 ? 'plot' : 'apartment',
    subType: index % 3 === 0 ? '2BHK' : index % 3 === 1 ? '3BHK' : 'Residential Plot',
    price: 4000000 + index * 200000,
    pricePerSqft: location.avgPricePerSqft + (index % 5) * 120,
    area: 950 + (index % 7) * 180,
    microLocation: location.name,
    slug: location.slug,
    growthScore: location.growthScore,
    liquidityScore: location.liquidityScore,
    riskScore: location.riskScore,
    dealScore: 70 + (index % 20),
    listingDate: subDays(new Date(), index + 2).toISOString(),
    images: ['/images/property-placeholder-1.jpg', '/images/property-placeholder-2.jpg']
  };
});

/** Buyer records used in buyer dashboard mockups. */
export const buyers = Array.from({ length: 10 }).map((_, index) => ({
  id: `buyer-${index + 1}`,
  name: `Sample Buyer ${index + 1}`,
  source: ['whatsapp', 'instagram', 'website', 'referral'][index % 4],
  stage: ['new', 'qualified', 'site_visit', 'negotiation'][index % 4],
  score: 58 + index * 4,
  budgetMin: 3000000,
  budgetMax: 12000000,
  preferredLocations: [microLocations[index % microLocations.length].name]
}));

/** AI agent status data for control center. */
export const agentStatuses = [
  { name: 'ScraperAgent', schedule: 'Every 6h', status: 'running', successRate: 98, avgDurationMs: 22000 },
  { name: 'ValuationAgent', schedule: 'On new listing', status: 'running', successRate: 96, avgDurationMs: 4500 },
  { name: 'DealDetectorAgent', schedule: 'Every 1h', status: 'running', successRate: 95, avgDurationMs: 3200 },
  { name: 'BuyerMatchAgent', schedule: 'On new deal', status: 'idle', successRate: 93, avgDurationMs: 2500 },
  { name: 'ContentAgent', schedule: 'Daily 9am', status: 'running', successRate: 91, avgDurationMs: 12000 },
  { name: 'OutreachAgent', schedule: 'On match', status: 'running', successRate: 94, avgDurationMs: 2100 },
  { name: 'ReportAgent', schedule: 'Weekly', status: 'idle', successRate: 92, avgDurationMs: 65000 },
  { name: 'MonitorAgent', schedule: 'Every 5min', status: 'running', successRate: 99, avgDurationMs: 1200 }
];

/** Dashboard KPI cards. */
export const kpiData = [
  { label: 'Tracked Properties', value: '10,482', change: '+4.2%' },
  { label: 'High Conviction Deals', value: '34', change: '+11.7%' },
  { label: 'Active Buyers', value: '512', change: '+6.1%' },
  { label: 'Expected Commission', value: '₹2.4Cr', change: '+9.3%' }
];

/** Trust bar highlights on landing page. */
export const trustStats = [
  'Tracking 10,000+ Properties',
  '50+ Micro-Locations Analyzed',
  '₹500Cr+ in Deals Identified',
  'Updated Every 6 Hours'
];

/**
 * Returns a micro-location by slug.
 * @param {string} slug - Location slug.
 * @returns {any} Location object.
 */
export function getLocationBySlug(slug) {
  return microLocations.find((item) => item.slug === slug);
}

/**
 * Returns all location slugs.
 * @returns {string[]} Slug list.
 */
export function getAllMicroLocationSlugs() {
  return microLocations.map((item) => item.slug);
}

/**
 * Returns related locations for a given slug.
 * @param {string} slug - Active slug.
 * @returns {Array} Related records.
 */
export function getRelatedLocations(slug) {
  return microLocations.filter((item) => item.slug !== slug).slice(0, 5);
}

/**
 * Returns future placeholder alert dates.
 * @returns {Array<string>} ISO dates.
 */
export function getWeeklyPulseDates() {
  return [1, 2, 3, 4, 5].map((day) => addDays(new Date(), day).toISOString());
}
