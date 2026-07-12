import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";

import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";

import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/cartSlice";

const Main = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <>
     <Container
  id="products"
  sx={{
    py: 8,
    scrollMarginTop: "100px",
  }}
>
        <Box sx={{ mb: 5, textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold">
            Our Products
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
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
                  width: {
                    xs: "100%",
                    sm: 300,
                    md: 320,
                  },
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 4,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "0.3s",
                  boxShadow: 2,

                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  sx={{
                    height: {
                      xs: 220,
                      sm: 260,
                      md: 300,
                    },
                    objectFit: "cover",
                  }}
                />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    noWrap
                  >
                    {product.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      minHeight: 42,
                    }}
                  >
                    {product.description}
                  </Typography>

                  <Typography
                    variant="h5"
                    color="primary"
                    fontWeight="bold"
                    sx={{ mt: 2 }}
                  >
                    ${product.price}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Category: {product.category}
                  </Typography>

                  <Typography variant="body2">
                    Stock: {product.stock}
                  </Typography>
                </CardContent>

                <CardActions sx={{ p: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AddShoppingCartOutlinedIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(addToCart(product));
                      setOpenSnackbar(true);
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            ))
          )}
        </Stack>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setOpenSnackbar(false)}
          sx={{ width: "100%" }}
        >
          Product added to cart successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Main;