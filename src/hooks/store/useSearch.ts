import { create } from "zustand";


interface useSearch {
    searchData: string,
    setSearchData: (data: string) => void
}

export const useSearch = create<useSearch>((set) => ({
  searchData: '', // Initialize searchData with an empty string
  setSearchData: (data: string) => set(() => ({ searchData: data })),
}));