import { navbar } from "vuepress-theme-hope";

let AD = {
  text: "攻防相关",
  icon: "laptop-code",
  prefix: "AD/",
  link: "/AD/",
  // children: "structure",
};
let CodeAudittutorial={
  text: "代码审计",
  icon: "laptop-code",
  prefix: "CodeAudittutorial/",
  link: "/CodeAudittutorial/",
  // children: "structure",
};
// let Vulnerability={
//   text: "漏洞复现",
//   icon: "laptop-code",
//   prefix: "Vulnerability/",
//   link: "/Vulnerability/",
//   // children: "structure",
// };
let others={
  text: "其他随笔",
  icon: "laptop-code",
  prefix: "others/",
  link: "/others/",
  // children: "structure",
};

export const Navbar = navbar([
  AD, 
  CodeAudittutorial,
  // Vulnerability,
  others,
]);