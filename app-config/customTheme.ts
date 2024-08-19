import { createTheme } from "@mui/material";
import { Roboto, Concert_One, Pacifico } from "next/font/google";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// fontの呼び出し方がわかんない
// いったんこれで対処: __Concert_One_252401
const concertOne = Concert_One({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

// fontの呼び出し方がわかんない
// いったんこれで対処: __Pacifico_335c89
const pacifico = Pacifico({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#009688",
      light: "#B2DFDB",
      dark: "#00796B",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#CDDC39",
      light: "#F0F4C3",
      dark: "#AFB42B",
      contrastText: "#212121",
    },
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1080,
      desktop: 1920,
    },
  },
  typography: {
    fontFamily: [
      roboto.style.fontFamily,
      concertOne.style.fontFamily,
      pacifico.style.fontFamily,
    ].join(","),
  },
});
export default customTheme;
