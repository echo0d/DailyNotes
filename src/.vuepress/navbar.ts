import { navbar } from "vuepress-theme-hope";

let CyberSecurity = {
  text: "网络安全",
  icon: "laptop-code",
  prefix: "CyberSecurity/",
  link: "/CyberSecurity/",
  // children: "structure",
};
let CodeAudittutorial={
  text: "代码审计",
  icon: "laptop-code",
  prefix: "CodeAudittutorial/",
  link: "/CodeAudittutorial/",
  // children: "structure",
};
let others={
  text: "其他随笔",
  icon: "laptop-code",
  prefix: "others/",
  link: "/others/",
  // children: "structure",
};
let develop={
  text: "开发技术",
  icon: "laptop-code",
  prefix: "develop/",
  link: "/develop/",
  // children: "structure",
};

export const Navbar = navbar([
  CyberSecurity, 
  CodeAudittutorial,
  develop,
  others,
]);