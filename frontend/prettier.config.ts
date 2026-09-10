import { type Config } from "prettier";

const config: Config = {
  plugins: ["prettier-plugin-organize-imports"],
  trailingComma: "none",
  singleAttributePerLine: true
};

export default config;
