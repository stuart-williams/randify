import "isomorphic-unfetch";
import "@testing-library/jest-dom/extend-expect";

require("dotenv").config({
  path: ".env.local.example",
});

process.env.API_URL = process.env.VERCEL_URL + "/api";
