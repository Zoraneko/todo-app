import { useState } from "react"
import type { FilterState } from "../../types";
import TaskFilter from "./TaskFilter";
//s
export default function TodoDashboard() {

    const [filter, setFilter] = useState<FilterState>({
        searchQuery: "",
        status: 'All',
        priority: 'All',
        sortBy: 'deadline',
    });

    const handleFilterChange = (updates: Partial<FilterState>) => {
        setFilter(prev => ({ ...prev, ...updates }));
        console.log(updates);
    };

    return (
        <div >

            <TaskFilter filter={filter} onChange={handleFilterChange} />
        </div>

    )

}