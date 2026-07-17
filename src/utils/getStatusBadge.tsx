import type { TaskStatus } from "../types";

export const statusVariants: Record<TaskStatus, { bg: string; color: string; label: string }> = {
  "To Do": { bg: '#f1f5f9', color: '#475569', label: 'To Do' },
  "In Progress": { bg: '#eff6ff', color: '#2563eb', label: 'In Progress' },
  "Done": { bg: '#dcfce7', color: '#166534', label: 'Done' }
};
export const getStatusBadge = (variant) => {
  return statusVariants[variant];
}