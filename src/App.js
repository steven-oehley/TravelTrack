const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

function Logo() {
  return <h1>👣 Travel Track 🧳</h1>;
}
function Form() {
  return (
    <div className="add-form">
      <form className="add-form">
        <h3>What do you need to pack?</h3>
        <select name="" id="">
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
        <input type="text" placeholder="Item...." />
        <button>Add</button>
      </form>
    </div>
  );
}
function PackList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item packingItem={item}></Item>
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
    <footer class="stats">
      You have X items on your list, you have already packed X (X%)
    </footer>
  );
}

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackList />
      <Stats />
    </div>
  );
}
