import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  config: {
    initialColorMode: "light",
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
  },
});
