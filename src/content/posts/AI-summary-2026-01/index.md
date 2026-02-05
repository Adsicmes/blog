---
title: 2026.01 AI 编程工具使用分享
published: 2026-02-02
description: "分享 2026.01 的 AI 工具折腾经历：从 Qoder 转向 Cursor 与 OpenCode + OMO 组合，探讨 Web 逆向实战，以及如何优化工作流来提升效能。"
# image: "./cover.jpeg"
tags: ["AI", "经验分享"]
category: 经验分享
draft: false
---

上一篇：[2025.12 AI 使用总结](/posts/ai-summary-2025-12/)

继上次编写 AI 总结后，由于有些忍受不了 Qoder 的界面 bug，我开始探索其他方案。

## Cursor

在闲鱼上我找到了低价 Cursor 方案，把价格压得很低。尝试之后发现现在的 Cursor 在其他 AI IDE 百花齐放的情况下，仍然是 AI IDE 里的第一位。

## OpenCode + Oh My OpenCode

同时我还拥有 packycode 这类第三方中转站，当时也在用 Claude Code。后来我又重新用起了 [OpenCode](https://opencode.ai/)，原因是它支持更好的扩展，在 Agent 编排上更简单。

OpenCode 生态里最近出现了一个叫 **Oh My OpenCode** 的插件。我了解到它是因为 Anthropic 把 oh-my-opencode 当作封锁 OpenCode 的理由，不少 Anthropic 用户都因第三方工具被限制。

::github{repo="code-yeongyu/oh-my-opencode"}

::github{repo="anomalyco/opencode"}

深度用了一阵 OpenCode 搭配 Oh My OpenCode 之后，真的不得不赞叹，**OpenCode + OMO** 的搭配很厉害，能很高效、精确地执行我的任务。唯二的缺点是要凑齐 Anthropic、OpenAI 和 Google Gemini 三家的模型才算完全体，以及 token 消耗确实大。但这丝毫不影响它是个很棒的组合。

## Codex 与 Right Code

后来我改用 Codex，把 OMO 里所有 Agent 的模型都换成了 [Right Code](https://right.codes/) 的包月 GPT 5.2。可能是提供商的原因，效率有所下降，但准确性上没落下太多。

## 关于 Qoder 后续

之后可能不太会继续用 Qoder 了。不得不说它的 wiki 功能挺好用的，但整体好像快要涨价了。不论价格还是效果，比起用低价方案的 Cursor、OpenCode 或 Claude Code，都差一截。

## 实战心得

现在从新项目的方案探索、老项目的代码阅读，到具体业务的代码书写、提交前审查、查错修 bug，整条开发线上我都会用到 AI。

在公司某个项目里，我借 js-reverse MCP 对目标网站做了逆向。在 AI 协助下，原本要查大量资料、花很多时间啃代码才能搞定的部分，很短时间就搞定了。有些地方我自己推不出是什么逻辑或类型，把上下文丢给 AI，它结合模型知识再配合联网搜到的信息，很容易就能推断出来，省了不少折腾。

::github{repo="zhizhuodemao/js-reverse-mcp"}

## 进阶学习

有一篇博客，[12 Best Practices to Use AI in Coding in 2025](https://www.questera.ai/blogs/12-best-practices-to-use-ai-in-coding-in-2025)，建议使用 AI 编程的人去看一看，看完应当对大模型的理解更加深刻一些。

另外，在我使用 Cursor 时，我有时会看 [Cursor 的博客](https://cursor.com/blog/)。开发 Cursor 的人往往对它最了解，来自开发者的经验非常可取。比如 [使用 Agent 编码的最佳实践](https://cursor.com/cn/blog/agent-best-practices) 讲了怎么更好用 Agent，[How AI Models Work](https://cursor.com/cn/learn/how-ai-models-work) 则科普了底层原理，都很有启发。

## 结语

在现在发展趋势下，应该转变对 AI 的思维模式了。比起专注代码与技术栈，更应该学好如何利用好手里的工具，以及寻找当前时代能够提高效率的新的工具。

可以毫不夸张的说，程序员都在追求极致的效率，我们所做的大部分都是为了减少人工重复性的工作。持续跟进时事和新的工具与技术，不断优化自己的工作流，让 AI 帮我们解放生产力，把精力留给核心业务和架构思考，或许才是接下来的正解。


:::tip
你说得对，这篇文章都是用 AI 进行润色辅助编写的，我只把内容丢了进去
:::