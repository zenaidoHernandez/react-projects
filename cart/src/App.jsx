import { useState } from "react";
import { Header, Footer, Guitar } from "./components";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header></Header>
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          <Guitar></Guitar>
          <Guitar></Guitar>
          <Guitar></Guitar>
          <Guitar></Guitar>
          <Guitar></Guitar>
          <Guitar></Guitar>
          <Guitar></Guitar>
          <Guitar></Guitar>
          <Guitar></Guitar>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
