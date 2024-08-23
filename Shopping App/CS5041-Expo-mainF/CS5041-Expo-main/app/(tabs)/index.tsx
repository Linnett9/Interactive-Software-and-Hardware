// Import React and React Native modules
import * as React from 'react';
import { StyleSheet, ScrollView} from 'react-native';

// Import custom Themed components
import { View } from '../../components/Themed';

// Import React Native Paper components
import {ActivityIndicator, List, TextInput} from 'react-native-paper';

import {useEffect, useState} from "react";
import {newListItem} from "../../components/DatabaseService";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, signInWithToken} from "../../components/Firebase";
import {useList} from "react-firebase-hooks/database";
import {equalTo, orderByChild, query, ref} from "firebase/database";
import { database } from "../../components/Firebase";
import ShoppingListItem from "../../components/ShoppingListItem";
import _ from "lodash";
import {categories} from "../../components/Categories";
import Fuse from "fuse.js";

const TODO = "1";
const DONE = "2";

interface ItemRecord { message: string,
    key: string,
    content: {
        image: string,
        quantity: number,
        notes: string,
        category: string,
        price: number,
        lastBought: string,
        assignedTo: string
    }
}

interface CategorisedList {
    [category: string] : [items: ItemRecord]
}

export default function ShoppingListScreen() {
    const [user, authLoading, authError] = useAuthState(auth);
    useEffect(() => {
        signInWithToken().then(() => {if (authError) console.log(authError)});
    }, []);

    const [listItems] = useList(user ? query(ref(database, `/private/${user.uid}/`), orderByChild("type"), equalTo("list-item")) : null);
    const [catalogue] = useList(user ? query(ref(database, `/private/${user.uid}/`), orderByChild("type"), equalTo("item")) : null);

    const [newItem, setNewItem] = useState("");

    let parsedCatalogue: ItemRecord[] = [];
    if (catalogue && catalogue.length !== 0) {
        catalogue.map(item => {
            const value = item.val();
            value.key = item.key;
            value.content = JSON.parse(value.content || null);
            parsedCatalogue.push(value);
        })
    }

    // Initialise with a blank record so it can render the empty list vaguely competently
    let sortedItems : CategorisedList = {"": [{ message: "",
            key: "",
            content: {
                image: "",
                quantity: 0,
                notes: "",
                category: "",
                price: 0,
                lastBought: "",
                assignedTo: ""
            }
        }]};

    let parsedListItems : ItemRecord[] = [];
    if (listItems && listItems.length !== 0) {
        listItems.map(item => {
            const value = item.val();
            value.key = item.key;
            value.content = JSON.parse(value.content || null);
            parsedListItems.push(value);
        })

        if (parsedListItems.length > 0) {
            // Sort by title alphabetically
            parsedListItems = _.sortBy(parsedListItems, (x: ItemRecord) => x.message);
            // Group by category
            sortedItems = _.groupBy(parsedListItems, (x: ItemRecord) => x.content.category) as CategorisedList;

            Object.keys(sortedItems).forEach((category: string) => {
                // Split each category into done/not done
                const todoSplit = _.groupBy(sortedItems[category], (x: { content: { lastBought: null | string; }; }) => x.content.lastBought === null ? TODO : DONE);

                // Sort the done items in the category by last purchase time
                if (todoSplit[DONE]?.length > 0) {
                    // @ts-ignore because we fix the problem it flags up in the next line.
                    todoSplit[DONE] = _.sortBy(todoSplit[DONE], (x: { content: { lastBought: number; }; }) => -x.content.lastBought)
                }

                // Merge the done/not done back into one flat array. Because we use constants to represent done and
                // not done, and because those constants are ordered integers, the to-do items will appear before the
                // done ones.
                // @ts-ignore because if we've gotten this far there must be something in the category so flatMap
                // won't return an empty value.
                sortedItems[category] = _.flatMap(todoSplit)
            })
        }
    }

    const handleNewItem = () => {
        if (user) {
            // Create a searchable list of the initial item catalogue and everything the user has had on the list before
            const searchable = _.concat(parsedListItems, parsedCatalogue);
            const fuse = new Fuse(searchable, {
                keys: ["message"],
                includeScore: true
            });

            // Do a fuzzy-search for the user's input against the searchable list
            const results = fuse.search(newItem);

            // If we have found a close match to their entered text, infer the item's icon and category. Otherwise, just
            // add it as uncategorised with a generic icon.
            if (results.length > 0 && results[0].score !== undefined && results[0].score <= 0.6) {
                newListItem(user.uid, newItem, undefined, results[0].item.content.category, undefined, undefined, results[0].item.content.image).then(() => {
                    setNewItem(""); // clear input field
                })
            } else {
                newListItem(user.uid, newItem).then(() => {
                    setNewItem(""); // clear input field
                })
            }
        }
    }

    return (
        <View style={styles.container}>
            {/* If the user is not logged in, show loading. Otherwise, show shopping list. */}
            {authLoading ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: "100%"}}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                </View> :
                <ScrollView style={styles.scrollView}>
                    <TextInput
                        label="What do you need to buy?"
                        value={newItem}
                        onChangeText={input => setNewItem(input)}
                        onKeyPress={({ nativeEvent }) => nativeEvent.key === 'Enter' ? handleNewItem() : null}
                        right={<TextInput.Icon icon="plus" onPress={handleNewItem} />}
                        style={{ margin: 10 }}></TextInput>
                    {
                        categories.map((category) => {
                            if (sortedItems[category]) {
                                return (
                                    <List.Section title={category} key={category}>
                                        {
                                            sortedItems[category].map((item) => {
                                                return (
                                                    <ShoppingListItem
                                                        key={item.key}
                                                        itemID={item.key}
                                                        uid={user?.uid}
                                                        title={item.message}
                                                        description={item.content.notes || ""}
                                                        currentQuantity={item.content.quantity}
                                                        iconName={item.content.image}
                                                        done={item.content.lastBought !== null}
                                                    />
                                                )
                                            })
                                        }
                                    </List.Section>
                                )
                            }
                        })
                    }
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
