import type { Task } from '../types';

export const mockTasks: Task[] = [
  {
    id: 'task-1784560000001',
    title: 'Design Dashboard UI',
    description: 'Create wireframes and design UI/UX for the task management homepage.',
    deadline: '2026-07-20T10:00:00+07:00',
    status: 'In Progress',
    priority: 'High',
    createdAt: '2026-07-15T08:30:00+07:00'
  },
  {
    id: 'task-1784560000002',
    title: 'Research LocalStorage Sync',
    description: 'Learn how to store, sync data, and restore state from LocalStorage on page reload.',
    deadline: '2026-07-16T17:00:00+07:00',
    status: 'To Do',
    priority: 'Urgent',
    createdAt: '2026-07-16T09:00:00+07:00'
  },
  {
    id: 'task-1784560000003',
    title: 'Write Weekly Report',
    description: 'Summarize the progress of tasks during the week and send a report to the manager.',
    deadline: '2026-07-18T15:00:00+07:00',
    status: 'To Do',
    priority: 'Medium',
    createdAt: '2026-07-17T08:00:00+07:00'
  },
  {
    id: 'task-1784560000004',
    title: 'Fix Task Modal Display Issue',
    description: 'Fix the bug where the Task Modal does not automatically close when clicking outside.',
    deadline: '2026-07-15T12:00:00+07:00',
    status: 'Done',
    priority: 'High',
    createdAt: '2026-07-14T10:00:00+07:00'
  },
  {
    id: 'task-1784560000005',
    title: 'Update API Documentation',
    description: 'Add specifications for the real-time search and filter endpoints.',
    deadline: '2026-07-25T17:00:00+07:00',
    status: 'To Do',
    priority: 'Low',
    createdAt: '2026-07-17T14:30:00+07:00'
  }
];
