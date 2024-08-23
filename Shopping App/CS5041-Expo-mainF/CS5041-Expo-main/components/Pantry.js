
  // Pantry.js
  import * as React from 'react';
  import { List, Checkbox, TextInput } from 'react-native-paper';
// Component for RiceItem
const RiceItem = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <List.Item
      title="Rice"
      description="Staple food"
      left={props => <List.Icon {...props} icon="rice" />}
      right={props => <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />}
    />
  );
};

// Component for PastaItem
const PastaItem = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <List.Item
      title="Pasta"
      description="Italian dish"
      left={props => <List.Icon {...props} icon="pasta" />}
      right={props => <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />}
    />
  );
};

// Component for CannedBeansItem
const CannedBeansItem = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <List.Item
      title="Canned Beans"
      description="Protein source"
      left={props => <List.Icon {...props} icon="beans" />}
      right={props => <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />}
    />
  );
};

// Component for OliveOilItem
const OliveOilItem = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <List.Item
      title="Olive Oil"
      description="Cooking oil"
      left={props => <List.Icon {...props} icon="oil" />}
      right={props => <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />}
    />
  );
};

// Component for FlourItem
const FlourItem = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <List.Item
      title="Flour"
      description="Baking ingredient"
      left={props => <List.Icon {...props} icon="flour" />}
      right={props => <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />}
    />
  );
};
export default function Pantry() {
  return (
    <List.Accordion title="Pantry">
      <RiceItem />
      <PastaItem />
      <CannedBeansItem />
      <OliveOilItem />
      <FlourItem />
    </List.Accordion>
  );
}