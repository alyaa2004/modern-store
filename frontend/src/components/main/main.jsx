import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";

const Main = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { search } = useSearch();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (err) {
      setError("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // البحث بالاسم أو التصنيف
  const filteredProducts = products.filter((product) => {
    const keyword = search.toLowerCase();

    return (
      product.title.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword)
    );
  });

  if (loading) {
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 10 }}>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Our Products
        </Typography>

        <Typography color="text.secondary">
          Browse our latest collection
        </Typography>
      </Box>

      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        gap={3}
      >
        {filteredProducts.length === 0 ? (
          <Box
            sx={{
              width: "100%",
              py: 10,
              textAlign: "center",
            }}
          >
            <Typography variant="h5">
              No products found
            </Typography>

            <Typography color="text.secondary">
              Try another search keyword.
            </Typography>
          </Box>
        ) : (
          filteredProducts.map((product) => (
            <Card
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
              sx={{
                width: 320,
                borderRadius: 3,
                cursor: "pointer",
                transition: "0.3s",

                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 8,
                },
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={product.image}
                alt={product.title}
              />

              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {product.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {product.description}
                </Typography>

                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  ${product.price}
                </Typography>

                <Typography variant="body2">
                  Category: {product.category}
                </Typography>

                <Typography variant="body2">
                  Stock: {product.stock}
                </Typography>
              </CardContent>

              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<AddShoppingCartOutlinedIcon />}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          ))
        )}
      </Stack>
    </Container>
  );
};

export default Main;