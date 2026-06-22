import { create } from "zustand";

export const useBooksStore = create((set) => ({
    
    isLoading : false,

    setLoading: (isLoading) => set({isLoading}),
    setBooks: (books, total, cacheKey) => set({ books,total,cacheKey }),
    setError: (error) => set({error}),
    cleanError: () => set({error : null})
}));