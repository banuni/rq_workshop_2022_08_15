import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

//#region types
interface Item {
  name: string;
  price: number;
  cooks?: string[];
}
//#endregion

const ITEMS_Q_NAME = "items";
// general hooks.ts
const useItems = (cookName: string, enabled: boolean) =>
  useQuery<Item[]>(
    [ITEMS_Q_NAME],
    () => fetch(`/api/items?cook=${cookName}`).then((r) => r.json()),
    { enabled }
  );

export const MenuComponent: React.FC<{ cook: string }> = ({ cook }) => {
  const qc = useQueryClient();
  const [enableQuery, setEnableQuery] = useState(false);
  //#region form stuff...
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const { mutate: addItem } = useMutation(
    ({ newName, newPrice }: any) => {
      if (newName && newPrice) {
        return fetch("/api/items", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ name: newName, price: newPrice, cook }),
        }).then((r) => r.json());
      }
    },
    {
      onSuccess: (data) => {
        qc.setQueryData(ITEMS_Q_NAME, (oldData: Item[]) => [...oldData, data]);
        setNewPrice("");
        setNewName("");
      },
    }
  );
  //#endregion
  const { data: items, isLoading, isFetching } = useItems(cook, enableQuery);

  return (
    <>
      <h2>
        {`Welcome to ${cook}'s Hummusia`} {isFetching && "♻️"}
      </h2>
      <button onClick={() => setEnableQuery(true)}>GO GO GO GO</button>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        items?.map((item) => (
          <div key={item.name}>
            {item.name} - {item.price}
          </div>
        ))
      )}

      {
        //#region more form stuff
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
        <button onClick={() => addItem({ newName, newPrice })}>Add!</button>
      </div>
      {
        //#endregion
      }
    </>
  );
};
