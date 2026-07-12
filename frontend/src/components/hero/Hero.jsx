import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./slider.css";
import IconSection from "./IconSection";

const mySlider = [
  {
    text: "MEN",
    link: "./images/banner-15.jpg",
  },
  {
    text: "WOMEN",
    link: "./images/banner-25.jpg",
  },
];

export default function Hero() {
  const theme = useTheme();

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          pt: 2,
          mt: 2,
          display: "flex",
          flexDirection: {
            xs: "column",
            lg: "row",
          },
          gap: 2,
        }}
      >
        {/* Main Slider */}
        <Box sx={{ flex: 1 }}>
          <Swiper
            loop
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {mySlider.map((item) => (
              <SwiperSlide key={item.link}>
                <Box className="parent-slider">
                  <img src={item.link} alt={item.text} />

                  <Box
                    sx={{
                      position: {
                        xs: "static",
                        sm: "absolute",
                      },
                      top: {
                        sm: "50%",
                      },
                      left: {
                        sm: "8%",
                      },
                      transform: {
                        sm: "translateY(-50%)",
                      },
                      px: {
                        xs: 2,
                        sm: 0,
                      },
                      py: {
                        xs: 3,
                        sm: 0,
                      },
                      textAlign: {
                        xs: "center",
                        sm: "left",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#222",
                        fontSize: {
                          xs: 18,
                          sm: 22,
                          md: 26,
                        },
                      }}
                    >
                      LIFESTYLE COLLECTION
                    </Typography>

                    <Typography
                      sx={{
                        color: "#222",
                        fontWeight: 600,
                        my: 1,
                        fontSize: {
                          xs: "2rem",
                          sm: "3rem",
                          md: "4rem",
                        },
                      }}
                    >
                      {item.text}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent={{
                        xs: "center",
                        sm: "flex-start",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#333",
                          fontSize: {
                            xs: 24,
                            md: 36,
                          },
                        }}
                      >
                        SALE UP TO
                      </Typography>

                      <Typography
                        sx={{
                          color: "#D23F57",
                          fontSize: {
                            xs: 24,
                            md: 36,
                          },
                          fontWeight: "bold",
                        }}
                      >
                        30% OFF
                      </Typography>
                    </Stack>

                    <Typography
                      sx={{
                        color: "#444",
                        mt: 1,
                        fontSize: {
                          xs: 14,
                          sm: 16,
                        },
                      }}
                    >
                      Get Free Shipping on orders over $99.00
                    </Typography>

                    <Button
                      variant="contained"
                      sx={{
                        mt: 3,
                        px: 5,
                        py: 1,
                        bgcolor: "#222",
                        borderRadius: 1,
                        "&:hover": {
                          bgcolor: "#111",
                        },
                      }}
                    >
                      Shop Now
                    </Button>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        {/* Side Banners */}
        <Box
          sx={{
            width: {
              lg: "30%",
            },
            display: {
              xs: "none",
              lg: "flex",
            },
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Banner 1 */}
          <Box sx={{ position: "relative" }}>
            <img src="./images/banner-17.jpg" alt="" width="100%" />

            <Stack
              sx={{
                position: "absolute",
                left: 25,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <Typography fontSize={18}>NEW ARRIVALS</Typography>

              <Typography variant="h6">
                SUMMER
              </Typography>

              <Typography variant="h6">
                SALE 20% OFF
              </Typography>

              <Link
                href="#"
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: .5,
                  mt: 1,
                  color: "#222",
                  "&:hover": {
                    color: "#D23F57",
                  },
                }}
              >
                Shop Now
                <ArrowForwardIcon sx={{ fontSize: 14 }} />
              </Link>
            </Stack>
          </Box>

          {/* Banner 2 */}
          <Box sx={{ position: "relative" }}>
            <img src="./images/banner-16.jpg" alt="" width="100%" />

            <Stack
              sx={{
                position: "absolute",
                left: 25,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <Typography fontSize={18}>
                GAMING 4K
              </Typography>

              <Typography variant="h6">
                DESKTOPS &
              </Typography>

              <Typography variant="h6">
                LAPTOPS
              </Typography>

              <Link
                href="#"
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: .5,
                  mt: 1,
                  color: "#222",
                  "&:hover": {
                    color: "#D23F57",
                  },
                }}
              >
                Shop Now
                <ArrowForwardIcon sx={{ fontSize: 14 }} />
              </Link>
            </Stack>
          </Box>
        </Box>
      </Box>

      <IconSection />
    </Container>
  );
}