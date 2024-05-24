export function Stats({ items }) {
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
