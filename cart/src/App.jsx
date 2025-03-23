import { useState } from "react";
import { Header, Footer, Guitar } from "./components";
import { db } from "./data/db";

function App() {
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    const itemExist = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (itemExist >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemExist] = {
        ...updatedCart[itemExist],
        quantity: updatedCart[itemExist].quantity + 1,
      };
      setCart(updatedCart);
    } else {
      const newItem = { ...item, quantity: 1 };
      setCart((prevCart) => [...prevCart, newItem]);
    }
  }
  function removeFromCart(itemId) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  }
  return (
    <>
      <Header cart={cart} removeFromCart={removeFromCart}></Header>
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              guitar={guitar}
              key={guitar.id}
              addToCart={addToCart}
            ></Guitar>
          ))}
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
