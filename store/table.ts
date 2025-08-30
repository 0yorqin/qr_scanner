"use client";

import { create } from "zustand";

type TableState = {
  tableId: string | null;
  setTableId: (id: string | null) => void;
};

export const useTableStore = create<TableState>((set) => ({
  tableId: null,
  setTableId: (id) => set({ tableId: id }),
}));
