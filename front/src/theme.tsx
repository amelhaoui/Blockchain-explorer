import { createTheme } from "@mui/material/styles";
import grey from "@mui/material/colors/grey";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f0f0f0",
      dark: "#677185",
    },
    secondary: {
      main: "#beaaff",
    },
  },
  typography: {
    fontFamily: ["Inter", "Helvetica", "sans-serif"].join(","),
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderBottom: "2px solid #2c232e",
          borderTop: "1px solid #2c232e",
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: "#f0f0f0",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#beaaff !important",
          },
        },
      },
    },
  },
});

export default theme;
