import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import theme from "./theme";
// import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  base: "/DailyNotes/",

  lang: "zh-CN",
  title: "echo0d'notes",
  description: "echo0d'notes-vuepress",
  bundler: viteBundler(),
  // 主题配置
  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
  // plugins: [
  //   searchProPlugin({
  //   }),
  // ],
});
