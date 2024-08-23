import React, {useState} from "react";
import {View} from "react-native";
import {Menu, List, PaperProvider} from "react-native-paper";

interface CategoryMenuProps {
    chosen: string;
    setCategory: React.Dispatch<any>,
}

export const categories = [
    "Fruit and vegetables",
    "Dairy and eggs",
    "Meat and fish",
    "Bakery and cereal",
    "Food cupboard",
    "Treats and snacks",
    "Fun",
    "Drinks",
    "Frozen",
    "Uncategorised"
]

export default function CategoryMenu({ chosen, setCategory }: CategoryMenuProps) {
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchorPosition={"bottom"}
            anchor={
                <List.Item
                    title="Category"
                    description={chosen}
                    right={props => <List.Icon {...props} icon="chevron-down" />}
                    onPress={openMenu}
                    style={{
                        width: "100%",
                    }}
                />
            }>
            {
                categories.map((item, index) => {
                    return (
                        <Menu.Item
                            key={index}
                            onPress={() => {
                                setCategory(item);
                                closeMenu();
                            }}
                            title={item}
                        />
                    );
                })
            }
        </Menu>
    );
}