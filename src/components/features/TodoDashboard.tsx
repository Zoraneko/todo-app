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
import TaskPopup from "./TaskPopup";
import type { PopupState } from "../../types";
import { PlusCircle } from "lucide-react";

const STORAGE_KEY = "todo_tasks";

export default function TodoDashboard() {
    const [popupState, setPopupState] = useState<PopupState>({
        isOpen: false,
        mode: 'create',
        selectedTask: null
    });
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

    const handleOpenCreate = () => {
        setPopupState({ isOpen: true, mode: 'create', selectedTask: null });
    };

    const handleOpenEdit = (task: Task) => {
        setPopupState({ isOpen: true, mode: 'edit', selectedTask: task });
    };

    const handleClosePopup = () => {
        setPopupState(prev => ({ ...prev, isOpen: false }));
    };

    const handleSaveTask = (taskData: Partial<Task>) => {
        if (popupState.mode === 'create' || !taskData.id) {
            const newTask: Task = {
                id: uuidv4(),
                title: taskData.title || '',
                description: taskData.description || '',
                deadline: taskData.deadline || '',
                status: taskData.status || 'To Do',
                priority: taskData.priority || 'Medium',
                createdAt: taskData.createdAt || new Date().toISOString(),
            };
            setTasks(prev => [...prev, newTask]);
            toast.success("Task created successfully!");
        } else {
            setTasks(prev => prev.map(t => t.id === taskData.id ? { ...t, ...taskData } as Task : t));
            toast.success("Task updated successfully!");
        }
        handleClosePopup();
    };

    const handleDeleteTask = (taskId: string) => {
        setTasks(prev => prev.filter(t => t.id !== taskId));
        toast.success("Task deleted successfully!");
        handleClosePopup();
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <Button onClick={handleOpenCreate} className="w-full md:w-auto">
                    <PlusCircle />
                    Add New Task
                </Button>
                <TaskFilter filter={filter} onChange={handleFilterChange} />
            </div>


            <TaskList tasks={tasks} filter={filter} onOpenEdit={handleOpenEdit} />
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
            <TaskPopup
                isOpen={popupState.isOpen}
                mode={popupState.mode}
                task={popupState.selectedTask}
                onClose={handleClosePopup}
                onSave={handleSaveTask}
                onDelete={handleDeleteTask}
            />
        </div>
    )
}