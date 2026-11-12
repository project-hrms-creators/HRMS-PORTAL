/**
 * @typedef {Object} Report
 * @property {string} id - UUID
 * @property {string} title
 * @property {string} description
 * @property {string} category_id - Reference to ReportCategory (e.g., Employee, Attendance)
 * @property {Array<string>} required_permissions - e.g., ['VIEW_ATTENDANCE']
 * @property {boolean} is_system - True if built-in, false if custom built via builder
 */

/**
 * @typedef {Object} ReportFilter
 * @property {string} field - e.g., 'department_id', 'start_date', 'status'
 * @property {string} operator - e.g., 'equals', 'in', 'between', 'greater_than'
 * @property {any} value
 */

/**
 * @typedef {Object} SavedReport
 * @property {string} id - UUID
 * @property {string} report_id - Reference to base Report
 * @property {string} name - User's custom name for this saved configuration
 * @property {string} created_by - Employee UUID
 * @property {Array<ReportFilter>} filters
 * @property {string} created_at
 */

/**
 * @typedef {Object} KpiMetric
 * @property {string} id
 * @property {string} label
 * @property {number|string} value
 * @property {number} [trend_percentage]
 * @property {'up'|'down'|'neutral'} [trend_direction]
 */

/**
 * @typedef {Object} ChartData
 * @property {Array<string>} labels - X-axis labels
 * @property {Array<Object>} datasets
 * @property {Array<number>} datasets.data
 * @property {string} [datasets.label]
 * @property {string} [datasets.color]
 */

export {};
