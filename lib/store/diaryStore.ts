import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createDiary, updateDiary } from '@/lib/api/clientApi'
import { DiaryEntry } from '@/types/diary'

const toLocalDate = () => new Date().toISOString().slice(0, 10)

const initialDraft = {
  title: '',
  description: '',
  date: toLocalDate(),
  emotions: [] as string[],
}

type DiaryStore = {
  draft: typeof initialDraft
  editingId: string | null
  isSaving: boolean
  error: string | null

  setDraft: (data: Partial<typeof initialDraft>) => void
  setEmotions: (ids: string[]) => void
  setEditingEntry: (entry: DiaryEntry) => void
  clearDraft: () => void
  submitDraft: (onSuccess?: (entry: DiaryEntry) => void) => Promise<void>
}

export const useDiaryStore = create<DiaryStore>()(
  persist(
    (set, get) => ({
      draft: initialDraft,
      editingId: null,
      isSaving: false,
      error: null,

      setDraft: (data) =>
        set((state) => ({
          draft: { ...state.draft, ...data },
        })),

      setEmotions: (ids) =>
        set((state) => ({
          draft: { ...state.draft, emotions: ids.slice(0, 12) },
        })),

      setEditingEntry: (entry) =>
        set({
          editingId: entry._id,
          draft: {
            title: entry.title,
            description: entry.description,
            date: entry.date,
            emotions: entry.emotions.map((e) => e._id),
          },
        }),

      clearDraft: () =>
        set({
          draft: { ...initialDraft, date: toLocalDate() },
          editingId: null,
          error: null,
        }),

      submitDraft: async (onSuccess) => {
        const { draft, editingId } = get()
        if (!draft.title.trim() || !draft.description.trim()) return

        set({ isSaving: true, error: null })
        try {
          const entry = editingId
            ? await updateDiary(editingId, draft)
            : await createDiary(draft)

          set({ isSaving: false })
          get().clearDraft()
          onSuccess?.(entry)
        } catch (err) {
          set({
            isSaving: false,
            error: err instanceof Error ? err.message : 'Помилка збереження',
          })
        }
      },
    }),
    {
      name: 'diary-draft',
      partialize: (state) => ({ draft: state.draft, editingId: state.editingId }),
    }
  )
)