import type { Task } from '../types';

export const mockTasks: Task[] = [
  {
    id: 'task-1784560000001',
    title: 'Thiết kế giao diện Dashboard',
    description: 'Lên wireframe và thiết kế UI/UX cho trang chủ quản lý công việc.',
    deadline: '2026-07-20T10:00:00+07:00',
    status: 'In Progress',
    priority: 'High',
    createdAt: '2026-07-15T08:30:00+07:00'
  },
  {
    id: 'task-1784560000002',
    title: 'Nghiên cứu lưu trữ LocalStorage',
    description: 'Tìm hiểu cách lưu trữ, đồng bộ dữ liệu và khôi phục state từ LocalStorage khi reload trang.',
    deadline: '2026-07-16T17:00:00+07:00',
    status: 'To Do',
    priority: 'Urgent',
    createdAt: '2026-07-16T09:00:00+07:00'
  },
  {
    id: 'task-1784560000003',
    title: 'Viết báo cáo tuần',
    description: 'Tổng hợp tiến độ các công việc trong tuần và gửi báo cáo cho quản lý.',
    deadline: '2026-07-18T15:00:00+07:00',
    status: 'To Do',
    priority: 'Medium',
    createdAt: '2026-07-17T08:00:00+07:00'
  },
  {
    id: 'task-1784560000004',
    title: 'Fix lỗi hiển thị Popup chi tiết',
    description: 'Sửa lỗi Popup (Task Modal) không tự động đóng lại khi click ra vùng ngoài.',
    deadline: '2026-07-15T12:00:00+07:00',
    status: 'Done',
    priority: 'High',
    createdAt: '2026-07-14T10:00:00+07:00'
  },
  {
    id: 'task-1784560000005',
    title: 'Cập nhật tài liệu API',
    description: 'Bổ sung specs cho endpoint lọc và tìm kiếm theo real-time.',
    deadline: '2026-07-25T17:00:00+07:00',
    status: 'To Do',
    priority: 'Low',
    createdAt: '2026-07-17T14:30:00+07:00'
  }
];
