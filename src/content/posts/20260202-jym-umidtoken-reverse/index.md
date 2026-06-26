---
title: 交易猫 jym_umidToken 实验性逆向获取
published: 2026-02-02
description: "交易猫 jym_umidToken 实验性逆向获取"
# image: "./cover.jpeg"
tags: ["web逆向"]
category: 逆向
draft: false
---

jym_umidToken 是交易猫平台存储在浏览器 LocalStorage 中的一条记录，在平台进行高风险操作（如商品下架）时，用于完成浏览器指纹、行为等多维度验证。

其格式形如：`T2gACrQJW9Ciy7_SuIDDO8_ibbyTZWA6jJokurfiQl28YTXIPqc0Q6eUEoewWwZ-Azk=`

## 逆向原因

原项目采用直接启动 playwright 浏览器的方式获取该值，存在几个问题：Token 有效期较短，需要频繁刷新；浏览器实例占用服务器资源较多，容易引发性能问题。

## 过程

### 定位源码

在浏览器控制台搜索 `jym_umidToken`，可找到多处类似如下的代码片段：

```javascript
window.AWSC.use("um", (function(e, n) {
    "loaded" === e && n.init({
        appName: "jym-member",
        serviceLocation: "cn"
    }, (function(e, n) {
        "success" === e && (window.umidToken = n.tn,
        window.localStorage && window.localStorage.setItem("jym_umidToken", n.tn),
        clearTimeout(a),
        t(n.tn))
    }
    ))
}))
```

由此可知，Token 由 AWSC 加载的 um 模块负责生成和写入。

### 请求分析

通过断点调试、逐层向上追踪调用链，可发现 um.js 会发起请求至 um.json 接口。

在 LocalStorage 中删除 jym_umidToken 后刷新页面，观察网络请求，可看到一个指向 `https://ynuf.aliapp.org/service/um.json` 的请求，响应体中的 `tn` 字段即为 jym_umidToken。

### 请求体分析

该请求的请求体中含有一个未知的 `data` 字段，需要在 um.js 中进一步追踪其生成逻辑。

经断点调试确认，`data` 来自 uab_collina 模块的 `getUA()` 函数，用于采集浏览器环境或操作行为等信息，参与安全校验。

### 验证测试

先尝试用固定的 `data` 发起请求，观察一段时间，检验 Token 是否包含时间戳等时效性信息。

两天后，使用「cookie + 原始 data」重新请求 um.json，实测返回的 Token 仍可正常通过验证。
