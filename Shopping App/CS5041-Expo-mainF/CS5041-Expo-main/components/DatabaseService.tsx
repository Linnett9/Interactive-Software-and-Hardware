import {get, ref, push, child, set, serverTimestamp} from "firebase/database";
import {database} from "./Firebase";

/**
 * Create a new shopping list item.
 * @param uid The User ID for the Firebase database.
 * @param name The name of the item, like "Milk"
 * @param quantity Quantity to buy.
 * @param category Category of the item, e.g. "Dairy".
 * @param lastBought `null` if currently unchecked, otherwise a Date object representing when the item was last bought.
 * @param notes Arbitrary user notes about the item.
 * @param image Font Awesome icon name representing the product.
 * @param price `null` or the price of the item for budgeting.
 * @param assignedTo `null` or the user ID to assign this item to.
 */
export const newListItem = (uid: string, name: string, quantity?: number, category?: string, lastBought?: Date,  notes?: string, image?: string,  price?: number, assignedTo?: string) => {
    return writeJsonData(uid,
        "list-item",
        name,
        {
            "image": image || "cube",
            "quantity": quantity || null,
            "notes": notes || "",
            "category": category || "Uncategorised",
            "price": price || null,
            "lastBought": lastBought ? lastBought.toUTCString() : null,
            "assignedTo": assignedTo || null,
        },
    )
}

/**
 * Update a shopping list item. Any values which are `undefined` are left unchanged.
 * @param uid The User ID for the Firebase database.
 * @param itemID The ID of the item in the database.
 * @param name The name of the item, like "Milk"
 * @param quantity Quantity to buy.
 * @param category Category of the item, e.g. "Dairy".
 * @param lastBought `null` if currently unchecked, otherwise a Date object representing when the item was last bought.
 * @param notes Arbitrary user notes about the item.
 * @param image Font Awesome icon name representing the product.
 * @param price `null` or the price of the item for budgeting.
 * @param assignedTo `null` or the user ID to assign this item to.
 */
export const updateListItem = async (uid: string, itemID: string, name?: string, quantity?: number, category?: string, lastBought?: number | null, notes?: string, image?: string, price?: string, assignedTo?: string | null) => {
    const oldData    = await readData(uid, itemID);
    const oldContent = JSON.parse(oldData.content);

    return writeJsonData(uid,
        oldData.type,
        name === undefined ? oldData.message : name,
        {
            "image":      image      === undefined ? oldContent.image      : image,
            "quantity":   quantity   === undefined ? oldContent.quantity   : quantity,
            "notes":      notes      === undefined ? oldContent.notes      : notes,
            "category":   category   === undefined ? oldContent.category   : category,
            "price":      price      === undefined ? oldContent.price      : price,
            "lastBought": lastBought === undefined ? oldContent.lastBought : lastBought,
            "assignedTo": assignedTo === undefined ? oldContent.assignedTo : assignedTo,
        },
        oldData.created,
        itemID
    )
}

export const writeJsonData = async (uid: string, type: string, message: string, content: object, created?: string, key?: string) => {
    return writeData(uid, type, message, JSON.stringify(content), created, key);
};

export const writeData = async (uid: string, type: string, message: string, content: string, created?: string, key?: string) => {
    const postData = {
        type,
        created: created || serverTimestamp(),
        modified: serverTimestamp(),
        message,
        content,
    };

    if (key) {
        await set(ref(database, `private/${uid}/${key}`), postData);
    } else {
        await push(child(ref(database), `private/${uid}/`), postData);
    }
};

export const readData = async (uid: string, key: string) => {
    const dataRef = ref(database, `private/${uid}/${key}`);
    const snap = await get(dataRef);
    if (snap.exists()) {
        return snap.val();
    } else {
        console.log("No data available");
        return null;
    }
};
