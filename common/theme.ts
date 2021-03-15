import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    green: {
      50: "#e0ffeb",
      100: "#b8f6cf",
      200: "#8eefb1",
      300: "#63e792",
      400: "#39e074",
      500: "#1DB954",
      600: "#149a45",
      700: "#096e30",
      800: "#00431b",
      900: "#001804",
    },
    gray: {
      50: "#d9d9d9",
      100: "#bfbfbf",
      200: "#a6a6a6",
      300: "#8c8c8c",
      400: "#737373",
      500: "#595959",
      600: "#404040",
      700: "#262626",
      800: "#0d0d0d",
      900: "#000000",
    },
  },
  styles: {
    global: {
      "html, body, #__next": {
        height: "100%",
        display: "flex",
        flexDirection: "column",
      },
    },
  },
});
