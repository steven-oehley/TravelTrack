export function Item({ packingItem, onDeleteItem, onToggleItem }) {
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
