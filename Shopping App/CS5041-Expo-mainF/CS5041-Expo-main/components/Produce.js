  // Produce.js
import * as React from 'react';
import { List, Checkbox, TextInput } from 'react-native-paper';

// Component for BananaItem
const BananaItem = () => {
  const [checked, setChecked] = React.useState(false);
  const [quantity, setQuantity] = React.useState(0);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    if (checked) {
      setTotal(prevTotal => prevTotal + quantity);
    } else {
      setTotal(prevTotal => prevTotal - quantity);
    }
  }, [quantity, checked]);

  React.useEffect(() => {
    console.log("Total:", total);
  }, [total]);

  return (
    <List.Item
      title="Banana"
      description="A delicious tropical fruit"
      left={props => <List.Icon {...props} icon="fruit-banana" />}
      right={props => (
        <>
          <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />
          {checked && (
            <TextInput
              placeholder="Quantity"
              keyboardType="numeric"
              value={quantity.toString()}  // Make it a controlled component
              onChangeText={(text) => setQuantity(Number(text))}
            />
          )}
        </>
      )}
    />
  );
};


// Component for AppleItem
const AppleItem = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <List.Item
      title="Apple"
      description="A crunchy fruit"
      left={props => <List.Icon {...props} icon="apple" />}
      right={props => <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />}
    />
  );
};

// Component for OrangeItem
const OrangeItem = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <List.Item
      title="Orange"
      description="A citrus fruit"
      left={props => <List.Icon {...props} icon="orange" />}
      right={props => <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />}
    />
  );
};

// Component for CarrotItem
const CarrotItem = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <List.Item
      title="Carrot"
      description="A root vegetable"
      left={props => <List.Icon {...props} icon="carrot" />}
      right={props => <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />}
    />
  );
};

export default function Produce() {
  return (
    <List.Accordion
      title="Fresh Produce"
      left={props => <List.Icon {...props} icon="leaf" />}
    >
      <BananaItem />
      <AppleItem />
      <OrangeItem />
      <CarrotItem />
      {/* Add more individual food items here as needed */}
    </List.Accordion>
  );
}
