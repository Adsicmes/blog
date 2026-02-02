---
title: 2026.01 AI 编程工具使用分享
published: 2026-02-02
description: "个人使用 Cursor、Qoder、Kiro、Claude Code 等 AI 编程工具的经历与心得，以及模型评价与使用技巧"
# image: "./cover.jpeg"
tags: ["AI", "经验分享"]
category: 经验分享
draft: false
---

[2025.12AI使用总结](/posts/ai-summary-2025-12/)

继上次编写AI总结后，由于有些忍受不了qoder的界面bug，我开始探索其他的方案。

在闲鱼上我找到了低价 cursor 方案，把价格压得很低，尝试之后，发现现在的cursor确实非常好用，在我心里仍然是ai ide中的第一位。

同时我还拥有packycode这种第三方的中转站，并且当时我也在使用claude code。
在之后，我又重新用起了opencode，原因是opencode支持更好的扩展，对于Agent编排上更加简单。

opencode的生态中最近出现了一个叫oh my opencode的插件，了解这个插件是因为 Anthropic将 oh-my-opencode 作为封锁 opencode 的理由，很多anthropic都因为第三方工具遭到限制。

[opencode](https://opencode.ai/)
[oh my opencode](https://github.com/code-yeongyu/oh-my-opencode)

在深度使用opencode搭配oh my opencode后，真的不得不赞叹，opencode + omo的搭配真的很厉害，能够很高效精确地执行我的任务。自己在使用过程中唯二的缺点就是需要anthropic、openai和google gemini三家的模型才能做到完全体以及消耗的token真的很大。但这丝毫不影响这个搭配是一个很棒的组合。

后来我去用了codex，将omo全部agent的模型都换成了 [right code](https://right.codes/) 的包月的gpt 5.2，可能是由于提供商的原因效率上有不小的降低，但准确性上比之前不会落下太多。

之后可能，有可能不太会继续用qoder了，当然不得不说 qoder 的 wiki 功能挺好用的，但是好像整体快要涨价了。