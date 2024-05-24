import { Item } from "./Item";
import { useState } from "react";

export function PackList({ items, onDeleteItem, onToggleItem, onClear }) {
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
