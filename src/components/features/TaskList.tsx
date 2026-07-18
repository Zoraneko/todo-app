import type { FilterState, Task, TaskStatus } from "@/types";
import TaskItem from "./TaskItem";
import { cn } from "@/lib/utils";
import { getStatusBadge } from "@/utils/getStatusBadge";
interface TaskListProps {
    tasks: Task[];
    filter: FilterState;
    onOpenEdit: (task: Task) => void;
}

export default function TaskList({ tasks, filter, onOpenEdit }: TaskListProps) {
    if (!tasks || tasks.length === 0) return (<span className="flex flex-row text-lg font-bold justify-center">
        There is currently no tasks. Try adding one by pressing "Add Task" button.
    </span>)

    let filteredTasks = [...tasks];
    if (filter?.searchQuery) {
        const query = filter.searchQuery.toLowerCase();
        filteredTasks = filteredTasks.filter(task =>
            task.title.toLowerCase().includes(query) ||
            task.description.toLowerCase().includes(query)
        );
    }
    if (filter?.priority && filter.priority !== 'All') {
        filteredTasks = filteredTasks.filter(task => task.priority === filter.priority);
    }

    filteredTasks.sort((a, b) => {
        if (filter?.sortBy === 'createdAt') {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        if (filter?.sortBy === 'deadline') {
            return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        }
        return 0;
    });

    const statuses: TaskStatus[] = filter?.status == "All" ? ["To Do", "In Progress", "Done"] : [filter.status as TaskStatus];

    return (
        <div className={cn("grid grid-cols-1 gap-4",
            {
                "grid-cols-1 md:grid-cols-2 lg:grid-cols-3": filter?.status == "All",
                "grid-cols-1 ": filter?.status != "All",
            })}>
            {statuses.map((status) => (
                <div key={status} className="flex flex-col gap-4">
                    <h3 className="w-full">
                        {getStatusBadge(status, "w-full justify-center text-xl p-2 gap-2", 20)}
                    </h3>
                    <div className={cn("grid gap-4", {
                        "grid-cols-1": filter?.status == "All",
                        "grid-cols-1 md:grid-cols-2 lg:grid-cols-3": filter?.status != "All",
                    })}>
                        {filteredTasks.filter((task) => task.status === status).map((task) => (
                            <TaskItem key={task.id} task={task} onOpenEdit={onOpenEdit} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}