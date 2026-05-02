import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const toLocalDate = () => new Date().toISOString().slice(0, 10) 

const initialDraft = {
  title: '',
  description: '',
  date: toLocalDate(),
  emotions: [] as string[],
}

type DiaryStore = {
  draft: typeof initialDraft
  setDraft: (data: Partial<typeof initialDraft>) => void
  toggleEmotion: (id: string) => void
  clearDraft: () => void
}

export const useDiaryStore = create<DiaryStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

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
        set({ draft: { ...initialDraft, date: toLocalDate() } }),
    }),
    {
      name: 'diary-draft',
    }
  )
)