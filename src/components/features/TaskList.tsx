import type { FilterState, Task, TaskStatus } from "@/types";
import TaskItem from "./TaskItem";
import { cn } from "@/lib/utils";
import { getStatusBadge } from "@/utils/getStatusBadge";
interface TaskListProps {
    tasks: Task[];
    filter: FilterState;
}

export default function TaskList({ tasks, filter }: TaskListProps) {
    if (!tasks || tasks.length === 0) return (<span className="flex flex-row text-lg font-bold justify-center">
        There is currently no tasks. Try adding one by pressing "Add Task" button.
    </span>)

    const statuses: TaskStatus[] = filter?.status == "All" ? ["To Do", "In Progress", "Done"] : [filter.status];

    return (
        <div className={cn("grid grid-cols-1 gap-4",
            {
                "grid-cols-1 md:grid-cols-2 lg:grid-cols-3": filter?.status == "All",
                "grid-cols-1 ": filter?.status != "All",
            })}>
            {statuses.map((status) => (
                <div key={status} className="flex flex-col gap-4">
                    {getStatusBadge(status)}
                    <div className={cn("grid gap-4", {
                        "grid-cols-1": filter?.status == "All",
                        "grid-cols-1 md:grid-cols-2 lg:grid-cols-3": filter?.status != "All",
                    })}>
                        {tasks.filter((task) => task.status === status).map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}