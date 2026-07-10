import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../services/api";

import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { clearCart } from "../Redux/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

const placeOrder = async () => {
  if (!customerName || !phone || !address) {
    alert("Please fill all fields");
    return;
  }

  const token = localStorage.getItem("token");

  try {
    await api.post(
      "/orders",
      {
        customerName,
        phone,
        address,
        items: cartItems.map((item) => ({
          productId: item._id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        totalPrice,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(clearCart());

    alert("Order placed successfully");

    navigate("/");
  } catch (err) {
    console.log(err);

    alert(
      err.response?.data?.message ||
      err.message ||
      "Something went wrong"
    );
  }
};

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" mb={4}>
          Checkout
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="Full Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <TextField
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <TextField
            label="Address"
            multiline
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <Typography variant="h6">
            Total: ${totalPrice}
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={placeOrder}
          >
            Place Order
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}