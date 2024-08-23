import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
