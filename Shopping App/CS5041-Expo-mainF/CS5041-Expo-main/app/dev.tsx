// Import React and React Native modules
import * as React from 'react';
import { StyleSheet, ScrollView} from 'react-native';

// Import custom Themed components
import { View } from '../components/Themed';

// Import React Native Paper components
import {ActivityIndicator, Text, Button} from 'react-native-paper';

import {useEffect} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, signInWithToken} from "../components/Firebase";
import {useList} from "react-firebase-hooks/database";
import {equalTo, orderByChild, query, ref, remove} from "firebase/database";
import { database } from "../components/Firebase";
import {writeJsonData} from "../components/DatabaseService";

const catalogue = [
    {
        "message": "Apple",
        "content": {
            "category": "Fruit and vegetables",
            "image": "food-apple",
        }
    },
    {
        "message": "Banana",
        "content": {
            "category": "Fruit and vegetables",
            "image": "food-apple",
        }
    },
    {
        "message": "Orange",
        "content": {
            "category": "Fruit and vegetables",
            "image": "food-apple",
        }
    },
    {
        "message": "Carrot",
        "content": {
            "category": "Fruit and vegetables",
            "image": "carrot",
        }
    },
    {
        "message": "Milk",
        "content": {
            "category": "Dairy and eggs",
            "image": "cow",
        }
    },
    {
        "message": "Cheese",
        "content": {
            "category": "Dairy and eggs",
            "image": "cheese",
        }
    },
    {
        "message": "Yoghurt",
        "content": {
            "category": "Dairy and eggs",
            "image": "silverware-spoon",
        }
    },
    {
        "message": "Butter",
        "content": {
            "category": "Dairy and eggs",
            "image": "knife",
        }
    },
    {
        "message": "Sour cream",
        "content": {
            "category": "Dairy and eggs",
            "image": "silverware-spoon",
        }
    },
    {
        "message": "Chicken",
        "content": {
            "category": "Meat and fish",
            "image": "bird",
        }
    },
    {
        "message": "Beef",
        "content": {
            "category": "Meat and fish",
            "image": "food-steak",
        }
    },
    {
        "message": "Pork",
        "content": {
            "category": "Meat and fish",
            "image": "pig",
        }
    },
    {
        "message": "Salmon",
        "content": {
            "category": "Meat and fish",
            "image": "fish",
        }
    },
    {
        "message": "Shrimp",
        "content": {
            "category": "Meat and fish",
            "image": "fish",
        }
    },
    {
        "message": "Bread",
        "content": {
            "category": "Bakery and cereal",
            "image": "bread-slice",
        }
    },
    {
        "message": "Cake",
        "content": {
            "category": "Bakery and cereal",
            "image": "cake",
        }
    },
    {
        "message": "Cereal",
        "content": {
            "category": "Bakery and cereal",
            "image": "silverware-spoon",
        }
    },
    {
        "message": "Rice",
        "content": {
            "category": "Food cupboard",
            "image": "rice",
        }
    },
    {
        "message": "Pasta",
        "content": {
            "category": "Food cupboard",
            "image": "pasta",
        }
    },
    {
        "message": "Beans",
        "content": {
            "category": "Food cupboard",
            "image": "trash-can",
        }
    },
    {
        "message": "Olive oil",
        "content": {
            "category": "Food cupboard",
            "image": "bottle-wine",
        }
    },
    {
        "message": "Flour",
        "content": {
            "category": "Food cupboard",
            "image": "baguette",
        }
    },
    {
        "message": "Biscuits",
        "content": {
            "category": "Treats and snacks",
            "image": "cookie",
        }
    },
    {
        "message": "Chocolate",
        "content": {
            "category": "Treats and snacks",
            "image": "grid",
        }
    },
    {
        "message": "Ball",
        "content": {
            "category": "Fun",
            "image": "football",
        }
    },
    {
        "message": "Racquet",
        "content": {
            "category": "Fun",
            "image": "racquetball",
        }
    },
    {
        "message": "Cola",
        "content": {
            "category": "Drinks",
            "image": "bottle-soda",
        }
    },
    {
        "message": "Lemonade",
        "content": {
            "category": "Drinks",
            "image": "bottle-soda",
        }
    },
    {
        "message": "Pizza",
        "content": {
            "category": "Frozen",
            "image": "pizza",
        }
    },
    {
        "message": "Vegetables",
        "content": {
            "category": "Frozen",
            "image": "carrot",
        }
    },
    {
        "message": "Ice cream",
        "content": {
            "category": "Frozen",
            "image": "ice-cream",
        }
    },
    {
        "message": "Chicken nuggets",
        "content": {
            "category": "Frozen",
            "image": "bag-suitcase",
        }
    },
    {
        "message": "Fish sticks",
        "content": {
            "category": "Frozen",
            "image": "bag-suitcase",
        }
    }
]

// Default export for TabOneScreen
export default function DevScreen() {
    const [user, authLoading, authError] = useAuthState(auth);
    useEffect(() => {
        signInWithToken().then(() => {if (authError) console.log(authError)});
    }, []);

    const [records] = useList(user ? query(ref(database, `/private/${user.uid}/`)) : null);

    return (
        <View style={styles.container}>
            {/* If the user is not logged in, show loading otherwise show input boxes */}
            {authLoading ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: "100%"}}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                </View> :
                <ScrollView style={styles.scrollView}>
                    <Button onPress={() => {
                        if (user) {
                            records?.map(item => {
                                remove(ref(database, `/private/${user.uid}/${item.key}`))
                            })
                        }
                    }}>Delete everything in the database</Button>
                    <Button onPress={() => {
                        if (user) {
                            catalogue?.map(item => {
                                return writeJsonData(user.uid,
                                    "item",
                                    item.message,
                                    item.content,
                                )
                            })
                        }
                    }}>Create catalogue of known items</Button>
                </ScrollView>
            }
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 16,
        width: '100%',
    },
    scrollView: {
        width: '100%',
    }
});
