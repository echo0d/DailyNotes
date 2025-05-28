import { hopeTheme } from "vuepress-theme-hope";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

export default hopeTheme({
  hostname: "https://echo0d.github.io/",
  author: {
    name: "echo0d",
    url: "",
  },

  // 主题色选择器
  themeColor: true,

  iconAssets: "fontawesome-with-brands",

  logo: "logo.jpg",

  repo: "echo0d/DailyNotes",
  docsRepo: "echo0d/DailyNotes",

  docsDir: "src",

  // 导航栏
  navbar: Navbar,
  // 侧边栏
  sidebar: Sidebar,
  sidebarSorter: ["readme", "order", "filename", "title"],
  // 侧边标题深度
  headerDepth: 3,

  footer: "听君一席话，如听一席话",

  // 全屏
  fullscreen: true,

  displayFooter: true,

  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
    },
  },

  // page meta
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  plugins: {
    // All features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      codetabs: true,
      component: true,
      demo: true,
      figure: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
    },
    searchPro: {
      indexContent: true,
    },
    seo: true,
    sitemap: true,

    feed: {
      rss: true,
      atom: true,
      json: true,
      channel: {
        link: "https://echo0d.github.io/",
      },
    },
    blog: true,
  },
  blog: {
    avatar: "logo.jpg",
    name: "echo0d",
    description: "每天记录一点点",
    medias: {
      GitHub: "https://github.com/echo0d",
      Gitee: "https://gitee.com/echo0d",
      Rss: "https://echo0d.github.io/DailyNotes/rss",
    },
  },
});
