import React from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';  
import { useNavigation } from '@react-navigation/native';

export default function SavedScreen() {
  const { favorites } = useFavorites();
  const navigation = useNavigation();

  const handleNavigate = (movieId) => {
     navigation.navigate('Home', { 
      screen: 'Detail', 
      params: { movieId: movieId } 
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <MovieCard
        movie={item}
        onPress={() => handleNavigate(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.headerTitle}>Saved Movies</Text>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You haven't saved any movies yet.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#141414',
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  itemContainer: {
    flex: 1/2,
    alignItems: 'center',
    marginVertical: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
});