---
title: 2026.02 AI 编程工具使用分享
published: 2026-03-02
description: "分享 2026.02 的 AI 工具使用重心：Cursor Skill、Oh My OpenCode 二月更新、AstrBot 上的实践，以及自主 Agent（如 OpenClaw）的尝鲜与现状判断。"
# image: "./cover.jpeg"
tags: ["AI", "经验分享"]
category: 经验分享
draft: false
---

上一篇：[2026.01 AI 编程工具使用分享](/posts/ai-summary-2026-01/)

继上个月用上 OpenCode + OMO 和 Cursor 之后，二月份我主要泡在 **Skill**、**Oh My OpenCode** 的更新，以及 **AstrBot** 上。另外在 OpenClaw 这类自主 Agent 上折腾了一阵，结论是部署和配置难度不小，目前也还不够成熟，暂时觉得实际用处不大。

## 本月用得最多的：Cursor Skill

这个月花在 Cursor **Agent Skills** 上的时间最多。和项目里的 `.cursorrules` 不一样，Rules 更多是定义「怎么写代码」——编码风格、项目约定；**Skills** 则是「做什么、怎么做」——把领域知识和工作流打成包，让 Agent 需要时自己加载。

Skill 放在项目目录 `.cursor/skills/` 或全局 `~/.cursor/skills/` 都行，一个 Skill 一个文件夹，里面必须有 `SKILL.md`，用 frontmatter 写 `name` 和 `description`，Agent 会靠 description 判断什么时候用这个 Skill。我把自己常用的规范、Git 流程、项目 hooks 之类拆成好几个 Skill，在 Agent 里用 `Cmd + I` 时会自动发现并选用，也可以手动 `/skill-name` 调用。用多了就发现，把重复的「怎么做事」沉淀成 Skill 之后，下指令省心不少，Token 也更可控。

Cursor 的 Skills 是开放标准，在 Cursor 里写的 Skill 也能给 Claude Code 等支持同一标准的工具用，这点挺友好。想系统了解可以看 [Cursor 官方文档 - Agent Skills](https://cursor.com/docs/context/skills)。

## Oh My OpenCode 二月更新

OMO 二月更新很勤，从 v3.6 一路到 v3.9 附近，改动不少。我印象深的有：**SQLite 后端**全面支持、各个 Agent（Atlas、Metis、Momus 等）的显示名称、后台任务可见性更好；后面又加了实验性的 **Hashline Edit**（带哈希校验的文件编辑）、**Playwright CLI** 做浏览器自动化；新版本里还给 Sisyphus、Prometheus、Atlas 等代理加了 Gemini 优化提示词，Grep 输出和 Hashline 编辑的体验也有改进等等。

::github{repo="code-yeongyu/oh-my-opencode"}

## AstrBot 上我也用了一阵

除了 IDE 里的 AI，二月份我也在 **AstrBot** 上花了一些时间。它是开源的多平台 AI 助手，能接 QQ、微信、Telegram、Discord 等，自带 Agent 编排、知识库和插件生态。

我主要用它的知识库和 Agent：配好 Embedding 和知识库之后，把项目文档、规范丢进去，在对应平台里对话时让助手带着知识库回答；插件生态里现成能力不少，按需装就行。部署上 Docker 或一键安装都挺友好，比自建一套 IM + 知识库省事多了。

::github{repo="AstrBotDevs/AstrBot"}

## 关于 OpenClaw 这类自主 Agent

像 **OpenClaw** 这种「能 24/7 自己跑、处理收件箱、自动执行任务」的 Agent，我二月也研究并试着部署过。多平台接入、本地/云模型可选、技能用 Markdown + YAML 扩展，概念上很吸引人。

实际搞下来，部署和配置难度不低。安装脚本虽然能一条命令跑起来，但真想拿来用往往得上 Docker 或 VPS，安全、网关、频道、技能一堆模块都要摸一遍，文档多而杂，稍不留神就配错。而且现在生态和稳定性都还在快速变，经常得跟着版本调配置。所以我目前的结论是：概念挺先进，但部署和运维成本高，成熟度还不足以当主力用，暂时只当尝鲜、跟跟方向，日常干活还是以 Cursor + OpenCode/OMO 为主。

::github{repo="openclaw/openclaw"}

## 结语

二月的重心说白了就是：把「怎么做」沉淀成 Skill，把 OMO 和 AstrBot 用熟，对自主 Agent 保持关注但别押太多宝。工具一直在变，思路不变——把手头已经稳的组合用好，精力放在业务和架构上；新东西先小范围试，再决定要不要进主流程。

:::tip
你说得对，这篇文章都是用 AI 进行润色辅助编写的，我只把内容丢了进去
:::
