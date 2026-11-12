import { z } from 'zod';

export const departmentSchema = z.object({
  name: z.string().trim().min(2, 'Department name must be at least 2 characters.'),
  code: z.string().trim().min(2, 'Code must be 2-6 characters.').max(6, 'Code must be 2-6 characters.').toUpperCase(),
  description: z.string().trim().optional(),
  parentDepartmentId: z.string().optional().nullable(),
  managerId: z.string().optional().nullable(),
  status: z.enum(['ACTIVE', 'ARCHIVED']).default('ACTIVE'),
});

export const designationSchema = z.object({
  title: z.string().trim().min(2, 'Designation title must be at least 2 characters.'),
  level: z.preprocess(
    (val) => parseInt(val, 10),
    z.number().int().positive('Level must be a positive integer.')
  ),
  description: z.string().trim().optional(),
  departmentId: z.string().trim().min(1, 'Please select an associated department.'),
  status: z.enum(['ACTIVE', 'ARCHIVED']).default('ACTIVE'),
});

export const teamSchema = z.object({
  name: z.string().trim().min(2, 'Team name must be at least 2 characters.'),
  departmentId: z.string().trim().min(1, 'Please select an associated department.'),
  managerId: z.string().optional().nullable(),
});

export const locationSchema = z.object({
  name: z.string().trim().min(2, 'Location name must be at least 2 characters.'),
  type: z.enum(['OFFICE', 'REMOTE', 'HYBRID'], {
    errorMap: () => ({ message: 'Please select a location type.' }),
  }),
  region: z.string().trim().optional(),
  timezone: z.string().trim().min(1, 'Timezone is required.'),
  country: z.string().trim().min(1, 'Country is required.'),
  state: z.string().trim().optional(),
  city: z.string().trim().min(1, 'City is required.'),
});
