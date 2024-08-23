import React, { useState, useMemo } from 'react';
import { StyleSheet, View, TextInput, Text, ScrollView } from 'react-native';

const MealPlannerScreen = () => {
  // Create state to hold the meal plans for each day
  const [mealPlans, setMealPlans] = useState({
    breakfast: Array(7).fill(''),
    lunch: Array(7).fill(''),
    dinner: Array(7).fill(''),
  });

  // Function to update the state when the input changes
  const handleMealChange = (text, mealType, index) => {
    const newMealPlans = { ...mealPlans };
    newMealPlans[mealType][index] = text;
    setMealPlans(newMealPlans);
  };

  // Calculate the number of filled meals
  const filledMealCount = useMemo(() => {
    return Object.values(mealPlans).flat().filter(meal => meal.trim() !== '').length;
  }, [mealPlans]);

  // Total number of meals in a week
  const totalMeals = 7 * 3; // 7 days * 3 meals per day

  // Check if at least two-thirds of the meals are filled
  const isWellPrepared = filledMealCount >= (2 / 3) * totalMeals;

  return (
    <ScrollView style={styles.container}>
      {/* Conditionally display the top statement */}
      {isWellPrepared && (
        <Text style={styles.topStatement}>
          You are well prepared, these meals sound lovely!
        </Text>
      )}

      {/* Create an input for each meal of each day */}
      {['breakfast', 'lunch', 'dinner'].map((mealType) => (
        <View key={mealType} style={styles.mealTypeContainer}>
          <Text style={styles.mealTypeText}>{mealType.toUpperCase()}</Text>
          {mealPlans[mealType].map((meal, index) => (
            <View key={`${mealType}-${index}`} style={styles.inputContainer}>
              <Text>Day {index + 1}:</Text>
              <TextInput
                placeholder={`What's for ${mealType} on day ${index + 1}?`}
                value={meal}
                onChangeText={(text) => handleMealChange(text, mealType, index)}
                style={styles.input}
              />
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mealTypeContainer: {
    marginVertical: 10,
  },
  mealTypeText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    flex: 1,
  },
  topStatement: {
    fontSize: 18,
    marginVertical: 20,
    textAlign: 'center',
  },
});

export default MealPlannerScreen;
