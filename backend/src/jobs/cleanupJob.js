/**
 * @file Cleanup/retention background job.
 */

/**
 * Executes runCleanupJob workflow.
 * @param {Object} [input={}] - Job input.
 * @returns {Promise<Object>} Job result.
 */
export async function runCleanupJob(input = {}) {
  return { ok: true, job: 'runCleanupJob', input };
}
