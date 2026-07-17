import type { FilterState, TaskStatus, TaskPriority } from "../../types"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface TaskFilterProps {
    filter: FilterState;
    onChange: (updates: Partial<FilterState>) => void;
}

export default function TaskFilter({ filter, onChange }: TaskFilterProps) {
    return (
        <div className="flex flex-col md:flex-row gap-4 w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200">
            <div className="flex flex-col gap-2 flex-1">
                <span className="text-sm font-semibold text-slate-700">Search:</span>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search tasks..."
                        className="pl-9 bg-white w-full"
                        value={filter.searchQuery}
                        onChange={(e) => onChange({ searchQuery: e.target.value })}
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <div className="flex flex-col gap-2 flex-1 sm:flex-none">
                    <span className="text-sm font-semibold text-slate-700">Status:</span>
                    <Select value={filter.status} onValueChange={(value) => onChange({ status: value as TaskStatus | 'All' })}>
                        <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Status</SelectItem>
                            <SelectItem value="To Do">To Do</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Done">Done</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-2 flex-1 sm:flex-none">
                    <span className="text-sm font-semibold text-slate-700">Priority:</span>
                    <Select value={filter.priority} onValueChange={(value) => onChange({ priority: value as TaskPriority | 'All' })}>
                        <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Priority</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Urgent">Urgent</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-2 flex-1 sm:flex-none">
                    <span className="text-sm font-semibold text-slate-700">Sort by:</span>
                    <Select value={filter.sortBy} onValueChange={(value) => onChange({ sortBy: value as 'deadline' | 'createdAt' })}>
                        <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="deadline">Deadline</SelectItem>
                            <SelectItem value="createdAt">Created Date</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}