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
let Programming=[{
  text: "编程技术",
  link: "/Programming/",
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
"/Programming/":Programming,
"/others/":others
});