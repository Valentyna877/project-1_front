import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewTask } from '../api/clientApi';

interface TaskStore {
  tasks: NewTask[];
  addTask: (task: NewTask) => void;
  removeTask: (id: string) => void;
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

      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task._id !== id),
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
