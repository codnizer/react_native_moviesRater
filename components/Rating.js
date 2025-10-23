 
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Rating = ({ score }) => {
 
  const rating = score / 2;
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <View style={styles.container}>
      {[...Array(fullStars)].map((_, i) => (
        <Ionicons key={`full_${i}`} name="star" size={16} color="#FFD700" />
      ))}
      {halfStar && <Ionicons name="star-half" size={16} color="#FFD700" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Ionicons key={`empty_${i}`} name="star-outline" size={16} color="#FFD700" />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Rating;