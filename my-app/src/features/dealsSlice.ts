// features/deals/dealsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Restaurant = {
  id: string;
  name: string;
  image: string;
  category: "vegan" | "sushi" | "fast food";
  deal: string;
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
      deal: "10% off",
    },
    {
      id: "2",
      name: "Healthy Bites",
      image: "/images/deals1.png",
      category: "vegan",
      deal: "15% off",
    },
    {
      id: "3",
      name: "Plant Power",
      image: "/images/deals1.png",
      category: "vegan",
      deal: "20% off",
    },
    {
      id: "4",
      name: "Vegan Delight",
      image: "/images/deals1.png",
      category: "vegan",
      deal: "20% off",
    },
    {
      id: "5",
      name: "Leafy Greens",
      image: "/images/deals1.png",
      category: "vegan",
      deal: "20% off",
    },

    // SUSHI
    {
      id: "6",
      name: "Tokyo Sushi",
      image: "/images/deals2.png",
      category: "sushi",
      deal: "10% off",
    },
    {
      id: "7",
      name: "Samurai Rolls",
      image: "/images/deals2.png",
      category: "sushi",
      deal: "15% off",
    },
    {
      id: "8",
      name: "Sushi Zen",
      image: "/images/deals2.png",
      category: "sushi",
      deal: "20% off",
    },
    {
      id: "9",
      name: "Wasabi House",
      image: "/images/deals1.png",
      category: "sushi",
      deal: "10% off",
    },
    {
      id: "10",
      name: "Sakura Sushi",
      image: "/images/deals1.png",
      category: "sushi",
      deal: "20% off",
    },

    // FAST FOOD
    {
      id: "11",
      name: "Burger King",
      image: "/images/deals3.png",
      category: "fast food",
      deal: "10% off",
    },
    {
      id: "12",
      name: "McBurger",
      image: "/images/deals3.png",
      category: "fast food",
      deal: "15% off",
    },
    {
      id: "13",
      name: "Fried Express",
      image: "/images/deals3.png",
      category: "fast food",
      deal: "20% off",
    },
    {
      id: "14",
      name: "Pizza Go",
      image: "/images/deals3.png",
      category: "fast food",
      deal: "10% off",
    },
    {
      id: "15",
      name: "Hotdoggy",
      image: "/images/deals1.png",
      category: "fast food",
      deal: "20% off",
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
