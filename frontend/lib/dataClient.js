/**
 * @file Unified app data client with live API + resilient local fallback.
 */

import {
  apiGet,
  apiPost,
  apiPatch,
  apiLogin,
  apiRegister,
  apiCurrentUser
} from '@/lib/api';
import {
  microLocations as mockLocations,
  trustStats,
  properties as mockProperties,
  deals as mockDeals,
  buyers as mockBuyers,
  agentStatuses as mockAgentStatuses,
  blogCategories,
  blogPosts as mockBlogPosts,
  reports as mockReports,
  getLocationBySlug,
  getRelatedLocations
} from '@/lib/mockData';
import {
  SESSION_KEYS,
  getCollection,
  setCollection,
  persistSession,
  getStoredUser,
  clearSession,
  getAccessToken
} from '@/lib/session';

const LIVE_API_ENABLED = process.env.NEXT_PUBLIC_ENABLE_LIVE_API === 'true';

/**
 * Executes an async request and falls back on failure.
 * @template T
 * @param {() => Promise<T>} requestFn - Live request.
 * @param {() => Promise<T>|T} fallbackFn - Fallback resolver.
 * @returns {Promise<T>} Data payload.
 */
async function withFallback(requestFn, fallbackFn) {
  if (!LIVE_API_ENABLED) {
    return fallbackFn();
  }

  try {
    return await requestFn();
  } catch {
    return fallbackFn();
  }
}

/**
 * Returns whether code executes in browser.
 * @returns {boolean}
 */
function isBrowser() {
  return typeof window !== 'undefined';
}

/**
 * Generates deterministic id for local entities.
 * @param {string} prefix - Prefix string.
 * @returns {string} Generated id.
 */
function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Returns local mutable deals state.
 * @returns {Array<Object>} Deals list.
 */
function getLocalDeals() {
  const cached = getCollection(SESSION_KEYS.deals, []);
  if (cached.length) return cached;

  setCollection(SESSION_KEYS.deals, mockDeals);
  return mockDeals;
}

/**
 * Returns local mutable buyers state.
 * @returns {Array<Object>} Buyer list.
 */
function getLocalBuyers() {
  const cached = getCollection(SESSION_KEYS.buyers, []);
  if (cached.length) return cached;

  setCollection(SESSION_KEYS.buyers, mockBuyers);
  return mockBuyers;
}

/**
 * Ensures a local demo account exists for offline mode.
 * @returns {Array<Object>} Local users.
 */
function ensureLocalUsers() {
  const users = getCollection(SESSION_KEYS.users, []);
  if (users.length) return users;

  const seeded = [
    {
      id: 'demo-user',
      name: 'Demo User',
      email: 'demo@lucknowpropintel.com',
      phone: '9999999999',
      role: 'admin',
      password: 'password123'
    }
  ];

  setCollection(SESSION_KEYS.users, seeded);
  return seeded;
}

/**
 * Converts backend property payload to UI model.
 * @param {Object} item - Backend property.
 * @returns {Object} Normalized property.
 */
function mapProperty(item) {
  const id = item._id || item.id;
  const microLocation = item.location?.microLocation || item.microLocation || 'Lucknow';
  const dealScore = Number(item.scores?.dealScore || item.dealScore || 0);
  const fairValue = Number(item.scores?.fairValue || item.fairValue || item.price || 0);

  return {
    id,
    sourceId: item.sourceId || id,
    source: item.source || 'internal',
    title: item.title || 'Untitled listing',
    type: item.type || 'apartment',
    subType: item.subType || item.type || 'Property',
    price: Number(item.price || 0),
    pricePerSqft: Number(item.pricePerSqft || 0),
    area: Number(item.area || 0),
    microLocation,
    slug: item.slug || microLocation.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-'),
    growthScore: Number(item.scores?.growthScore || item.growthScore || 0),
    liquidityScore: Number(item.scores?.liquidityScore || item.liquidityScore || 0),
    riskScore: Number(item.scores?.riskScore || item.riskScore || 0),
    dealScore,
    fairValue,
    discountPercent: Number(item.scores?.discountPercent || item.discountPercent || 0),
    listingDate: item.listing?.postedDate || item.listingDate || item.createdAt || new Date().toISOString(),
    images: Array.isArray(item.images) && item.images.length ? item.images : ['/images/property-placeholder-1.jpg'],
    location: {
      lat: Number(item.location?.coordinates?.coordinates?.[1] || 26.8467),
      lng: Number(item.location?.coordinates?.coordinates?.[0] || 80.9462)
    },
    history: item.listing?.priceHistory || item.history || []
  };
}

/**
 * Converts backend deal payload to UI model.
 * @param {Object} item - Backend deal.
 * @returns {Object} Normalized deal.
 */
function mapDeal(item) {
  const id = item._id || item.id;
  const property = item.property ? mapProperty(item.property) : null;
  const title = property?.title || item.title || 'Deal Opportunity';
  const price = Number(property?.price || item.price || 0);
  const fairValue = Number(property?.fairValue || item.fairValue || price);
  const discountPercent = Number(
    item.discountPercent ||
      property?.discountPercent ||
      (fairValue > 0 ? ((fairValue - price) / fairValue) * 100 : 0)
  );
  const dealScore = Number(item.dealScore || property?.dealScore || 0);

  return {
    id,
    title,
    microLocation: property?.microLocation || item.microLocation || 'Lucknow',
    price,
    fairValue,
    discountPercent: Number(discountPercent.toFixed(1)),
    growthScore: Number(property?.growthScore || 0),
    liquidityScore: Number(property?.liquidityScore || 0),
    riskScore: Number(property?.riskScore || 0),
    dealScore,
    conviction: item.conviction || (dealScore >= 85 ? 'high' : dealScore >= 70 ? 'medium' : 'low'),
    detectedAt: item.detectedAt || item.createdAt || new Date().toISOString(),
    status: item.status || 'detected',
    propertyId: property?.id || item.propertyId || null,
    matchedBuyers: item.matchedBuyers || []
  };
}

/**
 * Converts backend buyer payload to UI model.
 * @param {Object} item - Backend buyer.
 * @returns {Object} Normalized buyer.
 */
function mapBuyer(item) {
  return {
    id: item._id || item.id,
    name: item.name || 'Unnamed buyer',
    source: item.source || 'website',
    stage: item.engagement?.stage || item.stage || 'new',
    score: Number(item.score || 60),
    phone: item.phone || '',
    email: item.email || '',
    budgetMin: Number(item.preferences?.budget?.min || item.budgetMin || 0),
    budgetMax: Number(item.preferences?.budget?.max || item.budgetMax || 0),
    preferredLocations: item.preferences?.locations || item.preferredLocations || [],
    createdAt: item.createdAt || new Date().toISOString()
  };
}

/**
 * Converts backend micro-location payload to UI model.
 * @param {Object} item - Backend location.
 * @returns {Object} Normalized location.
 */
function mapMicroLocation(item) {
  return {
    name: item.name,
    slug: item.slug,
    avgPricePerSqft: Number(item.stats?.avgPricePerSqft || item.avgPricePerSqft || 0),
    growthScore: Number(item.scores?.growth || item.growthScore || 0),
    liquidityScore: Number(item.scores?.liquidity || item.liquidityScore || 0),
    riskScore: Number(item.scores?.risk || item.riskScore || 0),
    trend30d: Number(item.stats?.priceChange30d || item.trend30d || 0),
    trend90d: Number(item.stats?.priceChange90d || item.trend90d || 0),
    trend1y: Number(item.stats?.priceChange1y || item.trend1y || 0),
    activeListings: Number(item.stats?.activeListings || item.activeListings || 0),
    rentalYield: Number(item.stats?.rentalYield || item.rentalYield || 0),
    circleRate: Number(item.circleRate || 0),
    keyInfra: item.infrastructure?.upcoming?.[0]?.name || item.keyInfra || 'Infrastructure expansion in progress',
    longDescription:
      item.seoContent?.longDescription ||
      item.longDescription ||
      `${item.name} is a monitored Lucknow micro-location with active investment momentum.`,
    faq: item.seoContent?.faqs || item.faq || [],
    developers: item.developers || [],
    infrastructureTimeline:
      item.infrastructureTimeline ||
      item.infrastructure?.upcoming?.slice(0, 3).map((row) => ({
        year: new Date(row.expectedDate || Date.now()).getFullYear().toString(),
        item: row.name,
        status: row.status
      })) ||
      []
  };
}

/**
 * Converts backend blog payload to UI model.
 * @param {Object} item - Backend post.
 * @returns {Object} Post.
 */
function mapBlogPost(item) {
  return {
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt || item.content?.slice(0, 180) || 'No summary available.',
    category: item.category || 'Market Analysis',
    readTime: item.readTime || '6 min read',
    date: item.publishedAt || item.createdAt || new Date().toISOString(),
    author: item.author || 'Research Desk',
    content:
      item.content ||
      `${item.excerpt || ''} This analysis reviews price behavior, demand patterns, and risk filters relevant to active investors.`
  };
}

/**
 * Converts backend report payload to UI model.
 * @param {Object} item - Backend report.
 * @returns {Object} Report.
 */
function mapReport(item) {
  return {
    id: item._id || item.id || item.slug,
    title: item.title,
    summary: item.summary || 'Institutional-grade report.',
    price: Number(item.price || 0),
    pages: Number(item.pages || 0),
    fileUrl: item.fileUrl || ''
  };
}

/**
 * Applies deals filters.
 * @param {Array<Object>} deals - Deals list.
 * @param {Object} filters - Filter options.
 * @returns {Array<Object>} Filtered deals.
 */
function filterDeals(deals, filters = {}) {
  const q = String(filters.q || '').trim().toLowerCase();
  const minScore = Number(filters.minScore || 0);
  const maxPrice = Number(filters.maxPrice || Number.MAX_SAFE_INTEGER);
  const status = filters.status || 'all';
  const location = String(filters.location || '').trim().toLowerCase();

  return deals
    .filter((deal) => {
      if (q && !`${deal.title} ${deal.microLocation}`.toLowerCase().includes(q)) return false;
      if (status !== 'all' && deal.status !== status) return false;
      if (location && !deal.microLocation.toLowerCase().includes(location)) return false;
      if (deal.dealScore < minScore) return false;
      if (deal.price > maxPrice) return false;
      return true;
    })
    .sort((a, b) => b.dealScore - a.dealScore);
}

/**
 * Applies properties filters.
 * @param {Array<Object>} properties - Properties list.
 * @param {Object} filters - Filters.
 * @returns {Array<Object>} Filtered properties.
 */
function filterProperties(properties, filters = {}) {
  const q = String(filters.q || '').trim().toLowerCase();
  const type = filters.type || 'all';
  const location = String(filters.location || '').trim().toLowerCase();
  const minPrice = Number(filters.minPrice || 0);
  const maxPrice = Number(filters.maxPrice || Number.MAX_SAFE_INTEGER);

  return properties.filter((item) => {
    if (q && !`${item.title} ${item.microLocation}`.toLowerCase().includes(q)) return false;
    if (type !== 'all' && item.type !== type) return false;
    if (location && !item.microLocation.toLowerCase().includes(location)) return false;
    if (item.price < minPrice || item.price > maxPrice) return false;
    return true;
  });
}

/**
 * Fetches properties.
 * @param {Object} [filters] - Optional filters.
 * @returns {Promise<Array<Object>>} Property list.
 */
export async function getProperties(filters = {}) {
  return withFallback(
    async () => {
      const response = filters.q
        ? await apiGet('/properties/search', { params: { q: filters.q } })
        : await apiGet('/properties', { params: { page: 1, limit: 200 } });

      const items = Array.isArray(response.items) ? response.items.map(mapProperty) : [];
      return filterProperties(items, filters);
    },
    async () => {
      const items = mockProperties.map(mapProperty);
      return filterProperties(items, filters);
    }
  );
}

/**
 * Fetches one property.
 * @param {string} id - Property id.
 * @returns {Promise<Object|null>} Property.
 */
export async function getProperty(id) {
  const properties = await getProperties();
  return properties.find((item) => item.id === id) || null;
}

/**
 * Fetches property history.
 * @param {string} id - Property id.
 * @returns {Promise<Array<Object>>} Price history.
 */
export async function getPropertyHistory(id) {
  return withFallback(
    async () => {
      const response = await apiGet(`/properties/${id}/history`);
      return response.history || [];
    },
    async () => {
      const property = await getProperty(id);
      return property?.history || [];
    }
  );
}

/**
 * Fetches similar properties.
 * @param {string} id - Base property id.
 * @returns {Promise<Array<Object>>} Similar list.
 */
export async function getSimilarProperties(id) {
  return withFallback(
    async () => {
      const response = await apiGet(`/properties/${id}/similar`);
      return (response.items || []).map(mapProperty);
    },
    async () => {
      const list = await getProperties();
      const base = list.find((item) => item.id === id);
      if (!base) return [];
      return list
        .filter((item) => item.id !== id && item.type === base.type && item.microLocation === base.microLocation)
        .slice(0, 6);
    }
  );
}

/**
 * Fetches deals board.
 * @param {Object} [filters] - Filter payload.
 * @returns {Promise<Array<Object>>} Deals list.
 */
export async function getDeals(filters = {}) {
  return withFallback(
    async () => {
      const response = await apiGet('/deals');
      const liveDeals = (response.items || []).map(mapDeal);
      const normalized = liveDeals.length ? liveDeals : getLocalDeals();
      return filterDeals(normalized, filters);
    },
    async () => filterDeals(getLocalDeals().map(mapDeal), filters)
  );
}

/**
 * Fetches one deal by id.
 * @param {string} id - Deal id.
 * @returns {Promise<Object|null>} Deal detail.
 */
export async function getDeal(id) {
  return withFallback(
    async () => {
      const response = await apiGet(`/deals/${id}`);
      return mapDeal(response);
    },
    async () => {
      const deals = await getDeals();
      return deals.find((item) => item.id === id) || null;
    }
  );
}

/**
 * Updates deal status.
 * @param {string} id - Deal id.
 * @param {string} status - New status.
 * @returns {Promise<Object|null>} Updated deal.
 */
export async function updateDealStatus(id, status) {
  return withFallback(
    async () => mapDeal(await apiPatch(`/deals/${id}/status`, { status })),
    async () => {
      const deals = getLocalDeals();
      const next = deals.map((item) => (item.id === id ? { ...item, status } : item));
      setCollection(SESSION_KEYS.deals, next);
      return next.find((item) => item.id === id) || null;
    }
  );
}

/**
 * Matches buyers to a deal.
 * @param {string} id - Deal id.
 * @param {Array<string>} buyerIds - Buyer ids.
 * @returns {Promise<Object|null>} Updated deal.
 */
export async function matchDealToBuyers(id, buyerIds = []) {
  return withFallback(
    async () => mapDeal(await apiPost(`/deals/${id}/match`, { buyerIds })),
    async () => {
      const deals = getLocalDeals();
      const next = deals.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'matched',
              matchedBuyers: buyerIds
            }
          : item
      );
      setCollection(SESSION_KEYS.deals, next);
      return next.find((item) => item.id === id) || null;
    }
  );
}

/**
 * Fetches buyers.
 * @returns {Promise<Array<Object>>} Buyers list.
 */
export async function getBuyers() {
  return withFallback(
    async () => {
      const response = await apiGet('/buyers', { params: { page: 1, limit: 300 } });
      const items = (response.items || []).map(mapBuyer);
      return items.length ? items : getLocalBuyers().map(mapBuyer);
    },
    async () => getLocalBuyers().map(mapBuyer)
  );
}

/**
 * Creates buyer.
 * @param {Object} payload - Buyer payload.
 * @returns {Promise<Object>} Created buyer.
 */
export async function createBuyer(payload) {
  const requestBody = {
    name: payload.name,
    phone: payload.phone,
    email: payload.email || '',
    source: payload.source || 'website',
    score: Number(payload.score || 60),
    preferences: {
      budget: {
        min: Number(payload.budgetMin || 0),
        max: Number(payload.budgetMax || 0)
      },
      locations: payload.preferredLocations || []
    },
    engagement: {
      stage: payload.stage || 'new',
      totalInteractions: 0,
      siteVisits: 0
    }
  };

  return withFallback(
    async () => mapBuyer(await apiPost('/buyers', requestBody)),
    async () => {
      const items = getLocalBuyers();
      const created = {
        id: makeId('buyer'),
        name: payload.name,
        source: payload.source || 'website',
        stage: payload.stage || 'new',
        score: Number(payload.score || 60),
        phone: payload.phone || '',
        email: payload.email || '',
        budgetMin: Number(payload.budgetMin || 0),
        budgetMax: Number(payload.budgetMax || 0),
        preferredLocations: payload.preferredLocations || [],
        createdAt: new Date().toISOString()
      };
      const next = [created, ...items];
      setCollection(SESSION_KEYS.buyers, next);
      return created;
    }
  );
}

/**
 * Fetches one buyer.
 * @param {string} id - Buyer id.
 * @returns {Promise<Object|null>} Buyer detail.
 */
export async function getBuyer(id) {
  return withFallback(
    async () => mapBuyer(await apiGet(`/buyers/${id}`)),
    async () => {
      const buyers = await getBuyers();
      return buyers.find((item) => item.id === id) || null;
    }
  );
}

/**
 * Computes buyer demand map data.
 * @returns {Promise<Array<Object>>} Demand rows.
 */
export async function getBuyerDemandMap() {
  return withFallback(
    async () => {
      const response = await apiGet('/buyers/demand-map');
      return (response.items || []).map((item) => ({
        name: item._id,
        value: item.count
      }));
    },
    async () => {
      const buyers = await getBuyers();
      const counts = buyers.reduce((acc, buyer) => {
        const location = buyer.preferredLocations?.[0] || 'Unknown';
        acc[location] = (acc[location] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }
  );
}

/**
 * Computes buyer pipeline stats.
 * @returns {Promise<Array<Object>>} Pipeline rows.
 */
export async function getBuyerPipeline() {
  return withFallback(
    async () => {
      const response = await apiGet('/buyers/pipeline');
      return (response.items || []).map((item) => ({
        stage: item._id,
        count: item.count
      }));
    },
    async () => {
      const buyers = await getBuyers();
      const counts = buyers.reduce((acc, buyer) => {
        const stage = buyer.stage || 'new';
        acc[stage] = (acc[stage] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(counts).map(([stage, count]) => ({ stage, count }));
    }
  );
}

/**
 * Fetches micro-locations list.
 * @returns {Promise<Array<Object>>} Location list.
 */
export async function getMicroLocations() {
  return withFallback(
    async () => {
      const response = await apiGet('/micro-locations');
      const items = (response.items || []).map(mapMicroLocation);
      return items.length ? items : mockLocations;
    },
    async () => mockLocations
  );
}

/**
 * Fetches micro-location detail.
 * @param {string} slug - Location slug.
 * @returns {Promise<Object|null>} Location detail.
 */
export async function getMicroLocation(slug) {
  return withFallback(
    async () => mapMicroLocation(await apiGet(`/micro-locations/${slug}`)),
    async () => getLocationBySlug(slug) || null
  );
}

/**
 * Fetches blog listing.
 * @returns {Promise<{categories:string[],items:Array<Object>}>} Blog payload.
 */
export async function getBlogListing() {
  return withFallback(
    async () => {
      const response = await apiGet('/blog', { params: { page: 1, limit: 100 } });
      const items = (response.items || []).map(mapBlogPost);
      const categories = [...new Set(items.map((item) => item.category))];
      return {
        categories: categories.length ? categories : blogCategories,
        items: items.length ? items : mockBlogPosts
      };
    },
    async () => ({ categories: blogCategories, items: mockBlogPosts })
  );
}

/**
 * Fetches one blog post.
 * @param {string} slug - Post slug.
 * @returns {Promise<Object|null>} Post data.
 */
export async function getBlogPost(slug) {
  return withFallback(
    async () => mapBlogPost(await apiGet(`/blog/${slug}`)),
    async () => mockBlogPosts.find((item) => item.slug === slug) || null
  );
}

/**
 * Fetches reports list.
 * @returns {Promise<Array<Object>>} Reports list.
 */
export async function getReports() {
  return withFallback(
    async () => {
      const response = await apiGet('/reports');
      const items = (response.items || []).map(mapReport);
      return items.length ? items : mockReports;
    },
    async () => mockReports
  );
}

/**
 * Fetches report by id.
 * @param {string} id - Report id.
 * @returns {Promise<Object|null>} Report.
 */
export async function getReport(id) {
  return withFallback(
    async () => mapReport(await apiGet(`/reports/${id}`)),
    async () => mockReports.find((item) => item.id === id) || null
  );
}

/**
 * Purchases report.
 * @param {string} id - Report id.
 * @returns {Promise<Object>} Purchase result.
 */
export async function purchaseReport(id) {
  return withFallback(
    async () => apiPost(`/reports/${id}/purchase`, {}),
    async () => ({
      message: 'Report unlocked in demo mode.',
      transactionId: makeId('txn'),
      reportId: id
    })
  );
}

/**
 * Fetches dashboard snapshot.
 * @returns {Promise<Object>} Snapshot payload.
 */
export async function getDashboardSnapshot() {
  const [market, deals, buyers, locations] = await Promise.all([
    getMarketOverview(),
    getDeals(),
    getBuyers(),
    getMicroLocations()
  ]);

  const trackedProperties = Number(market.trackedProperties || mockProperties.length);
  const highConviction = deals.filter((item) => item.dealScore >= 85).length;

  return {
    trackedProperties,
    microLocations: Number(market.microLocations || locations.length),
    highConvictionDeals: highConviction,
    activeBuyers: buyers.length,
    avgDealScore: Number(market.avgDealScore || 0).toFixed(1),
    topDeals: deals.slice(0, 6),
    recentAlerts: [
      `${highConviction} high-conviction opportunities detected`,
      `${buyers.filter((item) => item.stage === 'qualified').length} buyers in qualified stage`,
      `Average deal score ${Number(market.avgDealScore || 0).toFixed(1)}/100`
    ],
    trustStats
  };
}

/**
 * Fetches market overview metrics.
 * @returns {Promise<Object>} Overview object.
 */
export async function getMarketOverview() {
  return withFallback(
    async () => apiGet('/analytics/market'),
    async () => {
      const properties = await getProperties();
      const locations = await getMicroLocations();
      const avgScore =
        properties.reduce((sum, item) => sum + Number(item.dealScore || 0), 0) / (properties.length || 1);
      return {
        trackedProperties: properties.length,
        microLocations: locations.length,
        avgDealScore: Number(avgScore.toFixed(2))
      };
    }
  );
}

/**
 * Fetches trend data.
 * @returns {Promise<Array<Object>>} Trend rows.
 */
export async function getTrendData() {
  return withFallback(
    async () => {
      const response = await apiGet('/analytics/trends');
      return (response.items || []).map((item) => ({
        name: item.name,
        trend30d: Number(item.stats?.priceChange30d || 0),
        trend90d: Number(item.stats?.priceChange90d || 0),
        trend1y: Number(item.stats?.priceChange1y || 0)
      }));
    },
    async () => {
      const locations = await getMicroLocations();
      return locations.map((item) => ({
        name: item.name,
        trend30d: Number(item.trend30d || 0),
        trend90d: Number(item.trend90d || 0),
        trend1y: Number(item.trend1y || 0)
      }));
    }
  );
}

/**
 * Fetches supply-demand metrics.
 * @returns {Promise<Object>} Supply-demand result.
 */
export async function getSupplyDemand() {
  return withFallback(
    async () => apiGet('/analytics/supply-demand'),
    async () => {
      const properties = await getProperties();
      const supply = properties.length;
      const demand = properties.filter((item) => item.dealScore >= 80).length;
      return {
        supply,
        demand,
        ratio: supply ? Number((demand / supply).toFixed(2)) : 0
      };
    }
  );
}

/**
 * Fetches AI forecasts.
 * @returns {Promise<Object>} Forecast payload.
 */
export async function getForecasts() {
  return withFallback(
    async () => apiGet('/analytics/forecasts'),
    async () => ({
      forecastWindow: 'next_90_days',
      expectedPriceRangeChange: { min: 2.3, max: 4.9 },
      confidence: 78
    })
  );
}

/**
 * Runs natural language deal query.
 * @param {string} query - NL query.
 * @returns {Promise<Object>} Query result.
 */
export async function runNaturalLanguageQuery(query) {
  return withFallback(
    async () => {
      const response = await fetch('/api/ai/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      if (!response.ok) {
        throw new Error('AI query failed');
      }

      return response.json();
    },
    async () => {
      const deals = await getDeals({ q: query, minScore: 70 });
      return {
        query,
        interpreted: { fallback: true },
        items: deals.slice(0, 10)
      };
    }
  );
}

/**
 * Fetches map dataset.
 * @returns {Promise<Array<Object>>} Marker list.
 */
export async function getMapDataset() {
  return withFallback(
    async () => {
      const response = await apiGet('/properties/map');
      const features = response.features || [];
      return features.map((feature) => ({
        id: feature.properties?.id,
        title: feature.properties?.title || 'Listing',
        price: Number(feature.properties?.price || 0),
        dealScore: Number(feature.properties?.dealScore || 0),
        lng: Number(feature.geometry?.coordinates?.[0] || 80.9462),
        lat: Number(feature.geometry?.coordinates?.[1] || 26.8467)
      }));
    },
    async () => {
      const properties = await getProperties();
      return properties.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        dealScore: item.dealScore,
        lng: item.location.lng,
        lat: item.location.lat
      }));
    }
  );
}

/**
 * Fetches agents status list.
 * @returns {Promise<Array<Object>>} Agents list.
 */
export async function getAgents() {
  return withFallback(
    async () => {
      const response = await apiGet('/agents');
      return (response.items || []).map((item) => ({
        name: item.name,
        status: item.status,
        successRate: Number(item.metrics?.successRate || 0),
        avgDurationMs: Number(item.metrics?.avgDurationMs || 0),
        schedule: item.config?.schedule || 'manual',
        health: item.health || 'healthy'
      }));
    },
    async () => getCollection('propintel.agents', mockAgentStatuses)
  );
}

/**
 * Triggers an agent.
 * @param {string} name - Agent name.
 * @returns {Promise<Object>} Trigger result.
 */
export async function triggerAgent(name) {
  return withFallback(
    async () => apiPost(`/agents/${name}/trigger`, { reason: 'manual-ui-trigger' }),
    async () => ({ message: `${name} queued in demo mode.`, jobId: makeId('job') })
  );
}

/**
 * Toggles agent status.
 * @param {string} name - Agent name.
 * @param {boolean} enabled - Enabled status.
 * @returns {Promise<Object>} Toggle result.
 */
export async function toggleAgent(name, enabled) {
  return withFallback(
    async () => apiPost(`/agents/${name}/toggle`, { enabled }),
    async () => {
      const agents = getCollection('propintel.agents', mockAgentStatuses);
      const next = agents.map((item) =>
        item.name === name
          ? {
              ...item,
              status: enabled ? 'running' : 'paused'
            }
          : item
      );
      setCollection('propintel.agents', next);
      return { name, status: enabled ? 'running' : 'paused' };
    }
  );
}

/**
 * Fetches scraper summary.
 * @returns {Promise<Object>} Scraper payload.
 */
export async function getScraperSummary() {
  const [status, history, quality] = await Promise.all([
    withFallback(
      async () => (await apiGet('/scraper/status')).items || [],
      async () => [
        { source: 'ninety9acres', status: 'healthy' },
        { source: 'magicbricks', status: 'healthy' },
        { source: 'housing', status: 'degraded' }
      ]
    ),
    withFallback(
      async () => (await apiGet('/scraper/history')).items || [],
      async () => []
    ),
    withFallback(
      async () => await apiGet('/scraper/quality'),
      async () => ({ total: 0, deduped: 0, dedupRatio: 0 })
    )
  ]);

  return { status, history, quality };
}

/**
 * Triggers scraping for source.
 * @param {string} source - Source name.
 * @returns {Promise<Object>} Trigger result.
 */
export async function triggerScraper(source) {
  return withFallback(
    async () => apiPost(`/scraper/trigger/${source}`, {}),
    async () => ({ message: `Scrape for ${source} queued in demo mode.` })
  );
}

/**
 * Fetches social dashboard snapshot.
 * @returns {Promise<Object>} Social metrics.
 */
export async function getSocialOverview() {
  return withFallback(
    async () => apiGet('/social/overview'),
    async () => ({
      engagement: { reach: 124000, saves: 6100, shares: 3200 },
      ads: { spend: 180000, roas: 3.2 }
    })
  );
}

/**
 * Generates social content.
 * @param {Object} payload - Generation payload.
 * @returns {Promise<string>} Generated draft.
 */
export async function generateSocialDraft(payload) {
  return withFallback(
    async () => {
      const response = await apiPost('/social/generate', payload);
      return response.draft || 'No draft generated.';
    },
    async () =>
      `Demo draft: ${payload?.format || 'Post'} for ${payload?.location || 'Lucknow'} highlighting high-conviction investment opportunities.`
  );
}

/**
 * Fetches WhatsApp dashboard data.
 * @returns {Promise<Object>} WhatsApp payload.
 */
export async function getWhatsAppSummary() {
  const [templates, stats] = await Promise.all([
    withFallback(
      async () => (await apiGet('/whatsapp/templates')).items || [],
      async () => [
        { id: 'deal_alert', name: 'Deal Alert', body: 'A high-conviction deal matched your criteria.' },
        { id: 'site_visit', name: 'Site Visit Reminder', body: 'Reminder: your site visit is scheduled tomorrow.' }
      ]
    ),
    withFallback(
      async () => await apiGet('/whatsapp/stats'),
      async () => ({ delivered: 96, read: 71, failed: 2.1 })
    )
  ]);

  const messages = getCollection(SESSION_KEYS.messages, []);
  return { templates, stats, messages };
}

/**
 * Sends single WhatsApp message.
 * @param {Object} payload - Message payload.
 * @returns {Promise<Object>} Send result.
 */
export async function sendWhatsApp(payload) {
  return withFallback(
    async () => apiPost('/whatsapp/send', payload),
    async () => {
      const messages = getCollection(SESSION_KEYS.messages, []);
      const next = [
        {
          id: makeId('msg'),
          recipient: payload.recipient,
          template: payload.template || 'custom',
          body: payload.body,
          status: 'queued',
          createdAt: new Date().toISOString()
        },
        ...messages
      ];
      setCollection(SESSION_KEYS.messages, next);
      return { accepted: true, queued: 1 };
    }
  );
}

/**
 * Sends broadcast campaign.
 * @param {Object} payload - Broadcast payload.
 * @returns {Promise<Object>} Broadcast result.
 */
export async function broadcastWhatsApp(payload) {
  return withFallback(
    async () => apiPost('/whatsapp/broadcast', payload),
    async () => {
      const recipients = payload.recipients || [];
      return { count: recipients.length, results: recipients.map((recipient) => ({ recipient, queued: true })) };
    }
  );
}

/**
 * Fetches revenue dashboard payload.
 * @returns {Promise<Object>} Revenue metrics.
 */
export async function getRevenueSummary() {
  const [overview, commissions, subscriptions, leadCost] = await Promise.all([
    withFallback(async () => apiGet('/revenue/overview'), async () => ({ realizedCommission: 0, activeSubscriptions: 0 })),
    withFallback(async () => apiGet('/revenue/commissions'), async () => ({ items: [] })),
    withFallback(async () => apiGet('/revenue/subscriptions'), async () => ({ items: [] })),
    withFallback(async () => apiGet('/revenue/lead-cost'), async () => ({ spend: 250000, qualified: 0, costPerQualifiedLead: 0 }))
  ]);

  const localDeals = await getDeals();
  const expectedCommission = localDeals.reduce((sum, deal) => sum + Number(deal.price || 0) * 0.01, 0);

  return {
    realizedCommission: Number(overview.realizedCommission || expectedCommission * 0.7),
    expectedCommission: Number(expectedCommission.toFixed(0)),
    activeSubscriptions: Number(overview.activeSubscriptions || subscriptions.items?.reduce((sum, row) => sum + row.count, 0) || 0),
    commissions: commissions.items || [],
    subscriptions: subscriptions.items || [],
    leadCost
  };
}

/**
 * Reads user settings.
 * @returns {Object} Settings object.
 */
export function getUserSettings() {
  return getCollection(SESSION_KEYS.settings, {
    alerts: { email: true, whatsapp: true, push: false },
    language: 'en',
    theme: 'dark',
    budgetMin: 3000000,
    budgetMax: 15000000
  });
}

/**
 * Saves user settings.
 * @param {Object} patch - Partial settings.
 * @returns {Object} Updated settings.
 */
export function saveUserSettings(patch) {
  const current = getUserSettings();
  const next = {
    ...current,
    ...patch,
    alerts: {
      ...(current.alerts || {}),
      ...(patch.alerts || {})
    }
  };
  setCollection(SESSION_KEYS.settings, next);
  return next;
}

/**
 * Returns API keys list.
 * @returns {Array<Object>} Key rows.
 */
export function getApiKeys() {
  return getCollection(SESSION_KEYS.apiKeys, []);
}

/**
 * Creates local API key row.
 * @param {string} label - Key label.
 * @returns {Object} Created key.
 */
export function createApiKey(label) {
  const current = getApiKeys();
  const created = {
    id: makeId('key'),
    label,
    token: `pi_${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`,
    createdAt: new Date().toISOString()
  };
  const next = [created, ...current];
  setCollection(SESSION_KEYS.apiKeys, next);
  return created;
}

/**
 * Deletes local API key.
 * @param {string} id - Key id.
 * @returns {Array<Object>} Updated rows.
 */
export function deleteApiKey(id) {
  const next = getApiKeys().filter((item) => item.id !== id);
  setCollection(SESSION_KEYS.apiKeys, next);
  return next;
}

/**
 * Returns team roster.
 * @returns {Array<Object>} Team members.
 */
export function getTeamMembers() {
  return getCollection(SESSION_KEYS.team, []);
}

/**
 * Adds team member locally.
 * @param {Object} payload - Team member payload.
 * @returns {Object} Added member.
 */
export function inviteTeamMember(payload) {
  const current = getTeamMembers();
  const created = {
    id: makeId('team'),
    name: payload.name,
    email: payload.email,
    role: payload.role || 'viewer',
    invitedAt: new Date().toISOString()
  };
  const next = [created, ...current];
  setCollection(SESSION_KEYS.team, next);
  return created;
}

/**
 * Removes team member locally.
 * @param {string} id - Member id.
 * @returns {Array<Object>} Updated roster.
 */
export function removeTeamMember(id) {
  const next = getTeamMembers().filter((item) => item.id !== id);
  setCollection(SESSION_KEYS.team, next);
  return next;
}

/**
 * Updates local user profile.
 * @param {Object} patch - Profile patch.
 * @returns {Object|null} Updated user.
 */
export function updateLocalProfile(patch) {
  const user = getStoredUser();
  if (!user) return null;

  const updated = { ...user, ...patch };
  persistSession({ accessToken: getAccessToken(), user: updated });
  return updated;
}

/**
 * Submits contact form lead.
 * @param {Object} payload - Contact payload.
 * @returns {Object} Saved lead.
 */
export function submitContactLead(payload) {
  const current = getCollection(SESSION_KEYS.contactLeads, []);
  const created = {
    id: makeId('lead'),
    ...payload,
    createdAt: new Date().toISOString()
  };
  setCollection(SESSION_KEYS.contactLeads, [created, ...current]);
  return created;
}

/**
 * Returns a location detail companion payload.
 * @param {string} slug - Location slug.
 * @returns {Promise<{location:Object|null,related:Array<Object>,topDeals:Array<Object>}>} Detail payload.
 */
export async function getMicroLocationDetailPayload(slug) {
  const [location, locations, deals] = await Promise.all([getMicroLocation(slug), getMicroLocations(), getDeals()]);

  if (!location) {
    return {
      location: null,
      related: [],
      topDeals: []
    };
  }

  const related = locations.filter((item) => item.slug !== slug).slice(0, 5);
  const topDeals = deals.filter((item) => item.microLocation === location.name).slice(0, 5);

  // Keep richer fallback blocks for static mock entries.
  const staticLocation = getLocationBySlug(slug);

  return {
    location: staticLocation ? { ...staticLocation, ...location } : location,
    related: related.length ? related : getRelatedLocations(slug),
    topDeals
  };
}

/**
 * Performs auth login with live fallback.
 * @param {Object} payload - Login payload.
 * @returns {Promise<Object>} Logged-in user.
 */
export async function loginUser(payload) {
  return withFallback(
    async () => {
      const data = await apiLogin(payload);
      persistSession({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: data.user
      });
      return data.user;
    },
    async () => {
      const users = ensureLocalUsers();
      const match = users.find(
        (user) =>
          (user.email === payload.identifier || user.phone === payload.identifier) &&
          user.password === payload.password
      );

      if (!match) {
        throw new Error('Invalid credentials. Use demo@lucknowpropintel.com / password123');
      }

      const localUser = {
        id: match.id,
        name: match.name,
        email: match.email,
        phone: match.phone,
        role: match.role
      };

      persistSession({
        accessToken: `local-${match.id}-${Date.now()}`,
        refreshToken: '',
        user: localUser
      });

      return localUser;
    }
  );
}

/**
 * Performs auth registration with live fallback.
 * @param {Object} payload - Registration payload.
 * @returns {Promise<Object>} Created user.
 */
export async function registerUser(payload) {
  return withFallback(
    async () => {
      const data = await apiRegister(payload);
      persistSession({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: data.user
      });
      return data.user;
    },
    async () => {
      const users = ensureLocalUsers();
      const exists = users.some((user) => user.email === payload.email || user.phone === payload.phone);
      if (exists) {
        throw new Error('User already exists. Please login.');
      }

      const created = {
        id: makeId('user'),
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        role: payload.role || 'investor',
        password: payload.password
      };

      setCollection(SESSION_KEYS.users, [...users, created]);

      const sessionUser = {
        id: created.id,
        name: created.name,
        email: created.email,
        phone: created.phone,
        role: created.role
      };

      persistSession({
        accessToken: `local-${created.id}-${Date.now()}`,
        refreshToken: '',
        user: sessionUser
      });

      return sessionUser;
    }
  );
}

/**
 * Returns current user profile.
 * @returns {Promise<Object|null>} Current user.
 */
export async function getCurrentUser() {
  return withFallback(
    async () => await apiCurrentUser(),
    async () => getStoredUser()
  );
}

/**
 * Clears local session.
 */
export function logoutUser() {
  clearSession();
}

/**
 * Returns home page dataset.
 * @returns {Promise<Object>} Home payload.
 */
export async function getHomePayload() {
  const [locations, snapshot] = await Promise.all([getMicroLocations(), getDashboardSnapshot()]);
  return {
    topLocations: locations.slice(0, 6),
    trustStats: snapshot.trustStats,
    trackedProperties: snapshot.trackedProperties,
    activeDeals: snapshot.highConvictionDeals,
    activeBuyers: snapshot.activeBuyers,
    avgDealScore: snapshot.avgDealScore
  };
}

/**
 * Returns nav user (cached profile).
 * @returns {Object|null} User payload.
 */
export function getSessionUser() {
  return getStoredUser();
}

/**
 * Utility exported for route guards.
 * @returns {boolean} Auth state.
 */
export function isAuthenticated() {
  return Boolean(getAccessToken());
}
