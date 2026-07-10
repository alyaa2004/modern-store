import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import api from "../services/api";

import {
  Avatar,
  Box,
  Button,
  Container,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/register", {
        email,
        password,
          fullName,
      });

      alert(response.data.message);

      navigate("/login");
    } catch (err) {
      // @ts-ignore
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={8}
        sx={{
          mt: 5,
          p: 5,
          borderRadius: 4,
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Avatar
            sx={{
              bgcolor: "success.main",
              width: 60,
              height: 60,
            }}
          >
            <PersonAddIcon />
          </Avatar>

          <Typography variant="h4" fontWeight="bold">
            Create Account
          </Typography>

          <Typography color="text.secondary">
            Register to start shopping
          </Typography>

          <TextField
            fullWidth
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </Button>

          <Box>
            <Typography display="inline">
              Already have an account?
            </Typography>

            <Link
              component={RouterLink}
              to="/login"
              underline="none"
              sx={{ ml: 1 }}
            >
              Login
            </Link>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}