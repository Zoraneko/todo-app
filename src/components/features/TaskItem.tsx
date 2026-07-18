import type { Task } from "@/types";
import { getPriorityBadge } from "@/utils/getPriorityBadge";
import { format } from "date-fns";
import { Clock } from "lucide-react";
interface TaskItemProps {
    task: Task;
    onOpenEdit: (task: Task) => void;
}

export default function TodoItem({ task, onOpenEdit }: TaskItemProps) {
    return (
        <div
            onClick={() => onOpenEdit(task)}
            className="flex flex-col bg-white border border-slate-200 p-4 gap-4 rounded-xl shadow-sm transition-all hover:shadow-md hover:bg-slate-50 cursor-pointer"
        >
            <div className="flex flex-row items-center gap-2">
                {getPriorityBadge(task.priority)}
                <h2 className="text-lg font-bold">
                    {task.title}
                </h2>
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