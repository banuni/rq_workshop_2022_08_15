import { useState, useEffect } from "react";

export const MenuComponent = ({ cook }) => {
  //#region formstuff...
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const addItem = async () => {
    if (newName && newPrice) {
      await fetch("/api/items", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: newName, price: newPrice, cook }),
      }).then((r) => r.json());
      setNewName("");
      setNewPrice("");
    }
  };
  //#endregion

  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`/api/items?`)
      .then((r) => r.json())
      .then((data) => setItems(data));
  }, []);
  return (
    <>
      <h2>{`Welcome to ${cook}'s Hummusia`}</h2>
      {items.map((item) => (
        <div key={item.name}>
          {item.name} - {item.price}
        </div>
      ))}

      {
        //#region more formstuff
      }
      <div>
        <h4> Add a new menu item:</h4>
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="new item name"
        />
        <input
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          placeholder="new item price"
        />
        <button onClick={addItem}>Add!</button>
      </div>
      {
        //#endregion
      }
    </>
  );
};
