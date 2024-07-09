import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

export const CheckOutForm = () => {
  const [form, setForm] = useState({});

  const stripe = useStripe();
  const element = useElements();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // 1. Initiate the payment
    const payload = {
      amount: 1000,
      currency: "Aud",
      paymentMethod: "card",
    };

    //call payment initiation api

    const apiEP = "http://localhost:3000/create-stripe-payment";
    const { data } = await axios.post(apiEP, payload);

    //capture clientsecret
    console.log(data.clientSecret);

    const response = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: element.getElement(CardElement),
        billing_details: {
          name: form.name,
          email: form.email,
        },
      },
    });
    console.log(response.paymentIntent);
    if (response.paymentIntent.status === "succeeded") {
      alert("payment successful");
      const confirmEP = "http://localhost:3000/confirm-order";
      const confirmResponse = await axios.post(
        confirmEP,
        response.paymentIntent
      );
      console.log(confirmResponse);
    }
    alert("payment failed");
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        Name:{" "}
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={handleOnChange}
        />
      </div>
      <div>
        Email:{" "}
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={handleOnChange}
        />
      </div>
      <div>
        {" "}
        <CardElement />
      </div>

      <div>
        <button type="submit">Sumbit</button>
      </div>
    </form>
  );
};
