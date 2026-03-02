/**
 * @file Base AI agent class.
 */

/**
 * Base class for all autonomous agents.
 */
export class BaseAgent {
  /**
   * Initializes base agent fields.
   * @param {string} name - Agent name.
   * @param {Object} [config={}] - Agent config.
   */
  constructor(name, config = {}) {
    this.name = name;
    this.config = config;
    this.status = 'idle';
    this.lastRun = null;
    this.metrics = { success: 0, failure: 0, avgDuration: 0 };
  }

  /** Initializes agent resources. */
  async initialize() {}

  /**
   * Executes main agent task.
   * @param {Object} task - Input task.
   * @returns {Promise<any>} Result payload.
   */
  async execute(task) {
    return task;
  }

  /**
   * Validates output quality.
   * @param {any} result - Task result.
   * @returns {Promise<boolean>} Validation result.
   */
  async validate(result) {
    return Boolean(result);
  }

  /**
   * Post-success hook.
   * @param {any} result - Success payload.
   */
  async onSuccess(result) {
    return result;
  }

  /**
   * Error hook.
   * @param {Error} error - Error object.
   */
  async onFailure(error) {
    return error;
  }

  /** Gracefully shuts down resources. */
  async shutdown() {}

  /**
   * Records task outcome into metrics context.
   * @param {string} taskId - Task id.
   * @param {Object} outcome - Outcome payload.
   */
  async recordOutcome(taskId, outcome) {
    this.lastRun = new Date();
    if (outcome.success) this.metrics.success += 1;
    else this.metrics.failure += 1;
  }

  /**
   * Adjusts strategy based on feedback.
   * @param {Object} feedback - Feedback payload.
   * @returns {Promise<Object>} Updated config.
   */
  async adjustStrategy(feedback) {
    this.config = { ...this.config, ...feedback };
    return this.config;
  }

  /**
   * Returns current health state.
   * @returns {{name:string,status:string,lastRun:Date|null}} Health payload.
   */
  getHealth() {
    return { name: this.name, status: this.status, lastRun: this.lastRun };
  }

  /**
   * Returns metrics snapshot.
   * @returns {Object} Metrics payload.
   */
  getMetrics() {
    return this.metrics;
  }
}
