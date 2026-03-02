/**
 * @file Sample property seed data.
 */

import { microLocationSeed } from './microLocations.js';

const types = ['apartment', 'plot', 'villa', 'commercial'];
const subTypes = ['2BHK', '3BHK', 'Residential Plot', 'Retail Unit'];
const sources = ['99acres', 'magicbricks', 'housing', 'olx', 'facebook', 'localBuilders'];

/**
 * Generates 50 sample properties distributed across Lucknow locations.
 */
export const samplePropertySeed = Array.from({ length: 50 }).map((_, index) => {
  const location = microLocationSeed[index % microLocationSeed.length];
  const type = types[index % types.length];
  const subType = subTypes[index % subTypes.length];
  const area = 900 + (index % 9) * 220;
  const pricePerSqft = location.stats.avgPricePerSqft + (index % 6) * 80;
  const price = area * pricePerSqft;
  const growthScore = location.scores.growth;
  const liquidityScore = location.scores.liquidity;
  const riskScore = location.scores.risk;
  const dealScore = Math.round((growthScore + liquidityScore + (100 - riskScore)) / 3 + (index % 8));

  return {
    sourceId: `seed-${index + 1000}`,
    source: sources[index % sources.length],
    title: `${location.name} ${subType} ${type === 'plot' ? 'Plot' : 'Listing'}`,
    type,
    subType,
    price,
    pricePerSqft,
    area,
    location: {
      address: `${index + 1}, ${location.name}, Lucknow`,
      microLocation: location.name,
      coordinates: {
        type: 'Point',
        coordinates: [location.center.coordinates[0] + 0.01, location.center.coordinates[1] + 0.01]
      },
      city: 'Lucknow'
    },
    builder: {
      name: index % 2 === 0 ? 'Eldeco' : 'Shalimar',
      credibilityScore: 65 + (index % 30)
    },
    amenities: ['Parking', 'Power Backup', 'Security'],
    images: ['https://example.com/property-1.jpg', 'https://example.com/property-2.jpg'],
    contact: { hash: `hash-${index + 1}` },
    listing: {
      postedDate: new Date(Date.now() - (index + 2) * 86400000),
      lastPriceUpdate: new Date(Date.now() - index * 86400000),
      priceHistory: [
        { price: Math.round(price * 1.05), date: new Date(Date.now() - 45 * 86400000) },
        { price, date: new Date(Date.now() - 5 * 86400000) }
      ],
      durationDays: 18 + index,
      status: 'active'
    },
    proximity: {
      metro: { distance: Number((1 + (index % 6) * 0.4).toFixed(1)), travelTime: 8 + (index % 10), nearest: 'Nearest Metro' },
      airport: { distance: Number((7 + (index % 8) * 1.2).toFixed(1)), travelTime: 22 + (index % 15) },
      schools: [{ name: 'City School', distance: 1.2, rating: 4.1 }],
      hospitals: [{ name: 'City Hospital', distance: 2.1 }],
      highways: { distance: 3.4, nearest: 'NH Corridor' },
      itParks: [{ name: 'IT Hub', distance: 4.6 }],
      commercialHubs: [{ name: 'Business District', distance: 3.8 }]
    },
    scores: {
      fairValue: Math.round(price * 1.08),
      fairValueConfidence: 65 + (index % 25),
      discountPercent: 4 + (index % 12),
      growthScore,
      liquidityScore,
      riskScore,
      dealScore,
      locationDesirability: Math.round((growthScore + liquidityScore) / 2)
    },
    urgency: {
      score: 35 + (index % 45),
      signals: index % 3 === 0 ? ['price_dropped'] : ['new_listing']
    },
    legal: {
      reraApproved: index % 5 !== 0,
      reraId: `UPRERA${index + 5000}`,
      litigationFlag: index % 17 === 0,
      completionStatus: index % 4 === 0 ? 'ready-to-move' : 'under-construction'
    },
    metadata: {
      scraped: new Date(),
      lastScored: new Date(),
      lastUpdated: new Date(),
      version: 1
    }
  };
});
