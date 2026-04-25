import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewTask } from '../api/clientApi';

interface TaskDraftStore {
  draft: NewTask;
  setDraft: (task: NewTask) => void;
  clearDraft: () => void;
}

const initialDraft: NewTask = {
  name: '',
  date: new Date().toISOString().split('T')[0],
  isDone: false,
};

export const useAddTaskDraftStore = create<TaskDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (task) => set(() => ({ draft: task })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'task-draft',
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
