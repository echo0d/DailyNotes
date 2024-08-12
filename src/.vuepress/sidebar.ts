import { sidebar } from "vuepress-theme-hope";

let CyberSecurity = [
  { text: "网络安全",
  link: "/CyberSecurity/",
  children: "structure",
}
];


let CodeAudittutorial=[{
  text: "代码审计",
  link: "/CodeAudittutorial/",
  children: "structure",
}
];
let develop=[{
  text: "开发技术",
  link: "/develop/",
  children: "structure",
}];
let others=[{
  text: "其他随笔",
  link: "/others/",
  children: "structure",
}];

export const Sidebar = sidebar({
"/CyberSecurity/":CyberSecurity,
"/CodeAudittutorial/":CodeAudittutorial,
"/develop/":develop,
"/others/":others
});