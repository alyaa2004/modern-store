import {
  Avatar,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper
        elevation={4}
        sx={{
          p: 5,
          borderRadius: 4,
        }}
      >
        <Stack
          spacing={3}
          alignItems="center"
        >
          <Avatar
            sx={{
              width: 90,
              height: 90,
            }}
          >
            <PersonIcon fontSize="large" />
          </Avatar>

          <Typography variant="h4">
            {user.fullName}
          </Typography>

          <Typography color="text.secondary">
            {user.email}
          </Typography>

          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/my-orders")}
          >
            My Orders
          </Button>

          <Button
            fullWidth
            color="error"
            variant="outlined"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/");
              window.location.reload();
            }}
          >
            Logout
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}