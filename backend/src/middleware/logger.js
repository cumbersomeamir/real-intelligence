/**
 * @file Request logger middleware.
 */

import morgan from 'morgan';

/** Morgan request logger. */
export const requestLogger = morgan('combined');
