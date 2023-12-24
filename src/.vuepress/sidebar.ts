import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "攻防相关",
      icon: "laptop-code",
      prefix: "AD/",
      link: "AD/",
      children: "structure",
    },
    {
      text: "代码审计",
      icon: "laptop-code",
      prefix: "CodeAudittutorial/",
      link: "CodeAudittutorial/",
      children: "structure",
    },
    {
      text: "漏洞复现",
      icon: "laptop-code",
      prefix: "Vulnerability/",
      link: "Vulnerability/",
      children: "structure",
    },
    {
      text: "其他随笔",
      icon: "laptop-code",
      prefix: "others/",
      link: "others/",
      children: "structure",
    },
  ],
});
