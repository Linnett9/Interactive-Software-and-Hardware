import { StatusBar } from 'expo-status-bar';

import { Platform, StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import {router, Stack, useLocalSearchParams} from "expo-router";
import {useList} from "react-firebase-hooks/database";
import {equalTo, limitToFirst, orderByKey, query, ref, remove} from "firebase/database";
import {auth, database, signInWithToken} from "../../components/Firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
import {ActivityIndicator, Checkbox, List, TextInput} from "react-native-paper";
import {updateListItem} from "../../components/DatabaseService";
import * as React from "react";
import CategoryMenu from "../../components/Categories";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)

export default function ListItemScreen() {
  const [user, authLoading, authError] = useAuthState(auth);
  useEffect(() => {
    signInWithToken().then(() => {if (authError) console.log(authError)});
  }, []);

  const { id } = useLocalSearchParams();

  const [listItems] = useList(user ? query(ref(database, `/private/${user.uid}/`), orderByKey(), equalTo(id.toString()), limitToFirst(1)) : null);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [lastBought, setLastBought] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const [deleteAccordionExpanded, setDeleteAccordionExpanded] = React.useState(false);

  let isServerSideUpdate = false;

  useEffect(() => {
    if (listItems && listItems?.length > 0) {
      isServerSideUpdate = true;

      const value = listItems[0].val();
      const title = value.message;
      const metadata = JSON.parse(value.content || null);

      setTitle(title || "")
      setImage(metadata.image || "")
      setQuantity(metadata.quantity || "")
      setNotes(metadata.notes || "")
      setCategory(metadata.category || "")
      setPrice(metadata.price || "")
      setLastBought(metadata.lastBought || "")
      setAssignedTo(metadata.assignedTo || "")
    }
  }, [listItems]);

  useEffect(() => {
    if (user && title !== ""  && !isServerSideUpdate) {
      let lastBoughtValue = lastBought === "" ? null : parseInt(lastBought);
      updateListItem(user?.uid, id.toString(), title, parseInt(quantity), category, lastBoughtValue, notes, image, price, assignedTo).then(res => console.log(res));
      isServerSideUpdate = false;
    }
  }, [title, image, quantity, notes, category, price, lastBought, assignedTo])

  return (
      <View style={styles.container}>
        <Stack.Screen
            options={{
              title: title
            }}
        />

        {
          listItems?.length == 0 ?
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: "100%"}}>
                <ActivityIndicator size="large"></ActivityIndicator>
              </View> :
              <>
                <TextInput
                    label="Name"
                    value={title}
                    style={{
                      width: "100%",
                    }}
                    onChangeText={input => setTitle(input)}
                />
                <TextInput
                    label="Quantity"
                    inputMode="numeric"
                    value={quantity}
                    style={{
                      width: "100%",
                    }}
                    onChangeText={input => setQuantity(input)}
                />
                <List.Item
                    title="Status"
                    description={lastBought ? "Last bought " + dayjs(lastBought).fromNow() : 'To buy'}
                    left={props => <Checkbox status={lastBought ? 'checked' : 'unchecked'}
                                             onPress={() => {
                                               if (lastBought) {
                                                 setLastBought("");
                                               } else {
                                                 setLastBought(Date.now().toString());
                                               }
                                             }} />}
                />
                <TextInput
                    label="Notes"
                    value={notes}
                    multiline={true}
                    style={{
                      width: "100%",
                    }}
                    onChangeText={input => setNotes(input)}
                />
                <CategoryMenu chosen={category} setCategory={setCategory} ></CategoryMenu>
                <TextInput
                    label="Price"
                    inputMode="numeric"
                    value={price}
                    left={<TextInput.Affix text="£" />}
                    style={{
                      width: "100%",
                    }}
                    onChangeText={input => setPrice(input)}
                />
                {/*<TextInput*/}
                {/*    label="Assigned to"*/}
                {/*    value={assignedTo}*/}
                {/*    style={{*/}
                {/*      width: "100%",*/}
                {/*    }}*/}
                {/*    onChangeText={input => setAssignedTo(input)}*/}
                {/*/>*/}
                <List.Accordion
                    title="Delete item"
                    expanded={deleteAccordionExpanded}
                    onPress={() => setDeleteAccordionExpanded(true)}
                    left={props => <List.Icon {...props} icon="trash-can" />}>
                  <List.Item title="Confirm delete" onPress={() => {
                    if (user) {
                      remove(ref(database, `/private/${user.uid}/${id}`))
                      router.back();
                    }
                  }} />
                  <List.Item title="Cancel, don't delete" onPress={() => setDeleteAccordionExpanded(false)} />
                </List.Accordion>
              </>
        }

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
