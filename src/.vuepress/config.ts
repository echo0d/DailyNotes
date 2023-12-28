import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  base: "/DailyNotes/",

  lang: "zh-CN",
  title: "echo0d'notes",
  description: "echo0d'notes-vuepress",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
  plugins: [
    searchProPlugin({
    }),
  ],
});
