import { Badge } from "@/components/ui/badge";
import type { TaskPriority } from "../types";

const priorityVariants: Record<TaskPriority, { bg: string; color: string; label: string }> = {
  Low: { bg: '#f1f5f9', color: '#475569', label: 'Low' },
  Medium: { bg: '#eff6ff', color: '#2563eb', label: 'Medium' },
  High: { bg: '#fffbeb', color: '#d97706', label: 'High' },
  Urgent: { bg: '#fef2f2', color: '#dc2626', label: 'Urgent' }
};

export const getPriorityBadge = (variant: TaskPriority) => {
  const badge = priorityVariants[variant];
  return (
    <Badge
      style={{ backgroundColor: badge.bg, color: badge.color }}
      className="border-transparent hover:opacity-80 text-sm font-bold"
    >
      {badge.label}
    </Badge>
  )
}
