/**
 * @file Report generation service.
 */

import { Report } from '../../models/Report.js';

/**
 * Creates a report record payload.
 * @param {Object} input - Report input.
 * @returns {Promise<Object>} Report object.
 */
export async function generateReport(input) {
  return Report.create({
    title: input.title,
    slug: input.slug,
    summary: input.summary,
    price: input.price || 0,
    pages: input.pages || 40,
    locationSlug: input.locationSlug,
    fileUrl: input.fileUrl || ''
  });
}
