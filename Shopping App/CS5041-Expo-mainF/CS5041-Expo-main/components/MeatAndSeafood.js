  // MeatAndSeafood.js
  import * as React from 'react';
  import { List, Checkbox, TextInput } from 'react-native-paper';

// Component for ChickenItem
const ChickenItem = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <List.Item
      title="Chicken"
      description="Poultry meat"
      left={props => <List.Icon {...props} icon="chicken" />}
      right={props => <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />}
    />
  );
};
// Component for BeefItem
const BeefItem = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <List.Item
      title="Beef"
      description="Red meat"
      left={props => <List.Icon {...props} icon="cow" />}
      right={props => <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />}
    />
  );
};

// Component for PorkItem
const PorkItem = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <List.Item
      title="Pork"
      description="Pig meat"
      left={props => <List.Icon {...props} icon="pig" />}
      right={props => <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />}
    />
  );
};

// Component for SalmonItem
const SalmonItem = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <List.Item
      title="Salmon"
      description="Fish meat"
      left={props => <List.Icon {...props} icon="fish" />}
      right={props => <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />}
    />
  );
};

// Component for ShrimpItem
const ShrimpItem = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <List.Item
      title="Shrimp"
      description="Seafood"
      left={props => <List.Icon {...props} icon="shrimp" />}
      right={props => <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />}
    />
  );
};
export default function MeatAndSeafood() {
  return (
    <List.Accordion title="Meat and Seafood">
      <ChickenItem />
      <BeefItem />
      <PorkItem />
      <SalmonItem />
      <ShrimpItem />
    </List.Accordion>
  );
}