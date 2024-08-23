import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text, ScrollView } from 'react-native';
import { ref, push, set as firebaseSet, onValue } from 'firebase/database';
import { database } from '../../components/Firebase';

interface Item {
  id: string;
  name: string;
  price: number;
  splitBetween: number;
}

const ReceiptsScreen: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [splitBetween, setSplitBetween] = useState('');

  // Calculate the individual share
  const individualShare = () => {
    const price = parseFloat(newItemPrice);
    const people = parseInt(splitBetween, 10);
    if (!isNaN(price) && !isNaN(people) && people > 0) {
      return (price / people).toFixed(2);
    }
    return '0.00';
  };

  const addItemToReceipt = () => {
    if (!newItemName || !newItemPrice || !splitBetween) {
      Alert.alert('Error', 'Please enter all fields.');
      return;
    }

    const price = parseFloat(newItemPrice);
    const people = parseInt(splitBetween, 10);
    if (isNaN(price) || isNaN(people) || people <= 0) {
      Alert.alert('Error', 'Please enter valid numbers for price and split between.');
      return;
    }

    const newItemRef = push(ref(database, 'receipts'));
    firebaseSet(newItemRef, {
      name: newItemName,
      price: price,
      splitBetween: people,
    }).then(() => {
      // Don't clear the fields if you want to add multiple items
    }).catch(error => {
      Alert.alert('Error', 'There was a problem adding the item.');
      console.error(error);
    });
  };

  useEffect(() => {
    const receiptsRef = ref(database, 'receipts');
    const unsubscribe = onValue(receiptsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const loadedItems = Object.keys(data).map(key => ({
        id: key,
        name: data[key].name,
        price: data[key].price,
        splitBetween: data[key].splitBetween,
      }));
      setItems(loadedItems);
    });

    // Return a function to detach the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Inputs for new item */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Item Name"
          value={newItemName}
          onChangeText={setNewItemName}
          style={styles.input}
        />
        <TextInput
          placeholder="Item Price"
          value={newItemPrice}
          onChangeText={setNewItemPrice}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Split Between"
          value={splitBetween}
          onChangeText={setSplitBetween}
          keyboardType="number-pad"
          style={styles.input}
        />
        {/*<Button title="Add Item" onPress={addItemToReceipt} />*/}
      </View>

      {/* Display the dynamic statement below the button */}
      {newItemName && newItemPrice && splitBetween ? (
        <Text style={styles.outputText}>
          To evenly split the bill of {newItemName} between {splitBetween} people, each individual owes £{individualShare()}
        </Text>
      ) : null}

      {/* List of added items */}
      {items.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <Text style={styles.itemText}>
            To split {item.name} between {item.splitBetween} people, each individual owes £{(item.price / item.splitBetween).toFixed(2)}
          </Text>
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
    padding: 10,
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
  },
  outputText: {
    fontSize: 18, // Increase font size
    marginVertical: 20, // Increase space between statements
    textAlign: 'center', // Center the text if desired
  },
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
  },
  itemText: {
    fontSize: 18, // Increase font size for item text as well
  },
});

export default ReceiptsScreen;
