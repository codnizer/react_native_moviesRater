import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  StatusBar,
  TextInput,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, searchMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import { Ionicons } from '@expo/vector-icons';

 const MovieCarousel = ({ title, data, navigation }) => {
  const renderItem = ({ item }) => (
    <MovieCard
      movie={item}
      onPress={() => navigation.navigate('Detail', { movieId: item.id })}
    />
  );

  return (
    <View style={styles.carouselContainer}>
      <Text style={styles.carouselTitle}>{title}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselList}
      />
    </View>
  );
};

// --- Main Home Screen ---
export default function HomeScreen({ navigation }) {
  // Original state
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  // New state for search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // Tracks if we are in "search mode"

  // Fetch initial movies  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [nowPlayingRes, popularRes, topRatedRes] = await Promise.all([
          getNowPlayingMovies(),
          getPopularMovies(),
          getTopRatedMovies(),
        ]);
        setNowPlaying(nowPlayingRes.data.results);
        setPopular(popularRes.data.results);
        setTopRated(topRatedRes.data.results);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  //  Search 
  useEffect(() => {
    // If query is empty, clear search and show carousels
    if (searchQuery.trim() === '') {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    
    const searchTimer = setTimeout(async () => {
      try {
        setLoading(true);  
        setIsSearching(true);
        const res = await searchMovies(searchQuery);
        setSearchResults(res.data.results);
      } catch (err) {
        console.error("Failed to search movies:", err);
        setSearchResults([]);  
      } finally {
        setLoading(false);
      }
    }, 500);  

    
    return () => clearTimeout(searchTimer);
  }, [searchQuery]); 

  
  if (loading && !isSearching) { 
    return (
      <View style={[styles.screen, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  //  Render item for search results  
  const renderSearchItem = ({ item }) => (
    <View style={styles.searchItemContainer}>
      <MovieCard
        movie={item}
        onPress={() => navigation.navigate('Detail', { movieId: item.id })}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" />

      {/* --- Search Bar --- */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a movie..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
         
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

       
      {isSearching ? (
        
        <FlatList
          data={searchResults}
          renderItem={renderSearchItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // 2-column grid
          contentContainerStyle={styles.searchListContainer}
          ListEmptyComponent={
             <View style={styles.emptyContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color="#fff" />
                ) : (
                    <Text style={styles.emptyText}>No results found for "{searchQuery}"</Text>
                )}
             </View>
          }
        />
      ) : (
        
        <ScrollView>
          <Text style={styles.headerTitle}>Discover</Text>
          <MovieCarousel title="Now Playing" data={nowPlaying} navigation={navigation} />
          <MovieCarousel title="Popular" data={popular} navigation={navigation} />
          <MovieCarousel title="Top Rated" data={topRated} navigation={navigation} />
          <View style={{ height: 30 }} />
        </ScrollView>
      )}
    </SafeAreaView>
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
  
   searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c2c2e',
    borderRadius: 10,
    paddingHorizontal: 15,
    
    marginTop: 32,  
    marginBottom: 20,
    marginHorizontal: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 12,
  },
   headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10, 
  },
  carouselContainer: {
    marginBottom: 25,
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  carouselList: {
    paddingLeft: 20,
    paddingRight: 5,
  },
   searchListContainer: {
    paddingHorizontal: 15,
  },
  searchItemContainer: {
    flex: 1/2,
    alignItems: 'center',
    marginVertical: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
});