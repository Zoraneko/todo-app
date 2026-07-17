import { LayoutListIcon, NotebookPenIcon, SquareCheckIcon, type LucideIcon } from "lucide-react";
import type { TaskStatus } from "../types";

export const statusVariants: Record<TaskStatus, { bg: string; color: string; label: string; icon: LucideIcon }> = {
  "To Do": { bg: '#f1f5f9', color: '#475569', label: 'To Do', icon: LayoutListIcon },
  "In Progress": { bg: '#eff6ff', color: '#2563eb', label: 'In Progress', icon: NotebookPenIcon },
  "Done": { bg: '#dcfce7', color: '#166534', label: 'Done', icon: SquareCheckIcon }
};
export const getStatusBadge = (variant: TaskStatus) => {
  const status = statusVariants[variant];
  const Icon = status.icon;

  return (
    <div
      className="flex flex-row gap-2 p-4 items-center rounded-full text-xl font-bold"
      style={{ backgroundColor: status.bg, color: status.color }}
    >
      <Icon size={24} />
      {status.label}
    </div>
  );
}