import { sidebar } from "vuepress-theme-hope";

let AD = [
  { text: "攻防相关",
  link: "/AD/",
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
"/AD/":AD,
"/CodeAudittutorial/":CodeAudittutorial,
"/develop/":develop,
"/others/":others
});