import type { Task } from "@/types";
import { getPriorityBadge } from "@/utils/getPriorityBadge";
import { format } from "date-fns";
import { Clock, AlertCircle } from "lucide-react";
interface TaskItemProps {
    task: Task;
    onOpenEdit: (task: Task) => void;
}

export default function TodoItem({ task, onOpenEdit }: TaskItemProps) {
    const isOverdue = task.status !== 'Done' && new Date(task.deadline).getTime() < new Date().getTime();

    return (
        <div
            onClick={() => onOpenEdit(task)}
            className={`flex flex-col border p-4 gap-4 rounded-xl shadow-sm transition-all hover:shadow-md cursor-pointer ${isOverdue ? 'bg-red-50/50 border-red-200 hover:bg-red-50' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
        >
            <div className="flex flex-row items-start justify-between gap-2">
                <div className="flex flex-row items-center gap-2">
                    {getPriorityBadge(task.priority)}
                    <h2 className="text-lg font-bold">
                        {task.title}
                    </h2>
                </div>
                {isOverdue && (
                    <div className="flex items-center gap-1 text-red-600 bg-red-100 px-2 py-1 rounded-md text-sm font-bold shrink-0">
                        <AlertCircle size={16} />
                        Overdue
                    </div>
                )}
            </div>
            <div className="flex flex-row items-center gap-2">
                <Clock size={20} />
                <h3 className="font-light">
                    {format(new Date(task.deadline), "HH:mm (O), dd LLLL y")}
                </h3>
            </div>
        </div>
    )
}