import { create } from "zustand";
import axios from "axios";
import { ALERT_URL } from "@/services/api";

export interface AlertCard {
  id: string;
  lp: string;
  status: string;
  margin_level: number;
  created_at: string;
  updated_at: string;
  ignore_until: string | null;
}

export interface AlertCardsResponse {
  cards: AlertCard[];
}

interface AlertCardsState {
  cards: AlertCard[];
  isLoading: boolean;
  error: string | null;
  lastFetched: Date | null;

  // Actions
  fetchCards: () => Promise<void>;
  setCards: (cards: AlertCard[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  updateCard: (id: string, updates: Partial<AlertCard>) => void;
  removeCard: (id: string) => void;
}

export const useAlertCardsStore = create<AlertCardsState>((set, get) => ({
  cards: [],
  isLoading: false,
  error: null,
  lastFetched: null,

  fetchCards: async () => {
    console.log("AlertCardsStore: Starting fetchCards");
    set({ isLoading: true, error: null });

    try {
      console.log(
        "AlertCardsStore: Making API request to:",
        `${ALERT_URL}/alert/cards`
      );
      const response = await axios.get<AlertCardsResponse>(
        `${ALERT_URL}/alert/cards`
      );
      console.log("AlertCardsStore: API response:", response.data);

      set({
        cards: response.data.cards,
        isLoading: false,
        error: null,
        lastFetched: new Date(),
      });
      console.log(
        "AlertCardsStore: Cards updated, count:",
        response.data.cards.length
      );
    } catch (error) {
      console.error("AlertCardsStore: Failed to fetch alert cards:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch alert cards";

      set({
        isLoading: false,
        error: errorMessage,
      });
    }
  },

  setCards: (cards) => set({ cards }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  updateCard: (id, updates) => {
    const { cards } = get();
    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, ...updates } : card
    );
    set({ cards: updatedCards });
  },

  removeCard: (id) => {
    const { cards } = get();
    const filteredCards = cards.filter((card) => card.id !== id);
    set({ cards: filteredCards });
  },
}));
