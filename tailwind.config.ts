import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        "primary-100": "#1B1A55",
        
        "neutral-100": "#EEEEEE",
        "neutral-200": "#535C91",
        "neutral-300": "#070F2B",
        "neutral-400": "#12114C"
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};
export default config;
