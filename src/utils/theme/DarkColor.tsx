import { createTheme } from "@mui/material/styles";
import { Plus_Jakarta_Sans } from "next/font/google";
import { plus } from "./DefaultColors";

const basedarkTheme = createTheme({
    direction: "ltr",
    palette: {
      primary: {
        main: "#5D87FF",
        light: "#ECF2FF",
        dark: "#4570EA",
      },
      secondary: {
        main: "#49BEFF",
        light: "#E8F7FF",
        dark: "#23afdb",
      },
      success: {
        main: "#13DEB9",
        light: "#E6FFFA",
        dark: "#02b3a9",
        contrastText: "#ffffff",
      },
      info: {
        main: "#539BFF",
        light: "#EBF3FE",
        dark: "#1682d4",
        contrastText: "#ffffff",
      },
      error: {
        main: "#FA896B",
        light: "#FDEDE8",
        dark: "#f3704d",
        contrastText: "#ffffff",
      },
      warning: {
        main: "#FFAE1F",
        light: "#FEF5E5",
        dark: "#ae8e59",
        contrastText: "#ffffff",
      },
      grey: {
        100: "#1c1f29",  // Darker grey for dark theme background
        200: "#2A3547",  // Slightly lighter dark grey
        300: "#353f54",  // Mid-tone grey
        400: "#7C8FAC",
        500: "#a0aec7",  // Lighter grey for text contrast
        600: "#D0D9E3",  // Lighter grey for borders/dividers
      },
      background: {
        default: "#121212",  // Dark background color
        paper: "#1e1e1e",    // Paper-like background color
      },
      text: {
        primary: "#E0E0E0",   // Light text color for better contrast
        secondary: "#A0A0A0", // Lighter secondary text
      },
      action: {
        disabledBackground: "rgba(73,82,88,0.12)",
        hoverOpacity: 0.08,  // Increased opacity for hover state
        hover: "#333d4f",    // Darker hover effect for dark theme
      },
      divider: "#404c65",    // Divider color for dark theme
    },
    typography: {
      fontFamily: plus.style.fontFamily,
      h1: {
        fontWeight: 600,
        fontSize: "2.25rem",
        lineHeight: "2.75rem",
        fontFamily: plus.style.fontFamily,
      },
      h2: {
        fontWeight: 600,
        fontSize: "1.875rem",
        lineHeight: "2.25rem",
        fontFamily: plus.style.fontFamily,
      },
      h3: {
        fontWeight: 600,
        fontSize: "1.5rem",
        lineHeight: "1.75rem",
        fontFamily: plus.style.fontFamily,
      },
      h4: {
        fontWeight: 600,
        fontSize: "1.3125rem",
        lineHeight: "1.6rem",
      },
      h5: {
        fontWeight: 600,
        fontSize: "1.125rem",
        lineHeight: "1.6rem",
      },
      h6: {
        fontWeight: 600,
        fontSize: "1rem",
        lineHeight: "1.2rem",
      },
      button: {
        textTransform: "capitalize",
        fontWeight: 400,
      },
      body1: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: "1.334rem",
      },
      body2: {
        fontSize: "0.75rem",
        letterSpacing: "0rem",
        fontWeight: 400,
        lineHeight: "1rem",
      },
      subtitle1: {
        fontSize: "0.875rem",
        fontWeight: 400,
      },
      subtitle2: {
        fontSize: "0.875rem",
        fontWeight: 400,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
            boxShadow:
              "rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px !important",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "7px",
            backgroundColor: "#2A3547",  // Dark background for card component
          },
        },
      },
    },
  });

  export { basedarkTheme };
