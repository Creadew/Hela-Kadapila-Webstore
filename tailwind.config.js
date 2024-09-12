import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  theme: {
    extend: {
      colors: {
        text: "#252525",
        background: "#fffcf5",
        primary: "#990210",
        secondary: "#e4b224",
        accent: "#e40000",

        adminText: "#e7f3fa",
        adminBackground: "#071720",
        adminPrimary: "#81c3e4",
        adminSecondary: "#166a9b",
        adminAccent: "#1da9fb",
      },
    },
  },
  plugins: [],
});
