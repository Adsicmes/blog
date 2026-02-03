---
title: 2026.01 AI 编程工具使用分享
published: 2026-02-02
description: "从 Qoder 转向 Cursor、OpenCode + Oh My OpenCode、Codex + Right Code 的体验，以及 js-reverse MCP 辅助 Web 逆向的使用心得"
# image: "./cover.jpeg"
tags: ["AI", "经验分享"]
category: 经验分享
draft: false
---

上一篇：[2025.12 AI 使用总结](/posts/ai-summary-2025-12/)

继上次编写 AI 总结后，由于有些忍受不了 qoder 的界面 bug，我开始探索其他的方案。

## Cursor

在闲鱼上我找到了低价 Cursor 方案，把价格压得很低，尝试之后，发现现在的 Cursor 确实非常好用，在我心里仍然是 AI IDE 中的第一位。我使用了 js-reverse MCP 来辅助做 Web 逆向，它改进自 chrome-devtools-mcp，专门针对 JS 逆向做了优化，可以让 AI 编码助手调试、分析页面里的 JavaScript，比如断点、Hook 函数、看调用栈这些，用下来对逆向分析挺有帮助。

::github{repo="zhizhuodemao/js-reverse-mcp"}

## OpenCode + Oh My OpenCode

同时我还拥有 packycode 这种第三方的中转站，并且当时我也在使用 Claude Code。在之后，我又重新用起了 [OpenCode](https://opencode.ai/)，原因是 OpenCode 支持更好的扩展，对于 Agent 编排上更加简单。

OpenCode 的生态中最近出现了一个叫 **Oh My OpenCode** 的插件，了解这个插件是因为 Anthropic 将 oh-my-opencode 作为封锁 OpenCode 的理由，很多 Anthropic 用户都因为第三方工具遭到限制。

::github{repo="code-yeongyu/oh-my-opencode"}

::github{repo="anomalyco/opencode"}

在深度使用 OpenCode 搭配 Oh My OpenCode 后，真的不得不赞叹，**OpenCode + OMO** 的搭配真的很厉害，能够很高效精确地执行我的任务。自己在使用过程中唯二的缺点就是需要 Anthropic、OpenAI 和 Google Gemini 三家的模型才能做到完全体，以及消耗的 token 真的很大。但这丝毫不影响这个搭配是一个很棒的组合。

## Codex 与 Right Code

后来我去用了 Codex，将 OMO 全部 Agent 的模型都换成了 [Right Code](https://right.codes/) 的包月 GPT 5.2，可能是由于提供商的原因效率上有不小的降低，但准确性上比之前不会落下太多。

## 关于 Qoder

之后可能，有可能不太会继续用 qoder 了，当然不得不说 qoder 的 wiki 功能挺好用的，但是好像整体快要涨价了。
