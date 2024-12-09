import { hopeTheme } from "vuepress-theme-hope";
import { Navbar } from "./navbar.js";
import { Sidebar } from "./sidebar.js";

export default hopeTheme({
  // hostname: "https://vuepress-theme-hope-docs-demo.netlify.app",

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
    // You should generate and use your own comment service
    // comment: {
    //   provider: "Giscus",
    //   repo: "vuepress-theme-hope/giscus-discussions",
    //   repoId: "R_kgDOG_Pt2A",
    //   category: "Announcements",
    //   categoryId: "DIC_kwDOG_Pt2M4COD69",
    // },

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
    searchPro:{
      indexContent: true,
    },
    // sitemap:{
    //   devHostname: "https://echo0d.github.io/",
    //   hostname: "https://echo0d.github.io/",
    // },

    feed:{
      rss: true,
      atom: true,
      json: true,
      hostname: "https://echo0d.github.io/",
    }
    
    }

    
  },
);
