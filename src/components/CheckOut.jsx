import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckOutForm } from "./CheckOutForm";

const stripPublicKey = loadStripe(
  "pk_test_51PaSRPRuSgD95vZVYJtHYr6Wq3IRHBRpv2iENo6IHm1c19pFDF4FNXVNoeSVhq0xSqxnnFgtlG1S9ottgsmFSK68006QwhRUhS"
);

export const CheckOut = () => {
  return (
    <div>
      <div>cart Total: $100</div>
      <hr />
      <Elements stripe={stripPublicKey}>
        <CheckOutForm />
      </Elements>
    </div>
  );
};
