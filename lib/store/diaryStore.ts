import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createDiary } from '@/lib/api/clientApi'
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
  isSaving: boolean
  error: string | null

  setDraft: (data: Partial<typeof initialDraft>) => void
  toggleEmotion: (id: string) => void
  clearDraft: () => void
  submitDraft: (onSuccess?: (entry: DiaryEntry) => void) => Promise<void>
}

export const useDiaryStore = create<DiaryStore>()(
  persist(
    (set, get) => ({
      draft: initialDraft,
      isSaving: false,
      error: null,

      setDraft: (data) =>
        set((state) => ({
          draft: { ...state.draft, ...data },
        })),

      toggleEmotion: (id) =>
        set((state) => {
          const { emotions } = state.draft
          const already = emotions.includes(id)
          if (!already && emotions.length >= 12) return state
          return {
            draft: {
              ...state.draft,
              emotions: already
                ? emotions.filter((e) => e !== id)
                : [...emotions, id],
            },
          }
        }),

      clearDraft: () =>
        set({ draft: { ...initialDraft, date: toLocalDate() }, error: null }),

      submitDraft: async (onSuccess) => {
        const { draft } = get()
        console.log('draft before submit:', draft)
        console.log('emotions length:', draft.emotions.length)
        if (!draft.title.trim() || !draft.description.trim()) return

        set({ isSaving: true, error: null })
        try {
          console.log('sending payload:', JSON.stringify(draft)) 
          const entry = await createDiary(draft)
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
      partialize: (state) => ({ draft: state.draft }),
    }
  )
)