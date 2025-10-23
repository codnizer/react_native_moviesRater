 
import { TouchableOpacity, Image, StyleSheet, View, Text } from 'react-native';
import { getPosterUrl } from '../api/tmdb';

const MovieCard = ({ movie, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: getPosterUrl(movie.poster_path) }}
        style={styles.poster}
        resizeMode="cover"
      />
    
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
    marginRight: 15,
  },
  poster: {
    width: '100%',
    height: 210,  
    borderRadius: 12,
    backgroundColor: '#333', 
  },
 
});

export default MovieCard;