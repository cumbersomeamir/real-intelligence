/**
 * @file Lucknow micro-location seed data.
 */

const locations = [
  'Gomti Nagar',
  'Gomti Nagar Extension',
  'Hazratganj',
  'Indira Nagar',
  'Aliganj',
  'Mahanagar',
  'Vikas Nagar',
  'Rajajipuram',
  'Alambagh',
  'Aminabad',
  'Chowk',
  'Hussainabad',
  'Lalbagh',
  'Kaiserbagh',
  'Naka Hindola',
  'Jankipuram',
  'Jankipuram Extension',
  'Chinhat',
  'Faizabad Road',
  'Sitapur Road',
  'Kanpur Road',
  'Hardoi Road',
  'Sultanpur Road',
  'Raebareli Road',
  'Shaheed Path',
  'Amar Shaheed Path',
  'Sushant Golf City',
  'Vrindavan Yojna',
  'Telibagh',
  'Madiaon',
  'Sarojini Nagar',
  'Ashiyana',
  'Eldeco Udyan',
  'Sahara States',
  'South City',
  'Ansal API',
  'Transport Nagar',
  'Charbagh',
  'Nirala Nagar',
  'Daliganj',
  'Cantonment',
  'Golf City',
  'IIM Road',
  'Kursi Road',
  'Mohanlalganj',
  'Kakori',
  'Malihabad',
  'Bakshi Ka Talab',
  'Gudamba',
  'Takrohi'
];

/**
 * Converts location name to slug.
 * @param {string} name - Name.
 * @returns {string} Slug.
 */
function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
}

/**
 * Generates deterministic micro-location seed entries.
 */
export const microLocationSeed = locations.map((name, index) => {
  const avgPricePerSqft = 2500 + (index % 12) * 350 + Math.floor(index / 8) * 120;
  const growth = 60 + (index % 30);
  const liquidity = 55 + (index % 28);
  const risk = 25 + (index % 35);
  const priceChange30d = Number((1.2 + (index % 8) * 0.6).toFixed(1));
  const priceChange90d = Number((3.2 + (index % 10) * 0.9).toFixed(1));
  const priceChange1y = Number((8.5 + (index % 12) * 1.6).toFixed(1));

  return {
    name,
    slug: slugify(name),
    city: 'Lucknow',
    center: { type: 'Point', coordinates: [80.85 + index * 0.01, 26.75 + index * 0.005] },
    stats: {
      avgPricePerSqft,
      medianPrice: avgPricePerSqft * 0.93,
      priceChange30d,
      priceChange90d,
      priceChange1y,
      transactionCount30d: 40 + (index % 35) * 3,
      avgListingDuration: 32 + (index % 19),
      activeListings: 120 + (index % 30) * 8,
      rentalYield: Number((2.8 + (index % 7) * 0.35).toFixed(2))
    },
    scores: {
      growth,
      liquidity,
      risk,
      overall: Math.round((growth + liquidity + (100 - risk)) / 3)
    },
    infrastructure: {
      upcoming: [
        {
          name: `${name} Mobility Upgrade`,
          type: 'transport',
          status: 'in-progress',
          expectedDate: new Date('2027-06-30'),
          tenderValue: 180 + index * 5
        }
      ],
      existing: [
        {
          name: `${name} Civic Connector`,
          type: 'road',
          status: 'operational',
          distance: Number((0.8 + (index % 5) * 0.4).toFixed(1))
        }
      ]
    },
    developers: [
      { name: 'Eldeco', projects: 2 + (index % 5), avgRating: Number((3.8 + (index % 5) * 0.1).toFixed(1)) },
      { name: 'Shalimar', projects: 1 + (index % 4), avgRating: Number((3.9 + (index % 4) * 0.1).toFixed(1)) }
    ],
    circleRate: Math.round(avgPricePerSqft * 0.72),
    zoningType: index % 4 === 0 ? 'residential' : index % 4 === 1 ? 'mixed-use' : index % 4 === 2 ? 'commercial' : 'residential',
    seoContent: {
      title: `${name} Property Intelligence`,
      description: `Data-led real estate analysis for ${name}, Lucknow.`,
      longDescription: `${name} is a monitored micro-location in Lucknow with tracked trends, inventory depth, and infrastructure momentum.`,
      faqs: [
        { q: `Is ${name} suitable for investment?`, a: `${name} offers measurable opportunities based on pricing and infrastructure metrics.` },
        { q: `What is the average price in ${name}?`, a: `Average price in ${name} is around ₹${avgPricePerSqft}/sqft in current tracked inventory.` }
      ]
    }
  };
});
