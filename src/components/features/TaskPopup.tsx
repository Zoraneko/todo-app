import { useState } from "react";
import type { Task, PopupMode, TaskPriority, TaskStatus } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getStatusBadge } from "@/utils/getStatusBadge";
import { getPriorityBadge } from "@/utils/getPriorityBadge";
import { File, Trash2, X, AlertCircle } from "lucide-react";

interface TaskPopupProps {
    isOpen: boolean;
    mode: PopupMode;
    task: Task | null;
    onClose: () => void;
    onSave: (taskData: Partial<Task>) => void;
    onDelete: (taskId: string) => void;
}

export default function TaskPopup({ isOpen, mode, task, onClose, onSave, onDelete }: TaskPopupProps) {
    const [tempTask, setTempTask] = useState<Partial<Task>>({
        id: task?.id,
        title: task?.title || '',
        description: task?.description || '',
        deadline: task?.deadline || '',
        status: task?.status || 'To Do',
        priority: task?.priority || 'Low',
        createdAt: task?.createdAt,
    });
    const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
    const [prevTask, setPrevTask] = useState(task);

    if (isOpen !== prevIsOpen || task !== prevTask) {
        setPrevIsOpen(isOpen);
        setPrevTask(task);
        if (isOpen) {
            setTempTask({
                id: task?.id,
                title: task?.title || '',
                description: task?.description || '',
                deadline: task?.deadline || '',
                status: task?.status || 'To Do',
                priority: task?.priority || 'Low',
                createdAt: task?.createdAt,
            });
        }
    }
    const handleSave = () => {
        onSave(tempTask);
    };

    const handleDelete = () => {
        if (task?.id) {
            onDelete(task.id);
        }
    };

    const handlePopupDataChange = (newData: Partial<Task>) => {
        setTempTask(prev => ({ ...prev, ...newData }));
    }

    const isOverdue = tempTask?.status !== 'Done' && tempTask?.deadline && new Date(tempTask.deadline).getTime() < new Date().getTime();

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-bold text-xl">{mode === 'create' ? 'Create Task' : 'Edit Task'}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    {isOverdue && (
                        <div className="flex flex-row items-center gap-2 p-3 bg-red-100 text-red-700 rounded-lg font-bold border border-red-300">
                            <AlertCircle size={20} />
                            <span>This task is overdue!</span>
                        </div>
                    )}
                    <div >
                        <Label>Title</Label>
                        <Input
                            value={tempTask?.title || ''}
                            onChange={(e) => handlePopupDataChange({ title: e.target.value })}
                            placeholder={task?.title || "Task title"}
                        />
                    </div>

                    <div>
                        <Label>Description</Label>
                        <Textarea
                            value={tempTask?.description || ''}
                            onChange={(e) => handlePopupDataChange({ description: e.target.value })}
                            placeholder={task?.description || "Task description"}
                        />
                    </div>

                    <div>
                        <Label>
                            Deadline
                            <span className="text-xs text-slate-500 font-normal ml-2">
                                ({Intl.DateTimeFormat().resolvedOptions().timeZone}, UTC{new Date().getTimezoneOffset() <= 0 ? '+' : '-'}{String(Math.floor(Math.abs(new Date().getTimezoneOffset()) / 60)).padStart(2, '0')}:{String(Math.abs(new Date().getTimezoneOffset()) % 60).padStart(2, '0')})
                            </span>
                        </Label>
                        <Input
                            type="datetime-local"
                            className="mt-2"
                            value={tempTask?.deadline ? new Date(new Date(tempTask.deadline).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ''}
                            onChange={(e) => {
                                const date = new Date(e.target.value);
                                if (!isNaN(date.getTime())) {
                                    handlePopupDataChange({ deadline: date.toISOString() });
                                }
                            }}
                        />
                    </div>

                    <div>
                        <Label>Priority</Label>
                        <Select
                            value={tempTask?.priority || 'Medium'}
                            onValueChange={(value) => handlePopupDataChange({ priority: value as TaskPriority })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Low">{getPriorityBadge("Low")}</SelectItem>
                                <SelectItem value="Medium">{getPriorityBadge("Medium")}</SelectItem>
                                <SelectItem value="High">{getPriorityBadge("High")}</SelectItem>
                                <SelectItem value="Urgent">{getPriorityBadge("Urgent")}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Status</Label>
                        <Select
                            value={tempTask?.status || 'To Do'}
                            onValueChange={(value) => handlePopupDataChange({ status: value as TaskStatus })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="To Do">{getStatusBadge("To Do")}</SelectItem>
                                <SelectItem value="In Progress">{getStatusBadge("In Progress")}</SelectItem>
                                <SelectItem value="Done">{getStatusBadge("Done")}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter className="gap-2">
                    {mode === 'edit' && (
                        <Button variant="outline" style={{ color: "red" }} onClick={handleDelete}><Trash2 />Delete</Button>
                    )}
                    <Button variant="outline" onClick={onClose}><X />Cancel</Button>
                    <Button onClick={handleSave}><File />Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}