import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import AddIcon from "@mui/icons-material/Add";

import RemoveIcon from "@mui/icons-material/Remove";

import { useDispatch, useSelector } from "react-redux";

import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../Redux/cartSlice";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
const navigate = useNavigate();
  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" mb={4}>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
          {cartItems.map((item) => (
            <Card
              key={item._id}
              sx={{
                display: "flex",
                mb: 3,
              }}
            >
              <CardMedia
                component="img"
                image={item.image}
                sx={{
                  width: 180,
                }}
              />

              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">
                  {item.title}
                </Typography>

                <Typography color="primary">
                  ${item.price}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  mt={2}
                >
                  <IconButton
                    onClick={() =>
                      dispatch(decreaseQuantity(item._id))
                    }
                  >
                    <RemoveIcon />
                  </IconButton>

                  <Typography>
                    {item.quantity}
                  </Typography>

                  <IconButton
                    onClick={() =>
                      dispatch(increaseQuantity(item._id))
                    }
                  >
                    <AddIcon />
                  </IconButton>
                </Stack>

                <Button
                  color="error"
                  startIcon={<DeleteIcon />}
                  sx={{ mt: 2 }}
                  onClick={() =>
                    dispatch(removeFromCart(item._id))
                  }
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}

          <Box mt={4}>
            <Typography variant="h5">
              Total: ${totalPrice}
            </Typography>
            <Button
  variant="contained"
  size="large"
  sx={{ mt: 3 }}
  onClick={() => navigate("/checkout")}
>
  Checkout
</Button>
          </Box>
        </>
      )}
    </Container>
  );
}