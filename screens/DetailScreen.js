import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { getMovieDetails, getBackdropUrl, getPosterUrl } from '../api/tmdb';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Rating from '../components/Rating';
import { useFavorites } from '../context/FavoritesContext';  

const { width, height } = Dimensions.get('window');

export default function DetailScreen({ route, navigation }) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get favorites state and functions from context
  const { toggleFavorite, isMovieFavorite } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true); // Set loading true on new movie ID
        const response = await getMovieDetails(movieId);
        setMovie(response.data);
        // Check if this movie is a favorite *after* it's loaded
        setIsFavorite(isMovieFavorite(response.data.id));
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId, isMovieFavorite]);  

  const handleToggleFavorite = () => {
    if (movie) {
      toggleFavorite(movie);
      setIsFavorite(!isFavorite);  
    }
  };

  if (loading) {
    return (
      <View style={[styles.screen, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={[styles.screen, styles.loadingContainer]}>
        <Text style={styles.errorText}>Could not load movie details.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.backdropContainer}>
        <Image
          source={{ uri: getBackdropUrl(movie.backdrop_path) }}
          style={styles.backdrop}
        />
        {/* Gradient overlay for text readability */}
        <LinearGradient
          colors={['transparent', 'rgba(20,20,20,0.7)', '#141414']}
          style={styles.gradient}
        />
      </View>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={32} color="white" />
      </TouchableOpacity>

      {/* --- NEW: FAVORITE BUTTON --- */}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={handleToggleFavorite}
      >
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={32}
          color={isFavorite ? '#E50914' : 'white'}
        />
      </TouchableOpacity>
      {/* ----------------------------- */}


      {/* Main Content */}
      <View style={styles.contentContainer}>
        <Image
          source={{ uri: getPosterUrl(movie.poster_path) }}
          style={styles.poster}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <View style={styles.metaContainer}>
            <Rating score={movie.vote_average} />
            <Text style={styles.metaText}>({movie.vote_average.toFixed(1)})</Text>
            <Text style={styles.metaText}>|</Text>
            <Text style={styles.metaText}>{movie.release_date.split('-')[0]}</Text>
            <Text style={styles.metaText}>|</Text>
            <Text style={styles.metaText}>{movie.runtime} min</Text>
          </View>
          <View style={styles.genresContainer}>
            {movie.genres.map((genre) => (
              <View key={genre.id} style={styles.genreChip}>
                <Text style={styles.genreText}>{genre.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.plotContainer}>
        <Text style={styles.plotTitle}>Plot Summary</Text>
        <Text style={styles.plotOverview}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#141414',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    fontSize: 16,
  },
  backdropContainer: {
    width: width,
    height: height * 0.45,
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 15,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 2,
  },
   favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 15,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 5,  
  },
   contentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: -height * 0.15,  
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 12,
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: 'white',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'flex-end',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    color: '#aaa',
    fontSize: 14,
    marginLeft: 5,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreChip: {
    backgroundColor: '#333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  genreText: {
    color: '#eee',
    fontSize: 12,
  },
  plotContainer: {
    padding: 20,
  },
  plotTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  plotOverview: {
    color: '#ccc',
    fontSize: 15,
    lineHeight: 22,
  },
});