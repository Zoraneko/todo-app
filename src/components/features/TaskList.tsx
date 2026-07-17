import type { Task, TaskStatus } from "@/types";
import TaskItem from "./TaskItem";
interface TaskListProps {
    tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
    if (!tasks || tasks.length === 0) return (<span className="flex flex-row text-lg font-bold justify-center">
        There is currently no tasks. Try adding one by pressing "Add Task" button.
    </span>)

    const statuses: TaskStatus[] = ["To Do", "In Progress", "Done"];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statuses.map((status) => (
                <div key={status} className="flex flex-col gap-4">
                    <h3 className="font-bold text-lg text-center">{status}</h3>
                    {tasks.filter((task) => task.status === status).map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>
            ))}
        </div>
    )
}