import type { Task } from "@/types";
import { getPriorityBadge } from "@/utils/getPriorityBadge";
import { format } from "date-fns";
interface TaskItemProps {
    task: Task;
}
export default function TodoItem({ task }: TaskItemProps) {


    return (
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm transition-all hover:shadow-md hover:bg-slate-50 cursor-pointer">
            <div>
                {getPriorityBadge(task.priority)}
                {task.title}
            </div>
            <h3 className="font-light">
                {format(new Date(task.deadline), "HH:mm (O), dd LLLL Y")}

            </h3>
        </div>
    )
}