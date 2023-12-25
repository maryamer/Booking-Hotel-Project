import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function useCharacter(url, query) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        let result = "";
        if (query.length < 3) {
          result = await axios.get(`https://rickandmortyapi.com/api/character`);
        } else {
          result = await axios.get(`${url}=${query}`);
        }
        setCharacters(result.data.results.slice(0, 8));
      } catch (error) {
        // toast.error(error.response.data.error);
        setCharacters([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [query]);
  return { isLoading, characters, setCharacters, setIsLoading };
}
