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

## 本月用得最多的 Skill


### 起因
在mcp的大量使用中，会遇到两个问题：

第一个问题是上下文爆炸。为了让智能体能够灵活查询数据库，MCP 服务器通常会暴露数十甚至上百个工具（不同的表、不同的查询方法）。这些工具的完整 JSON Schema 在连接建立时就会被加载到系统提示词中，可能占用数万个 token。据社区开发者反馈，仅加载一个 Playwright MCP 服务器就会占用 200k 上下文窗口的 8%，这在多轮对话中会迅速累积，导致成本飙升和推理能力下降。

第二个问题是能力鸿沟。MCP 解决了"能够连接"的问题，但没有解决"知道如何使用"的问题。拥有数据库连接能力，不等于智能体知道如何编写高效且安全的 SQL；能够访问文件系统，不意味着它理解特定项目的代码结构和开发规范。这就像给一个新手程序员开通了所有系统的访问权限，但没有提供操作手册和最佳实践。

这正是 Agent Skills 要解决的核心问题。2025年初，Anthropic 在推出 MCP 之后，进一步提出了 Agent Skills 的概念，引发了业界的广泛关注。有开发者评论说："Skills 和 MCP 是两种东西，Skills 是领域知识，告诉模型该如何做，本质上是高级 Prompt；而 MCP 对接外部工具和数据。" 也有人认为："从 Function Call 到 Tool Call 到 MCP 到 Skills，核心大差不差，就是工程实践和表现形式的优化演进。"

### 什么是 Agent Skills？

Agent Skills 是一种标准化的程序性知识封装格式。如果说 MCP 为智能体提供了"手"来操作工具，那么 Skills 就提供了"操作手册"或"SOP（标准作业程序）"，教导智能体如何正确使用这些工具。

这种设计理念源于一个简单但深刻的洞察：连接性（Connectivity）与能力（Capability）应该分离。MCP 专注于前者，Skills 专注于后者。这种职责分离带来了清晰的架构优势：

MCP 的职责：提供标准化的访问接口，让智能体能够"够得着"外部世界的数据和工具
Skills 的职责：提供领域专业知识，告诉智能体在特定场景下"如何组合使用这些工具"
用一个类比来理解：MCP 像是 USB 接口或驱动程序，它定义了设备如何连接；而 Skills 像是软件应用程序，它定义了如何使用这些连接的设备来完成具体任务。你可以拥有一个功能完善的打印机驱动（MCP），但如果没有告诉你如何在 Word 里设置页边距和双面打印（Skill），你仍然无法高效地完成打印任务。

渐进式披露：破解上下文困境
Agent Skills 最核心的创新是渐进式披露（Progressive Disclosure）机制。这种机制将技能信息分为三个层次，智能体按需逐步加载，既确保必要时不遗漏细节，又避免一次性将过多内容塞入上下文窗口。

### 本质区别与写作关系

让我们通过一个具体的例子来理解这种差异。假设你要构建一个智能体来帮助团队进行代码审查：

<strong>MCP 的职责</strong>：

```python
# MCP 提供对 GitHub 的标准化访问
github_mcp = MCPTool(server_command=["npx", "-y", "@modelcontextprotocol/server-github"])

# MCP 暴露的工具（简化示例）：
# - list_pull_requests(repo, state)
# - get_pull_request_details(pr_number)
# - list_pr_comments(pr_number)
# - create_pr_comment(pr_number, body)
# - get_file_content(repo, path, ref)
# - list_pr_files(pr_number)
```

MCP 让智能体"能够"访问 GitHub，能够调用这些 API。但它不知道"应该"做什么。

<strong>Skills 的职责</strong>：

```markdown
---
name: code-review-workflow
description: 执行标准的代码审查流程，包括检查代码风格、安全问题、测试覆盖率等
---

# 代码审查工作流

## 审查清单

当执行代码审查时，按以下步骤进行：

1. **获取 PR 信息**：调用 `get_pull_request_details` 了解变更背景
2. **分析变更文件**：调用 `list_pr_files` 获取文件列表
3. **逐文件审查**：
   - 对于 `.py` 文件：检查是否符合 PEP 8，是否有明显的性能问题
   - 对于 `.js/.ts` 文件：检查是否有未处理的 Promise，是否使用了废弃的 API
   - 对于测试文件：验证是否覆盖了新增的代码路径
4. **安全检查**：
   - 是否硬编码了敏感信息（密钥、密码）
   - 是否有 SQL 注入或 XSS 风险
5. **提供反馈**：
   - 严重问题：使用 `create_pr_comment` 直接评论
   - 建议改进：在总结中提出

## 公司特定规范

- 所有数据库查询必须使用参数化查询
- API 端点必须有权限验证装饰器
- 新功能必须附带单元测试（覆盖率 > 80%）

## 示例评论模板

**严重问题**：

⚠️ 安全风险：第 45 行直接拼接 SQL 字符串，存在注入风险。
建议改用参数化查询：`cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))`

```

Skills 告诉智能体"应该"做什么、如何组织审查流程、需要关注哪些公司特定的规范。它是领域知识和最佳实践的容器。

理解了两者的差异后，我们会发现：<strong>Skills 和 MCP 不是竞争关系，而是互补关系</strong>。最佳实践是将两者结合，形成分层架构：

<strong>典型工作流</strong>：

1. 用户问："分析公司内部谁的话语权最高"
2. <strong>Skills 层</strong>识别这是一个数据分析任务，加载 `mysql-employees-analysis` 技能
3. <strong>Skills 层</strong>根据技能指令，将任务分解为子步骤：查询管理关系、薪资对比、任职时长等
4. <strong>MCP 层</strong>执行具体的 SQL 查询，返回结果
5. <strong>Skills 层</strong>根据技能中的领域知识，解读数据并生成综合分析
6. 返回结构化的答案给用户

这种架构的优势是：

- <strong>关注点分离</strong>：MCP 专注于"能力"，Skills 专注于"智慧"
- <strong>成本优化</strong>：渐进式加载大幅降低 token 消耗
- <strong>可维护性</strong>：业务逻辑（Skills）与基础设施（MCP）解耦
- <strong>复用性</strong>：同一个 MCP 服务器可以被多个 Skills 使用

### 技术实现：如何创建和使用 Skills

让我们深入了解 `SKILL.md` 文件的标准结构：

```markdown
---
# === 必需字段 ===
name: skill-name
  # 技能的唯一标识符，使用 kebab-case 命名

description: >
  简洁但精确的描述，说明：
  1. 这个技能做什么
  2. 什么时候应该使用它
  3. 它的核心价值是什么
  # 注意：description 是智能体选择技能的唯一依据，必须写清楚！

# === 可选字段 ===
version: 1.0.0
  # 语义化版本号

allowed_tools: [tool1, tool2]
  # 此技能可以调用的工具列表（白名单）

required_context: [context_item1]
  # 此技能需要的上下文信息

license: MIT
  # 许可协议

author: Your Name <email@example.com>
  # 作者信息

tags: [database, analysis, sql]
  # 便于分类和搜索的标签
---

# 技能标题

## 概述
（对技能的详细介绍，包括使用场景、技术背景等）

## 前置条件
（使用此技能需要的环境配置、依赖项等）

## 工作流程
（详细的步骤说明，告诉智能体如何执行任务）

## 最佳实践
（经验总结、注意事项、常见陷阱等）

## 示例
（具体的使用案例，帮助智能体理解）

## 故障排查
（常见问题和解决方案）
```

根据 Anthropic 官方文档和社区最佳实践，编写有效的 Skills 需要遵循以下原则：

#### 1. 精准的 Description

`description` 是智能体决策的关键。它应该：

- <strong>精确定义适用范围</strong>：避免模糊的描述如"帮助处理数据"
- <strong>包含触发关键词</strong>：让智能体能够匹配用户意图
- <strong>说明独特价值</strong>：与其他技能区分开来

❌ <strong>不好的 description</strong>：
```yaml
description: 处理数据库查询
```

✅ <strong>好的 description</strong>：
```yaml
description: >
  将中文业务问题转换为 SQL 查询并分析 MySQL employees 示例数据库。
  适用于员工信息查询、薪资统计、部门分析、职位变动历史等场景。
  当用户询问关于员工、薪资、部门的数据时使用此技能。
```

#### 2. 模块化与单一职责

一个 Skill 应该专注于一个明确的领域或任务类型。如果一个 Skill 试图做太多事情，会导致：

- Description 过于宽泛，匹配精度下降
- 指令内容过长，浪费上下文
- 难以维护和更新

<strong>建议</strong>：与其创建一个"通用数据分析"技能，不如创建多个专门的技能：
- `mysql-employees-analysis`：专门分析 employees 数据库
- `sales-data-analysis`：专门分析销售数据
- `user-behavior-analysis`：专门分析用户行为数据

#### 3. 确定性优先原则

对于复杂的、需要精确执行的任务，优先使用脚本而不是依赖 LLM 生成。例如，在数据导出场景中，与其让 LLM 生成 Excel 二进制内容（容易出错），不如编写一个专门的脚本来处理这个任务，SKILL.md 中只需要指导智能体何时调用这个脚本即可。

#### 4. 渐进式披露策略

合理利用三层结构，将信息按重要性和使用频率分层：

- <strong>SKILL.md 主体</strong>：放置核心工作流、常用模式
- <strong>附加文档</strong>（如 `advanced.md`）：放置高级用法、边缘情况
- <strong>数据文件</strong>：放置大型参考数据，通过脚本按需查询


## Oh My OpenCode 二月更新

OMO 二月更新很勤，从 v3.6 一路到 v3.9 附近，改动不少。我印象深的有：**SQLite 后端**全面支持、各个 Agent（Atlas、Metis、Momus 等）的显示名称、后台任务可见性更好；后面又加了实验性的 **Hashline Edit**（带哈希校验的文件编辑）、**Playwright CLI** 做浏览器自动化；新版本里还给 Sisyphus、Prometheus、Atlas 等代理加了 Gemini 优化提示词，Grep 输出和 Hashline 编辑的体验也有改进等等。

::github{repo="code-yeongyu/oh-my-opencode"}

## AstrBot

除了 IDE 里的 AI，二月份我也在 **AstrBot** 上花了一些时间。它是开源的多平台 AI 助手，能接 QQ、微信、Telegram、Discord 等，自带 Agent 编排、知识库和插件生态。

我主要用到它的知识库和 Agent：配好 Embedding 和知识库之后，把项目文档、规范丢进去，在对应平台里对话时让助手带着知识库回答。

目前还在探索阶段。

::github{repo="AstrBotDevs/AstrBot"}

## 关于 OpenClaw

像 **OpenClaw** 这种「能 24/7 自己跑、处理收件箱、自动执行任务」的 Agent，我二月也研究并试着部署过。多平台接入、本地/云模型可选、技能用 Markdown + YAML 扩展，概念上很吸引人。

实际搞下来，部署和配置难度不低。安装脚本虽然能一条命令跑起来，但真想拿来用往往得上 Docker 或 VPS，安全、网关、频道、技能一堆模块都要摸一遍，文档多而杂，稍不留神就配错。而且现在生态和稳定性都还在快速变，经常得跟着版本调配置。所以我目前的结论是：概念挺先进，但部署和运维成本高，成熟度还不足以当主力用，暂时只当尝鲜、跟跟方向，日常干活还是以 Cursor + OpenCode/OMO 为主。

::github{repo="openclaw/openclaw"}

:::tip
你说得对，这篇文章都是用 AI 进行润色辅助编写的，我只把内容丢了进去
:::
