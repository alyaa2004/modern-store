import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from "@mui/material";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" mb={4}>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography>You don't have any orders yet.</Typography>
      ) : (
        orders.map((order) => (
          <Card key={order._id} sx={{ mb: 3 }}>
            <CardContent>

              <Typography variant="h6">
                {order.customerName}
              </Typography>

              <Typography>
                Phone: {order.phone}
              </Typography>

              <Typography>
                Address: {order.address}
              </Typography>

              <Typography
                color="primary"
                mt={2}
              >
                Total: ${order.totalPrice}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {order.items.map((item) => (
                <Typography key={item._id}>
                  • {item.title} × {item.quantity}
                </Typography>
              ))}

            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}