import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:5000",
});
export const getAsyncCharacters = createAsyncThunk(
  "characters/getAsyncCharacters",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character`
      );

      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addAsyncTodo = createAsyncThunk(
  "characters/addAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(`/characters`, {
        title: payload.title,
        id: Date.now(),
        completed: false,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteAsyncTodo = createAsyncThunk(
  "characters/deleteAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      await api.delete(`/characters/${payload.id}`);
      return { id: payload.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const toggleAsyncTod1 = createAsyncThunk(
  "characters/toggleAsyncTod1",
  async (payload, { rejectWithValue }) => {
    try {
      await api.patch(`/characters/${payload.id}`, {
        completed: !payload.completed,
      });
      return { id: payload.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSelectedCharacter = createAsyncThunk(
  "characters/getSelectedCharacter",
  async (payload, { rejectWithValue }) => {
    try {
      const { data: character } = await axios.get(
        `https://rickandmortyapi.com/api/character/${payload.id}`
      );
      const episodesId = character.episode.map((e) => e.split("/").at(-1));
      const { data: episodes } = await axios.get(
        `https://rickandmortyapi.com/api/episode/${episodesId}`
      );

      return { character, episodes };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const searchCharacters = createAsyncThunk(
  "characters/searchCharacters",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character?name=${payload.query}`
      );

      return { characters: data.results, query: payload.query };
    } catch (error) {
      toast.error("character not found ");
      return rejectWithValue(error.message);
    }
  }
);
const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    selectedCharacter: {
      id: 0,
      name: "Morty Smith",
      status: "Alive",
      species: "Human",
      type: "",
      location: {
        name: "xyr",
      },
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    },
    episodes: "",
    query: "",
    favourites: JSON.parse(localStorage.getItem("favourites")) || [],
    loading: false,
    characterLoading: false,
    characters: [],
    error: "",
  },
  reducers: {
    addToFavourites: (state, action) => {
      state.favourites = [...state.favourites, action.payload.character];
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
    },

    deleteFavourite: (state, action) => {
      state.favourites = state.favourites.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAsyncCharacters.pending, (state, action) => {
      state.loading = true;
      state.characters = [];
      state.error = "";
    }),
      builder.addCase(getAsyncCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload;
        state.error = "";
      });
    builder.addCase(getAsyncCharacters.rejected, (state, action) => {
      state.loading = false;
      state.characters = [];
      state.error = action.payload;
    });
    builder.addCase(addAsyncTodo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addAsyncTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.characters.push(action.payload);
      state.error = "";
    });
    builder.addCase(deleteAsyncTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.characters = state.characters.filter(
        (item) => item.id != action.payload.id
      );
      state.error = "";
    });
    builder.addCase(getSelectedCharacter.pending, (state, action) => {
      state.characterLoading = true;
      state.error = "";
    });
    builder.addCase(getSelectedCharacter.fulfilled, (state, action) => {
      state.characterLoading = false;
      state.selectedCharacter = action.payload.character;
      state.episodes = action.payload.episodes;
      state.error = "";
    });
    builder.addCase(getSelectedCharacter.rejected, (state, action) => {
      state.characterLoading = false;

      state.error = action.payload;
    });
    builder.addCase(searchCharacters.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(searchCharacters.fulfilled, (state, action) => {
      state.loading = false;
      state.characters = action.payload.characters;
      state.error = "";
    });
    builder.addCase(searchCharacters.rejected, (state, action) => {
      state.loading = false;
      state.characters = [];
      state.error = action.error;
    });
  },
});
export const { addToFavourites, addQuery, deleteFavourite } =
  charactersSlice.actions;

export default charactersSlice.reducer;
