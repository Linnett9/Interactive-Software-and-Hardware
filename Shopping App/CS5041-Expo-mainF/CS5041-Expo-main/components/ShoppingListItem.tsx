import * as React from "react";
import {Checkbox, List, TextInput} from "react-native-paper";
import {updateListItem} from "./DatabaseService";
import {router} from "expo-router";

interface ShoppingListItemProps {
    uid: string | undefined,
    itemID: string,
    title: string,
    description: string,
    currentQuantity: number,
    iconName: string,
    done: boolean
}

export default function ShoppingListItem({uid, itemID, title, description, currentQuantity, iconName, done} : ShoppingListItemProps) {
    if (!uid) throw Error;

    return (
        <List.Item
            title={title}
            description={description}
            onPress={ (e) => {
                // Don't go to another page if we are tapping an input in the list items
                // @ts-ignore because it claims tagName doesn't exist on e.target, but it does
                if (e.target.tagName !== "INPUT") {
                    router.push({pathname: `/list-item/[id]`, params: {id: itemID}})
                }
            }}
            left={props => <List.Icon {...props} icon={iconName} />}
            right={() => (
                <>
                    <Checkbox status={done ? 'checked' : 'unchecked'} onPress={() => { if (done) {
                        updateListItem(uid, itemID, undefined, undefined, undefined, null);
                    } else {
                        updateListItem(uid, itemID, undefined, undefined, undefined, Date.now());
                    } }} />
                    <TextInput
                        label="Quantity"
                        inputMode="numeric"
                        value={currentQuantity ? currentQuantity.toString() : ""}
                        onChangeText={(text) => updateListItem(uid, itemID, undefined, parseInt(text))}
                    />
                </>
            )}
        />
    );
};