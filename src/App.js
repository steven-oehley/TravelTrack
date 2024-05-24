import { useState } from "react";
import "tailwindcss/tailwind.css";

import { Logo } from "./components/Logo";
import { Form } from "./components/Form";
import { PackList } from "./components/PackList";
import { Stats } from "./components/Stats";

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
