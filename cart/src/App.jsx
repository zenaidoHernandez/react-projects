import { useState, useEffect } from "react";
import { Header, Footer, Guitar } from "./components";
import { db } from "./data/db";

function App() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

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

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function removeFromCart(itemId) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  }

  function updateItemQuantity(item, delta) {
    const itemToUpdate = cart.findIndex((cartItem) => cartItem.id === item.id);
    const updatedCart = [...cart];
    const newQuantity = updatedCart[itemToUpdate].quantity + delta;

    if (newQuantity !== 0) {
      updatedCart[itemToUpdate] = {
        ...updatedCart[itemToUpdate],
        quantity: newQuantity,
      };
      setCart(updatedCart);
    } else {
      removeFromCart(item.id);
    }
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        updateItemQuantity={updateItemQuantity}
        clearCart={clearCart}
      ></Header>
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
