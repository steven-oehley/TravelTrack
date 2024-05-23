import { useState } from "react";

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

function PackList({ items, onDeleteItem, onToggleItem, onClear }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            packingItem={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          ></Item>
        ))}
      </ul>
      <div className="actions">
        {/* transorm into controlled element */}
        {/* three steps - state, give value state value, connect to an onChange*/}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by - Input Order</option>
          <option value="description">Sort by - Description</option>
          <option value="packed">Sort by - Packed Status</option>
        </select>
        <button onClick={onClear}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ packingItem, onDeleteItem, onToggleItem }) {
  // onDeleteItem passed from App, to PackingList to Item
  return (
    <li>
      {/* add checkbox */}
      <input
        type="checkbox"
        value={packingItem.packed}
        onChange={() => onToggleItem(packingItem.id)}
      />
      <span
        style={
          packingItem.packed
            ? { textDecoration: "line-through" }
            : { textDecoration: "none" }
        }
      >
        {packingItem.quantity} {packingItem.description}
      </span>
      <button onClick={() => onDeleteItem(packingItem.id)}>&times;</button>
    </li>
  );
}

function Stats({ items }) {
  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed === true).length;
  const percentPacked = Math.round((packedItems / numItems) * 100);

  return (
    <footer className="stats">
      {packedItems === 0 &&
        "Starting adding some items to your packing list! 🗒️"}
      {percentPacked < 100 &&
        packedItems > 0 &&
        `You have ${numItems} items on your list, you have 
      ${
        packedItems > 0 ? "already packed " + packedItems : "packed no"
      } items (${packedItems > 0 ? percentPacked : 0}% packed)`}
      {percentPacked === 100 && "All packed and ready to go! ✈️ 🌴"}
    </footer>
  );
}

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
    // cant mutate in react - always need a new array so cant use push
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClear() {
    setItems([]);
  }

  // lifted state from form
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClear={handleClear}
      />
      <Stats items={items} />
    </div>
  );
}
