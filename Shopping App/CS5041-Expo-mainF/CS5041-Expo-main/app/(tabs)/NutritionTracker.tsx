import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, ScrollView } from 'react-native';

const NutritionTrackerScreen = () => {
  // Create state to hold the intake for each day
  const [dailyIntakes, setDailyIntakes] = useState(Array(31).fill(''));

  // Function to update the state when the input changes
  const handleIntakeChange = (text, index) => {
    const newIntakes = [...dailyIntakes];
    newIntakes[index] = text;
    setDailyIntakes(newIntakes);
  };

  // Function to calculate the average intake
  const calculateAverageIntake = () => {
    const sum = dailyIntakes.reduce((acc, intake) => acc + (intake ? parseInt(intake, 10) : 0), 0);
    const daysWithIntake = dailyIntakes.filter(intake => intake).length;
    return daysWithIntake > 0 ? parseFloat((sum / daysWithIntake).toFixed(2)) : 0;
  };

  // Determine if the average intake is above 5
  const averageIntake = calculateAverageIntake();
  const smiley = averageIntake > 5 ? ' 🙂' : '';

  return (
    <ScrollView style={styles.container}>
      {/* Display the average intake at the top */}
      <Text style={styles.averageIntakeText}>
        You have been averaging {averageIntake} fruits and vegetables a day{smiley}
      </Text>

      {/* Create an input for each day of the month */}
      {dailyIntakes.map((intake, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text>Day {index + 1}:</Text>
          <TextInput
            placeholder="How many fruit and vegetables did you eat today?"
            value={intake}
            onChangeText={(text) => handleIntakeChange(text, index)}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  averageIntakeText: {
    fontSize: 18,
    marginVertical: 20,
    textAlign: 'center',
  },
});

export default NutritionTrackerScreen;
