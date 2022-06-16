const fsp = require("fs/promises");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

function frontmatter() {
  return `---
id: ${uuidv4()}
date: ${new Date().toUTCString()}
title: ${process.argv.slice(2).join(" ")}
description:
tags:
---
`;
}

async function generate() {
  const lowerName = process.argv
    .slice(2)
    .map((value) => value.toLowerCase())
    .join("-");
  const postPath = path.join(
    __dirname,
    "..",
    "data",
    "posts",
    `${lowerName}.mdx`
  );
  try {
    fs.accessSync(postPath, fs.constants.F_OK);
    console.error("\x1b[31m%s\x1b[0m", `Post: ${lowerName}.mdx is exists!`);
  } catch (error) {
    await fsp.writeFile(postPath, frontmatter());
    console.log(
      "\x1b[32m%s\x1b[0m",
      `SUCCESS`,
      ` Post: ${lowerName}.mdx created!`
    );
  }
}

generate();
