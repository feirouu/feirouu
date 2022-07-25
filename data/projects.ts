type Link = {
  title: string;
  url: string;
};

type Timeline = {
  date: string;
  description: string;
};

export type Project = {
  name: string;
  description: string;
  link?: Link;
  timeline?: Array<Timeline>;
};

export const PROJECTS: Array<Project> = [
  {
    name: "noteink",
    description: "一个简单且优雅的博客平台，让您随时随地记录自己的灵感与想法。",
    link: {
      title: "note.ink",
      url: "https://note.ink",
    },
    timeline: [
      { date: "2020.12.08", description: "重构了所有UI，加入了深色模式。" },
      {
        date: "2019.03.22",
        description: "经过一番努力地coding，第一个版本上线。",
      },
    ],
  },
];
