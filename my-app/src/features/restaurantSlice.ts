import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Restaurant {
  id: string;
  name: string;
  logo: string;
  address: string;
}

interface RestaurantsState {
  restaurants: Restaurant[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async () => {
    const response = await fetch(
      "https://fakerestaurantapi.runasp.net/api/Restaurant"
    );
    const data = await response.json();
    return data;
  }
);

const initialState: RestaurantsState = {
  restaurants: [],
  status: "idle",
  error: null,
};

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchRestaurants.fulfilled,
        (state, action: PayloadAction<Restaurant[]>) => {
          state.status = "succeeded";
          state.restaurants = action.payload;
        }
      )
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch restaurants";
      });
  },
});

export default restaurantsSlice.reducer;
