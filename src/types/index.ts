export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface Task {
  id: string;             // Mã định danh duy nhất (UUID hoặc Timestamp string)
  title: string;          // Tiêu đề công việc
  description: string;    // Mô tả chi tiết
  deadline: string;       // Ngày giờ hết hạn (định dạng ISO 8601)
  status: TaskStatus;     // Trạng thái hiện tại
  priority: TaskPriority; // Mức độ ưu tiên
  createdAt: string;      // Ngày tạo (định dạng ISO 8601)
}

// Định nghĩa Type cho Modal/Popup
export type PopupMode = 'create' | 'edit';

export interface PopupState {
  isOpen: boolean;
  mode: PopupMode;
  selectedTask: Task | null;
}

// Định nghĩa Type cho Trạng thái Lọc và Sắp xếp
export interface FilterState {
  searchQuery: string;
  status: TaskStatus | 'All';
  priority: TaskPriority | 'All';
  sortBy: 'deadline' | 'createdAt';
}
