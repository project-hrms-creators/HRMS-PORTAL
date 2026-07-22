/**
 * @typedef {Object} Department
 * @property {string} id
 * @property {string} name
 * @property {string} code
 * @property {string} [description]
 * @property {string} [managerId] - Department head
 * @property {string} [parentDepartmentId]
 * @property {'ACTIVE' | 'ARCHIVED'} status
 */

/**
 * @typedef {Object} Designation
 * @property {string} id
 * @property {string} title
 * @property {string} departmentId
 * @property {number} level - Level in hierarchy (e.g. 1, 2, 3)
 * @property {string} [description]
 * @property {'ACTIVE' | 'ARCHIVED'} status
 */

/**
 * @typedef {Object} Team
 * @property {string} id
 * @property {string} name
 * @property {string} departmentId
 * @property {string} [managerId] - Team Lead
 * @property {number} memberCount
 */

/**
 * @typedef {Object} Location
 * @property {string} id
 * @property {string} name
 * @property {'OFFICE' | 'REMOTE' | 'HYBRID'} type
 * @property {string} [region]
 * @property {string} timezone
 * @property {string} country
 * @property {string} [state]
 * @property {string} city
 */

/**
 * @typedef {Object} ReportingManager
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 */

/**
 * @typedef {Object} OrganizationNode
 * @property {string} id
 * @property {string} name
 * @property {'DEPARTMENT' | 'DESIGNATION' | 'EMPLOYEE'} type
 * @property {OrganizationNode[]} children
 */

/**
 * @typedef {Object} HierarchyNode
 * @property {string} id
 * @property {string} label
 * @property {string} subtitle
 * @property {HierarchyNode[]} children
 */

/**
 * @typedef {Object} BusinessUnit
 * @property {string} id
 * @property {string} name
 * @property {string} code
 */

/**
 * @typedef {Object} EmploymentCategory
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} EmploymentType
 * @property {'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN'} id
 * @property {string} name
 */

export const TypesPlaceholder = {};
