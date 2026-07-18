import { LayoutListIcon, NotebookPenIcon, SquareCheckIcon, type LucideIcon } from "lucide-react";
import type { TaskStatus } from "../types";
import { cn } from "@/lib/utils";

export const statusVariants: Record<TaskStatus, { bg: string; color: string; label: string; icon: LucideIcon }> = {
  "To Do": { bg: '#f1f5f9', color: '#475569', label: 'To Do', icon: LayoutListIcon },
  "In Progress": { bg: '#eff6ff', color: '#2563eb', label: 'In Progress', icon: NotebookPenIcon },
  "Done": { bg: '#dcfce7', color: '#166534', label: 'Done', icon: SquareCheckIcon }
};

export const getStatusBadge = (variant: TaskStatus, className?: string, iconSize: number = 16) => {
  const status = statusVariants[variant];
  const Icon = status.icon;

  return (
    <div
      className={cn("flex flex-row gap-1.5 px-2.5 py-0.5 w-fit items-center rounded-full text-xs font-bold", className)}
      style={{ backgroundColor: status.bg, color: status.color }}
    >
      <Icon size={iconSize} />
      {status.label}
    </div>
  );
}