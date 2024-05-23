import { useState } from "react";
import "tailwindcss/tailwind.css";

function Logo() {
  return (
    <h1 className="text-8xl font-monoton text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 text-center py-6 tracking-tighter">
      👣 Travel Track 🧳
    </h1>
  );
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return; // guard clause;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <div className="bg-gray-900 py-7 flex items-center justify-center gap-2">
      <form className="flex items-center gap-4" onSubmit={handleSubmit}>
        <h3 className="text-2xl text-gray-300">What do you need to pack?</h3>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="bg-gray-700 text-white rounded-full py-2 px-4 font-semibold"
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-700 text-white rounded-full py-2 px-4 font-semibold"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full py-2 px-8 font-semibold uppercase">
          Add
        </button>
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
    <div className="bg-gray-900 py-10 flex flex-col items-center gap-8 flex-grow">
      <ul className="w-4/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedItems.map((item) => (
          <Item
            packingItem={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="flex items-center gap-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-gray-700 text-white rounded-full py-2 px-4 font-semibold"
        >
          <option value="input">Sort by - Input Order</option>
          <option value="description">Sort by - Description</option>
          <option value="packed">Sort by - Packed Status</option>
        </select>
        <button
          onClick={onClear}
          className="bg-red-600 hover:bg-red-700 text-white rounded-full py-2 px-8 font-semibold uppercase"
        >
          Clear List
        </button>
      </div>
    </div>
  );
}

function Item({ packingItem, onDeleteItem, onToggleItem }) {
  return (
    <li className="flex justify-between items-center gap-4 bg-gray-800 text-white rounded-lg p-4 max-w-48">
      <input
        type="checkbox"
        checked={packingItem.packed}
        onChange={() => onToggleItem(packingItem.id)}
        className="h-6 w-6 accent-blue-500"
      />
      <span className={packingItem.packed ? "line-through" : ""}>
        {packingItem.quantity} {packingItem.description}
      </span>
      <button
        onClick={() => onDeleteItem(packingItem.id)}
        className="text-gray-400 hover:text-gray-200"
      >
        &times;
      </button>
    </li>
  );
}

function Stats({ items }) {
  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentPacked = Math.round((packedItems / numItems) * 100);

  return (
    <footer className="bg-blue-600 text-white text-center font-semibold py-8">
      {packedItems === 0
        ? "Start adding some items to your packing list! 🗒️"
        : percentPacked < 100
        ? `You have ${numItems} items on your list, you have already packed ${packedItems} (${percentPacked}% packed)`
        : "All packed and ready to go! ✈️ 🌴"}
    </footer>
  );
}

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
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
    const confirmed = window.confirm(
      "Are you sure you want to clear your packing list?"
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
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
