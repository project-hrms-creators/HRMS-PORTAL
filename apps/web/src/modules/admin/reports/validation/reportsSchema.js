import { z } from 'zod';

export const reportFilterSchema = z.object({
  field: z.string(),
  operator: z.enum(['equals', 'in', 'between', 'greater_than', 'less_than']),
  value: z.any()
});

export const savedReportSchema = z.object({
  report_id: z.string().uuid(),
  name: z.string().min(3, 'Name must be at least 3 characters').max(50),
  filters: z.array(reportFilterSchema).optional()
});

export const exportConfigurationSchema = z.object({
  format: z.enum(['CSV', 'PDF', 'EXCEL']),
  includeHeaders: z.boolean().default(true),
  report_id: z.string().uuid(),
  filters: z.array(reportFilterSchema).optional()
});
