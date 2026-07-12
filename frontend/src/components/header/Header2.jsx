import {
  Badge,
  Container,
  IconButton,
  InputBase,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 30,
  border: "1px solid #ccc",
  display: "flex",
  alignItems: "center",
  width: "100%",

  "&:hover": {
    border: "1px solid #1976d2",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#777",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5),
    paddingLeft: `calc(1em + ${theme.spacing(5)})`,
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}));

export default function Header2() {
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { search, setSearch } = useSearch();

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Container sx={{ my: 3 }}>
      <Stack spacing={2}>
        {/* الصف الأول */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Logo */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <ShoppingCartOutlined color="primary" />

            <Typography
              variant={isMobile ? "h6" : "h5"}
              fontWeight="bold"
              color="primary"
            >
              Modern Store
            </Typography>
          </Stack>

          {/* User */}
          <Stack direction="row" spacing={2} alignItems="center">
            {user ? (
              <>
                {!isMobile && (
                  <>
                    <Typography
                      fontWeight="bold"
                      sx={{ cursor: "pointer" }}
                      onClick={() => navigate("/profile")}
                    >
                      Hi, {user.fullName}
                    </Typography>

                    <Typography
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          color: "#1976d2",
                        },
                      }}
                      onClick={() => navigate("/my-orders")}
                    >
                      My Orders
                    </Typography>

                    <Typography
                      color="error"
                      sx={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        navigate("/");
                        window.location.reload();
                      }}
                    >
                      Logout
                    </Typography>
                  </>
                )}

                {isMobile && (
                  <IconButton onClick={() => navigate("/profile")}>
                    <Person2OutlinedIcon />
                  </IconButton>
                )}
              </>
            ) : (
              <IconButton onClick={() => navigate("/login")}>
                <Person2OutlinedIcon />
              </IconButton>
            )}

            <IconButton onClick={() => navigate("/cart")}>
              <StyledBadge
                badgeContent={cartCount}
                color="primary"
              >
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Stack>
        </Stack>

        {/* البحث */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>

          <StyledInputBase
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Search>
      </Stack>
    </Container>
  );
}