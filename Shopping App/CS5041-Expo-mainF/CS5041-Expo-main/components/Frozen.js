  // Frozen.js
  import * as React from 'react';
  import { List, Checkbox, TextInput } from 'react-native-paper';
// Component for FrozenPizzaItem
const FrozenPizzaItem = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <List.Item
      title="Frozen Pizza"
      description="Frozen food"
      left={props => <List.Icon {...props} icon="pizza" />}
      right={props => <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />}
    />
  );
};

// Component for FrozenVegetablesItem
const FrozenVegetablesItem = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <List.Item
      title="Frozen Vegetables"
      description="Frozen food"
      left={props => <List.Icon {...props} icon="vegetables" />}
      right={props => <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />}
    />
  );
};

// Component for FrozenIceCreamItem
const FrozenIceCreamItem = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <List.Item
      title="Ice Cream"
      description="Frozen food"
      left={props => <List.Icon {...props} icon="ice-cream" />}
      right={props => <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />}
    />
  );
};

// Component for ChickenNuggetsItem
const ChickenNuggetsItem = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <List.Item
      title="Chicken Nuggets"
      description="Frozen food"
      left={props => <List.Icon {...props} icon="chicken-nuggets" />}
      right={props => <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />}
    />
  );
};

// Component for FishSticksItem
const FishSticksItem = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <List.Item
      title="Fish Sticks"
      description="Frozen food"
      left={props => <List.Icon {...props} icon="fish-sticks" />}
      right={props => <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />}
    />
  );
};
export default function Frozen() {
  return (
    <List.Accordion title="Frozen Foods">
      <FrozenPizzaItem />
      <FrozenVegetablesItem />
      <FrozenIceCreamItem />
      <ChickenNuggetsItem />
      <FishSticksItem />
    </List.Accordion>
  );
}