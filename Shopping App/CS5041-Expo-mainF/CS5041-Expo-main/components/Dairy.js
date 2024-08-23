  // Dairy.js
  import * as React from 'react';
  import { List, Checkbox, TextInput } from 'react-native-paper';

// Component for MilkItem
const MilkItem = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <List.Item
      title="Milk"
      description="Dairy product"
      left={props => <List.Icon {...props} icon="milk" />}
      right={props => <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />}
    />
  );
};

// Component for CheeseItem
const CheeseItem = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <List.Item
      title="Cheese"
      description="Dairy product"
      left={props => <List.Icon {...props} icon="cheese" />}
      right={props => <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />}
    />
  );
};

// Component for YogurtItem
const YogurtItem = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <List.Item
      title="Yogurt"
      description="Dairy product"
      left={props => <List.Icon {...props} icon="yogurt" />}
      right={props => <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />}
    />
  );
};

// Component for ButterItem
const ButterItem = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <List.Item
      title="Butter"
      description="Dairy product"
      left={props => <List.Icon {...props} icon="butter" />}
      right={props => <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />}
    />
  );
};
// Component for SourCreamItem
const SourCreamItem = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <List.Item
      title="Sour Cream"
      description="Dairy product"
      left={props => <List.Icon {...props} icon="sour-cream" />}
      right={props => <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />}
    />
  );
};
// ... (existing components like MilkItem, CheeseItem, etc.)

export default function Dairy() {
  return (
    <List.Accordion title="Dairy">
      <MilkItem />
      <CheeseItem />
      <YogurtItem />
      <ButterItem />
      <SourCreamItem />
    </List.Accordion>
  );
}
