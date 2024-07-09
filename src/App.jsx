import { useState } from "react";

import "./App.css";
import { CheckOut } from "./components/CheckOut";
import { CheckOutForm } from "./components/CheckOutForm";

const App = () => {
  return (
    <>
      <h1>Stripe Payment</h1>
      <hr />
      <CheckOut />
      <hr />
    </>
  );
};

export default App;
