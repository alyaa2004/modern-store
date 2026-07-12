import {
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#2B3445",
        mt: 6,
        py: 3,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      }}
    >
      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          sx={{
            color: "#fff",
            textAlign: "center",
            fontSize: {
              xs: 14,
              sm: 16,
            },
          }}
        >
          Designed & Developed by{" "}
          <Typography
            component="span"
            sx={{
              color: "#ff7790",
              fontWeight: "bold",
            }}
          >
            Alyaa Al Ali
          </Typography>
        </Typography>

        <Stack direction="row" spacing={1}>
          <IconButton
            component="a"
            href="https://github.com/alyaa2004"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "#fff" }}
          >
            <GitHubIcon />
          </IconButton>

          <IconButton
            component="a"
            href="https://www.linkedin.com/in/alyaa-al-ali-51b4192b2"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "#0A66C2" }}
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>

        <Typography
          sx={{
            color: "#bbb",
            fontSize: {
              xs: 12,
              sm: 14,
            },
          }}
        >
          © {new Date().getFullYear()} Modern Store. All rights reserved.
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;