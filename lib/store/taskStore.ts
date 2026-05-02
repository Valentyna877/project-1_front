import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewTask } from '../api/clientApi';

// export interface NewTaskInStore {
//   name: string;
//   date: string;
//   isDone: boolean;
//   _id: string;
// }

interface TaskStore {
  tasks: NewTask[];
  addTask: (task: NewTask) => void;
  removeTask: (index: number) => void;
  toggleTask: (id: string) => void;
  clearTasks: () => void;
}

const initialTasks: NewTask[] = [];


export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: initialTasks,

      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),

      removeTask: (index) =>
        set((state) => ({
          tasks: state.tasks.filter((_, i) => i !== index),
        })),

      toggleTask: (id) =>
        set((state) => ({
        tasks: state.tasks.map(({...task}) =>
            id === task._id ? { ...task, isDone: !task.isDone } : task
          ),
        })),

      clearTasks: () => set({ tasks: [] }),
    }),
    {
      name: 'tasks-storage',
      partialize: (state) => ({
  tasks: state.tasks,
})
    }
  )
);
