
import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./slider.css";
import IconSection from "./IconSection";

const mySlider = [
  { text: "MEN", link: "./images/banner-15.jpg" },
  { text: "WOMEN", link: "./images/banner-25.jpg" },
];

export default function Hero() {
  const scrollToProducts = () => {
    const section = document.getElementById("products");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          pt: 2,
          mt: 2,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 2,
          alignItems: "stretch",
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Swiper
            loop
            pagination={{ dynamicBullets: true }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {mySlider.map((item) => (
              <SwiperSlide key={item.link}>
                <Box className="parent-slider">
                  <img src={item.link} alt={item.text} />
                  <Box
                    sx={{
                      position: { xs: "static", sm: "absolute" },
                      top: { sm: "50%" },
                      left: { sm: "8%" },
                      transform: { sm: "translateY(-50%)" },
                      px: { xs: 2, sm: 0 },
                      py: { xs: 3, sm: 0 },
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    <Typography sx={{ color: "#222", fontSize: { xs: 18, sm: 22, md: 26 } }}>
                      LIFESTYLE COLLECTION
                    </Typography>
                    <Typography sx={{ color: "#222", fontWeight: 600, my: 1, fontSize: { xs: "2rem", sm: "3rem", md: "4rem" } }}>
                      {item.text}
                    </Typography>

                    <Stack direction="row" spacing={1} justifyContent={{ xs: "center", sm: "flex-start" }}>
                      <Typography sx={{ color: "#333", fontSize: { xs: 24, md: 36 } }}>
                        SALE UP TO
                      </Typography>
                      <Typography sx={{ color: "#D23F57", fontWeight: "bold", fontSize: { xs: 24, md: 36 } }}>
                        30% OFF
                      </Typography>
                    </Stack>

                    <Typography sx={{ mt: 1, color: "#444" }}>
                      Get Free Shipping on orders over $99.00
                    </Typography>

                    <Button
                      variant="contained"
                      onClick={scrollToProducts}
                      sx={{
                        mt: 3,
                        px: 5,
                        py: 1,
                        bgcolor: "#222",
                        "&:hover": { bgcolor: "#111" },
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

        <Box
          sx={{
            width: { xs: "100%", lg: 320 },
            flexShrink: 0,
            display: { xs: "none", lg: "flex" },
            flexDirection: "column",
            gap: 2,
          }}
        >
          {[
            {
              img: "./images/banner-17.jpg",
              t1: "NEW ARRIVALS",
              t2: "SUMMER",
              t3: "SALE 20% OFF",
            },
            {
              img: "./images/banner-16.jpg",
              t1: "GAMING 4K",
              t2: "DESKTOPS &",
              t3: "LAPTOPS",
            },
          ].map((b) => (
            <Box key={b.img} sx={{ position: "relative" }}>
              <img src={b.img} alt="" width="100%" />
              <Stack sx={{ position: "absolute", left: 25, top: "50%", transform: "translateY(-50%)" }}>
                <Typography fontSize={18}>{b.t1}</Typography>
                <Typography variant="h6">{b.t2}</Typography>
                <Typography variant="h6">{b.t3}</Typography>
                <Link
                  component="button"
                  underline="none"
                  onClick={scrollToProducts}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mt: 1,
                    color: "#222",
                    "&:hover": { color: "#D23F57" },
                  }}
                >
                  Shop Now
                  <ArrowForwardIcon sx={{ fontSize: 14 }} />
                </Link>
              </Stack>
            </Box>
          ))}
        </Box>
      </Box>

      <IconSection />
    </Container>
  );
}
