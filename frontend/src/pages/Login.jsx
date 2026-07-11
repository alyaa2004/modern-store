import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter your email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/login", {
        email,
        password,
      });

      alert(response.data.message);

      // حفظ المستخدم والـ Token داخل AuthContext و localStorage
      login(response.data.user, response.data.token);

      // الانتقال للصفحة الرئيسية
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Wrong email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={8}
        sx={{
          mt: 8,
          p: 5,
          borderRadius: 4,
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 60,
              height: 60,
            }}
          >
            <LockOutlinedIcon />
          </Avatar>

          <Typography variant="h4" fontWeight="bold">
            Welcome Back
          </Typography>

          <Typography color="text.secondary">
            Login to continue shopping
          </Typography>

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

          <Button
            fullWidth
            size="large"
            variant="contained"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Box>
            <Typography display="inline">
              Don't have an account?
            </Typography>

            <Link
              component={RouterLink}
              to="/register"
              underline="none"
              sx={{ ml: 1 }}
            >
              Register
            </Link>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}