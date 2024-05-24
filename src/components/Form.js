import { useState } from "react";

export function Form({ onAddItems }) {
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
