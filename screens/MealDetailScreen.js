import { useLayoutEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

import IconButton from '../components/IconButton';
import List from '../components/MealDetail/List';
import Subtitle from '../components/MealDetail/Subtitle';
import MealDetails from '../components/MealDetails';
import { MEALS } from '../data/dummy-data';
import { FavoritesContext } from '../store/context/favorites-context';

function MealDetailScreen({ route, navigation }) {
  const favoriteMealsCtx = useContext(FavoritesContext);
  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);

  function changeFavoriteStatusHandler() {
    if (mealIsFavorite) {
      favoriteMealsCtx.removeFavorite(mealId);
    } else {
      favoriteMealsCtx.addFavorite(mealId);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            onPress={changeFavoriteStatusHandler}
            icon={mealIsFavorite ? 'star' : 'star-outline'}
            color='white'
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <View>
        <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{selectedMeal.title}</Text>
        <MealDetails
          duration={selectedMeal.duration}
          affordability={selectedMeal.affordability}
          complexity={selectedMeal.complexity}
          textStyle={styles.detailText}
        />
        <View style={styles.outerContainer}>
          <View style={styles.listContainer}>
            <Subtitle>Ingredients</Subtitle>
            <List data={selectedMeal.ingredients} />
            <Subtitle>Steps</Subtitle>
            <List data={selectedMeal.steps} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },
  detailText: {
    color: 'white',
  },
  listContainer: {
    width: '80%',
  },
  outerContainer: {
    alignItems: 'center',
  },
  rootContainer: {
    marginBottom: 32,
  },
});

export default MealDetailScreen;
