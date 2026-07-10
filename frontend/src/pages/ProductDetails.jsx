import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import api from "../services/api";
import { addToCart } from "../Redux/cartSlice";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

export default function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 8 }}>
      <Box
        sx={{
          display: "flex",
          gap: 5,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              borderRadius: 15,
            }}
          />
        </Box>

        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography variant="h4" fontWeight="bold">
            {product.title}
          </Typography>

          <Typography
            variant="h5"
            color="primary"
            sx={{ mt: 2 }}
          >
            ${product.price}
          </Typography>

          <Typography sx={{ mt: 3 }}>
            {product.description}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            Category: {product.category}
          </Typography>

          <Typography>
            Stock: {product.stock}
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 4 }}
            startIcon={<AddShoppingCartOutlinedIcon />}
            onClick={() => dispatch(addToCart(product))}
          >
            Add To Cart
          </Button>
        </Box>
      </Box>
    </Container>
  );
}