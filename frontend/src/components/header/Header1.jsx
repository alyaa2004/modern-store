import { useContext, useState } from "react";
import { ColorModeContext } from "../../theme";
import {
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import {
  DarkModeOutlined,
  ExpandMore,
  LightModeOutlined,
} from "@mui/icons-material";

import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const options = ["AR", "EN"];

const Header1 = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        bgcolor: "#2B3445",
        py: 1,
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4,
      }}
    >
      <Container>
        <Stack
          direction={isMobile ? "column" : "row"}
          alignItems="center"
          justifyContent="space-between"
          spacing={isMobile ? 1 : 0}
        >
          {/* Left Side */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            flexWrap="wrap"
            justifyContent="center"
          >
            <Typography
              sx={{
                px: 1.5,
                py: 0.5,
                bgcolor: "#D23F57",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              HOT
            </Typography>

            <Typography
              sx={{
                fontSize: "12px",
                color: "#fff",
              }}
            >
              {isMobile ? "Free Shipping" : "Free Express Shipping"}
            </Typography>
          </Stack>

          {/* Right Side */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton
              onClick={() => {
                localStorage.setItem(
                  "mode",
                  theme.palette.mode === "dark" ? "light" : "dark"
                );
                colorMode.toggleColorMode();
              }}
              color="inherit"
              size="small"
            >
              {theme.palette.mode === "light" ? (
                <LightModeOutlined
                  sx={{ fontSize: 18, color: "#fff" }}
                />
              ) : (
                <DarkModeOutlined
                  sx={{ fontSize: 18, color: "#fff" }}
                />
              )}
            </IconButton>

            <List sx={{ p: 0 }}>
              <ListItem
                sx={{
                  px: 0,
                  cursor: "pointer",
                }}
                onClick={handleClickListItem}
              >
                <ListItemText
                  secondary={options[selectedIndex]}
                  sx={{
                    ".MuiTypography-root": {
                      fontSize: "12px",
                      color: "#fff",
                    },
                  }}
                />
                <ExpandMore
                  sx={{
                    color: "#fff",
                    fontSize: 18,
                  }}
                />
              </ListItem>
            </List>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={selectedIndex === index}
                  onClick={(event) =>
                    handleMenuItemClick(event, index)
                  }
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>

            {!isMobile && (
              <>
                <TwitterIcon
                  sx={{
                    fontSize: 18,
                    color: "#fff",
                    cursor: "pointer",
                  }}
                />

                <FacebookIcon
                  sx={{
                    fontSize: 18,
                    color: "#fff",
                    cursor: "pointer",
                  }}
                />

                <InstagramIcon
                  sx={{
                    fontSize: 18,
                    color: "#fff",
                    cursor: "pointer",
                  }}
                />
              </>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Header1;