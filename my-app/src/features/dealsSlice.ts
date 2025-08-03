// features/deals/dealsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Restaurant = {
  id: string;
  name: string;
  image: string;
  category: "vegan" | "sushi" | "fast food";
};

interface DealsState {
  category: "vegan" | "sushi" | "fast food" | "others";
  restaurants: Restaurant[];
}

const initialState: DealsState = {
  category: "vegan",
  restaurants: [
    // VEGAN
    {
      id: "1",
      name: "Green Vegan",
      image: "/images/deals1.png",
      category: "vegan",
    },
    {
      id: "2",
      name: "Healthy Bites",
      image: "/images/deals1.png",
      category: "vegan",
    },
    {
      id: "3",
      name: "Plant Power",
      image: "/images/deals1.png",
      category: "vegan",
    },
    {
      id: "4",
      name: "Vegan Delight",
      image: "/images/deals1.png",
      category: "vegan",
    },
    {
      id: "5",
      name: "Leafy Greens",
      image: "/images/deals1.png",
      category: "vegan",
    },

    // SUSHI
    {
      id: "6",
      name: "Tokyo Sushi",
      image: "/images/deals2.png",
      category: "sushi",
    },
    {
      id: "7",
      name: "Samurai Rolls",
      image: "/images/deals2.png",
      category: "sushi",
    },
    {
      id: "8",
      name: "Sushi Zen",
      image: "/images/deals2.png",
      category: "sushi",
    },
    {
      id: "9",
      name: "Wasabi House",
      image: "/images/deals1.png",
      category: "sushi",
    },
    {
      id: "10",
      name: "Sakura Sushi",
      image: "/images/deals1.png",
      category: "sushi",
    },

    // FAST FOOD
    {
      id: "11",
      name: "Burger King",
      image: "/images/deals3.png",
      category: "fast food",
    },
    {
      id: "12",
      name: "McBurger",
      image: "/images/deals3.png",
      category: "fast food",
    },
    {
      id: "13",
      name: "Fried Express",
      image: "/images/deals3.png",
      category: "fast food",
    },
    {
      id: "14",
      name: "Pizza Go",
      image: "/images/deals3.png",
      category: "fast food",
    },
    {
      id: "15",
      name: "Hotdoggy",
      image: "/images/deals1.png",
      category: "fast food",
    },
  ],
};

const dealsSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<DealsState["category"]>) {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = dealsSlice.actions;
export default dealsSlice.reducer;
