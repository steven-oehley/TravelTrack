import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

function Logo() {
  return <h1>👣 Travel Track 🧳</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // problem here if we have state here - form only needs to set the items
  // items are rendered in the PackList component :'(
  // solution for this problem - LIFT STATE UP! - lift to first common parent
  // component tree - common parent is the App component
  // -- App
  //  -- -- Logo
  //  -- -- Form
  //  -- -- PackList
  //  -- -- -- Item
  //  -- -- Stats

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return; // guard clause;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    // initialItems.push(newItem);
    // not allowed to mutate state - cant push!
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <div className="add-form">
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need to pack?</h3>
        <select
          name=""
          id=""
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {/* Typing out by hand will take too long if you need a lot of options, better solution -> use map */}
          {/* <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option> */}
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item...."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  );
}

function PackList(props) {
  return (
    <div className="list">
      <ul>
        {props.items.map((item) => (
          <Item packingItem={item} key={item.id}></Item>
        ))}
      </ul>
    </div>
  );
}

function Item({ packingItem }) {
  return (
    <li>
      <span
        style={
          packingItem.packed
            ? { textDecoration: "line-through" }
            : { textDecoration: "none" }
        }
      >
        {packingItem.quantity} {packingItem.description}
      </span>
      <button>&times;</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      You have X items on your list, you have already packed X (X%)
    </footer>
  );
}

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
    // cant mutate in react - always need a new array so cant use push
  }

  // lifted state from form
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackList items={items} />
      <Stats />
    </div>
  );
}
