import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

const STORAGE_KEY = '@movie_favorites';

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // load favorites
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedFavorites !== null) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (e) {
        console.error('Failed to load favorites.', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  // Save favorites 
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      } catch (e) {
        console.error('Failed to save favorites.', e);
      }
    };
    
     
    if (!isLoading) {
      saveFavorites();
    }
  }, [favorites, isLoading]);

  const toggleFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      // Check if movie is already a favorite
      const isFavorite = prevFavorites.find((fav) => fav.id === movie.id);

      if (isFavorite) {
        // Remove from favorites
        return prevFavorites.filter((fav) => fav.id !== movie.id);
      } else {
        // Add to favorites
        return [...prevFavorites, movie];
      }
    });
  };

  const isMovieFavorite = (movieId) => {
    return !!favorites.find((fav) => fav.id === movieId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isLoading,
        toggleFavorite,
        isMovieFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use the context
export const useFavorites = () => {
  return useContext(FavoritesContext);
};