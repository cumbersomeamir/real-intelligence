/**
 * @file Satellite/construction change detection interface (Phase 2 stub).
 */

/**
 * Placeholder interface for satellite change detection.
 * @param {Object} input - Service input.
 * @returns {Promise<Object>} Stub response.
 */
export async function detectConstructionChanges(input = {}) {
  return {
    supported: false,
    phase: 2,
    message: 'Satellite/change detection pipeline is stubbed for Phase 2.',
    input
  };
}
