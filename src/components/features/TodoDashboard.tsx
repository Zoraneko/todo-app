import { useState, useEffect } from "react"
import type { FilterState, Task } from "../../types";
import TaskFilter from "./TaskFilter";
import { mockTasks } from "../../utils/mockData";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "../ui/dialog";
import TaskList from "./TaskList";

const STORAGE_KEY = "todo_tasks";

export default function TodoDashboard() {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.log("error parse:", e);
                return [];
            }
        }
        return [];
    });

    const [filter, setFilter] = useState<FilterState>({
        searchQuery: "",
        status: 'All',
        priority: 'All',
        sortBy: 'deadline',
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const handleFilterChange = (updates: Partial<FilterState>) => {
        setFilter(prev => ({ ...prev, ...updates }));
    };

    const handleAddMockData = () => {
        const newMockTasks = mockTasks.map(task => ({
            ...task,
            id: uuidv4()
        }));
        setTasks(prev => [...prev, ...newMockTasks]);
        toast.success(`Mock tasks added`);
    };

    const handleClearAll = () => {
        setTasks([]);
        toast.success("All tasks deleted");
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <span className="w-full "></span>
                <Button onClick={handleAddMockData} variant="secondary" className="w-full sm:w-auto">
                    Add mock tasks
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive" className="w-full sm:w-auto">
                            Delete all mock tasks
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm Action</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete all mock tasks?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button variant="destructive" onClick={handleClearAll}>Yes, coninue</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <TaskFilter filter={filter} onChange={handleFilterChange} />

            <TaskList tasks={tasks} filter={filter} />
        </div>
    )
}