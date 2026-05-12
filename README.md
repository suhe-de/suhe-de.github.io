
# Beautiful Jekyll

[![Gem Version](https://badge.fury.io/rb/beautiful-jekyll-theme.svg)](https://badge.fury.io/rb/beautiful-jekyll-theme)

> 作者：[Dean Attali](https://deanattali.com) &middot; [演示站点](https://beautifuljekyll.com/)

**Beautiful Jekyll** 是一个开箱即用的模板，帮助你快速创建一个漂亮的网站。非常适合个人主页、博客或简单的项目网站。[查看演示](https://beautifuljekyll.com)，只需两分钟即可拥有同样的网站。你还可以访问[我的个人网站](https://deanattali.com)或[我的咨询网站](https://attalitech.com)了解实际应用，或查看[其他人用此主题搭建的网站示例](http://beautifuljekyll.com/examples)。

**如果你喜欢 Beautiful Jekyll，请考虑[支持我](https://github.com/sponsors/daattali)。你还将获得答疑时间和更多功能！❤**

## 目录

- [功能介绍](#features)
- [赞助者 🏆](#sponsors)
- [**三步搭建你的网站**](#build-your-website-in-3-steps)
- [计划](#plans)
- [添加你的内容](#add-your-own-content)
- [自定义每页参数](#customizing-parameters-for-each-page)
- [支持的参数](#supported-parameters)
- [精选用户（成功案例!）](#featured-users-success-stories)
- [下一步](#next-steps)
- [获取帮助](#getting-help)
- [致谢与贡献](#contributions)

# 功能介绍

__查看[*更新日志*](https://beautifuljekyll.com/updates/)，了解最新功能！__

- **简单**：Beautiful Jekyll 的首要目标是让*任何人*都能在几分钟内创建网站。
- **现代**：采用最新最佳实践和技术，在 Google Chrome 的 Audit 中几乎满分。
- **移动优先**：无论大屏还是小屏（移动端）都能有很好的展示效果。
- **高度可定制**：支持多种个性化设置，如更换背景色/图片、添加 Logo 等。
- **灵活使用**：可直接在 GitHub 上使用，也可通过 Ruby gem 安装——选择最适合你的[开发方式](#build-your-website-in-3-steps)。
- **久经考验**：自 2015 年以来，已有 5 万+ 用户在使用本主题。
- **SEO 与社交媒体支持**：可自定义网站在 Google 和社交媒体上的展示效果。
- **评论支持**：可通过 [Disqus](https://disqus.com/)、[Facebook 评论](https://developers.facebook.com/docs/plugins/comments)、[Utterances](https://utteranc.es/)、[Staticman](https://staticman.net)、[giscus](https://giscus.app) 或 [CommentBox](https://commentbox.io/) 为任意页面添加评论。
- **标签**：博客文章可添加关键词标签，并自动生成索引页。
- **统计分析**：轻松集成 Google Analytics 或其他分析平台，追踪网站访问量。
- **搜索**：导航栏提供搜索按钮，方便用户查找页面。
- **图片支持**：任意页面可设置全宽封面图和缩略图。
- **RSS**：自动生成 RSS 订阅源，甚至可以轻松托管播客。

<h2 id="sponsors">赞助者 🏆</h2>

开发和维护 Beautiful Jekyll 需要大量时间和精力——感谢所有资助者！

- [DoFollow](https://dofollow.co.uk/)
- [Varna Sri Raman](https://about.me/varna)

**[成为 Beautiful Jekyll 赞助者，解锁新功能！](https://github.com/sponsors/daattali/sponsorships?tier_id=39856)**

# 三步搭建你的网站

使用 Beautiful Jekyll 搭建网站有多种方式，本文档介绍最简单的一种：在 GitHub 上 Fork。本方法适合绝大多数人（包括我自己！）。

即使你打算采用[高级安装方式](https://beautifuljekyll.com/getstarted/#install-steps-hard)，也建议先阅读简单方法。

## 简单方式（推荐！）

入门真的只需 1-2-3 三步 :smile:

title       | Page or blog post title
subtitle    | Short description of page or blog post that goes under the title
tags        | List of tags to categorize the post. Separate the tags with commas and place them inside square brackets. Example: `[personal, analysis, finance]`
cover-img   | Include a large full-width image at the top of the page. You can either provide the path to a single image (eg. `"/path/to/img"`) , or a list of images to cycle through (eg. `["/path/img1", "/path/img2"]`). If you want to add a caption to an image, then you must use the list notation (use `[]` even if you have only one image), and each image should be provided as `"/path/to/img" : "Caption of image"`.
thumbnail-img | For blog posts, if you want to add a thumbnail that will show up in the feed, use `thumbnail-img: /path/to/image`. If no thumbnail is provided, then `cover-img` will be used as the thumbnail. You can use `thumbnail-img: ""` to disable a thumbnail.
comments    | If you want do add comments to a specific page, use `comments: true`. Comments only work if you enable one of the comments providers (Facebook, disqus, staticman, utterances, giscus, CommentBox) in `_config.yml` file. Comments are automatically enabled on blog posts but not on other pages; to turn comments off for a specific post, use `comments: false`.
mathjax     | If you want to use LaTeX formulas, you need to enable MathJax. Note that in MathJax you need to use `$$` and `\\(` to start and end expressions
share-title | A title for the page. If not provided, then `title` will be used, and if that's missing then the site title (from `_config.yml`) is used.
share-description | A brief description of the page. If not provided, then `subtitle` will be used, and if that's missing then an excerpt from the page content is used.
share-img   | The image to show. If not provided, then `cover-img` or `thumbnail-img` will be used if one of them is provided.
author      | Specify the author of a blog post (useful if a website has multiple authors).
readtime    | If you want a post to show how many minutes it will take to read it, use `readtime: true`.
show-avatar | If you have an avatar configured in the `_config.yml` but you want to turn it off on a specific page, use `show-avatar: false`.
social-share | By default, every blog post has buttons to share the page on social media. If you want to turn this feature off, use `social-share: false`.
nav-short   | By default, the navigation bar gets shorter after scrolling down the page. If you want the navigation bar to always be short on a certain page, use `nav-short: true`
gh-repo   | If you want to show GitHub buttons at the top of a post, this sets the GitHub repo name (eg. `daattali/beautiful-jekyll`). You must also use the `gh-badge` parameter to specify what buttons to show.
gh-badge  | Select which GitHub buttons to display. Available options are: [star, watch, fork, follow]. You must also use the `gh-repo` parameter to specify the GitHub repo.
last-updated | If you want to show that a blog post was updated after it was originally released, you can specify an "Updated on" date.
layout      | What type of page this is (default is `post` for blog posts and `page` for other pages). See _Page types_ section below for more information.

下方有详细步骤，也可参考下方 30 秒视频。如果你还没有[GitHub 账号](https://github.com)，需要先注册。

![安装步骤](https://beautifuljekyll.com/assets/img/install-steps.gif)

### 1. Fork 本项目

点击页面右上角的 __*Fork*__ 按钮。Fork 意味着你会将整个项目及所有文件复制到你的账户下。暂时不要点击下一页的 __*Create fork*__ 按钮。

### 2. 重命名仓库为 `YOURUSERNAME.github.io`

你会经常看到 GitHub 上的“repository”一词——它其实就是“项目”。在 __*Repository name*__ 处，你会看到默认名称 `beautiful-jekyll`，此处需要将其重命名为 `YOURUSERNAME.github.io`（将 `YOURUSERNAME` 替换为你的 GitHub 用户名）。必须使用这个精确名称，GitHub 才会自动为该项目创建网站。

> 提示：如果你想用不同的网址，请查看 [FAQ](https://beautifuljekyll.com/faq/#custom-domain)

### 3. 自定义你的网站设置

编辑 `_config.yml` 文件，修改你想要的设置。点击文件进入详情页，再点击铅笔图标进行编辑（如有疑问可参考上方视频）。文件内的设置项都有注释说明，`#` 开头的是注释，其他行为实际设置。修改后点击绿色的 __*Commit changes*__ 按钮保存。

> 注意：视频中只修改了 `_config.yml` 的一个设置项，建议你把所有设置都浏览一遍。

### 4. 恭喜！你的网站已创建！

如果项目命名正确且已编辑配置文件，几分钟后你的网站就会在 `https://YOURUSERNAME.github.io` 上线。每次修改文件，网站会自动重新构建并在约一分钟后更新。网站会自带几篇示例博客和其他页面。

## 进阶方式（高级用户）

上述方法是通过 GitHub Fork 使用 Beautiful Jekyll 的最简单方式。还有更多[高级安装方式](https://beautifuljekyll.com/getstarted/#install-steps-hard)，如通过远程主题或 Ruby gem，这些方式更灵活，但仅推荐给高级用户。

> 注意：Beautiful Jekyll 主要设计为 GitHub 主题方式使用，通过 Ruby gem 方式不提供支持。

# 计划

Beautiful Jekyll 永久免费。但如果你想移除网站上的 Beautiful Jekyll 广告、使用暗色模式皮肤、获得答疑时间或支持开发，[可查看不同计划](https://beautifuljekyll.com/plans)。

# 添加你的内容

你可以通过 Markdown 文件（`.md`）或 HTML 文件为网站添加页面。推荐使用 Markdown，写法简单（[5 分钟学会 Markdown 教程](https://markdowntutorial.com/)）。

想看 Markdown 文件示例，可点击任意 `.md` 结尾的文件，如 [`aboutme.md`](./aboutme.md)。你会看到排版优美的文本（有加粗、链接、列表等），点击铅笔图标可查看生成这些内容的 Markdown 代码，非常简单！

对比 [`tags.html`](./tags.html)，那是 HTML 写法——不够直观。如果不会 HTML，建议坚持用 Markdown。

你创建的任意 Markdown 或 HTML 文件会以 `https://<yourusername>.github.io/<pagename>` 形式访问。例如新建 `about.md`（或 `about.html`），则可通过 `https://<yourusername>.github.io/about` 访问。

放在 [`_posts`](./_posts) 目录下的文件会被视为博客文章。可参考现有文件学习写法，注意文件命名需为 `YEAR-MONTH-DAY-title.md` 格式。添加自己的文章后，可删除 `_posts` 目录下的示例文章。

# 自定义每页参数

**最后一个重要事项**：为让新页面使用本模板而非普通 HTML 页面，**必须在每页顶部添加 [YAML front matter](https://jekyllrb.com/docs/front-matter/)**：

```
---
---
```

你可以在这两条虚线之间为页面添加参数（如标题、副标题、图片等——[下方有完整参数列表](#supported-parameters)）。例如：

```
---
title: Contact me
subtitle: Here you'll find all the ways to get in touch with me
---
```

如果页面不需要参数，也必须保留这两条虚线，否则不会应用 Beautiful Jekyll 模板。

可参考 [`aboutme.md`](https://raw.githubusercontent.com/daattali/beautiful-jekyll/master/aboutme.md) 顶部示例。

**务必牢记：每个页面都要加两条三短横线的 YAML front matter，有参数就写在中间。**

# 支持的参数

以下为 Beautiful Jekyll 支持的参数（可加在任意页面的 YAML front matter 中）。更多全站设置请查看 `_config.yml`。如需全站生效的参数，请参考 [FAQ](https://beautifuljekyll.com/faq/#default-params)。

## 主要参数

这些是你最常用的基本 YAML 参数。

参数         | 说明
----------- | -----------
title       | 页面或博客标题
subtitle    | 标题下方的简短描述
tags        | 文章标签列表。用逗号分隔并放在中括号内。例如 `[personal, analysis, finance]`
cover-img   | 页面顶部大幅全宽图片。可填写单张图片路径（如 `"/path/to/img"`），也可填写图片列表（如 `["/path/img1", "/path/img2"]`）。如需为图片添加说明，必须用列表写法（即使只有一张也要用 `[]`），每张图片写成 `"/path/to/img" : "图片说明"`。
thumbnail-img | 博客文章缩略图，显示在文章列表中。未设置则用 `cover-img`。如需禁用缩略图，可设为 `thumbnail-img: ""`。
comments    | 为特定页面开启评论，设为 `comments: true`。需在 `_config.yml` 启用评论服务（Facebook、disqus、staticman、utterances、giscus、CommentBox）。博客默认开启评论，单篇关闭用 `comments: false`。
mathjax     | 需使用 LaTeX 公式时启用 MathJax。注意 MathJax 需用 `$$` 和 `\\(` 包裹表达式。

## SEO 与社交分享参数

这些参数用于控制页面在搜索引擎（如 Google）或社交媒体（如 Twitter/Facebook）展示的信息。

参数         | 说明
----------- | -----------
share-title | 页面分享标题。未设置则用 `title`，再无则用站点标题（`_config.yml`）。
share-description | 页面简要描述。未设置则用 `subtitle`，再无则用正文摘要。
share-img   | 分享时展示的图片。未设置则用 `cover-img` 或 `thumbnail-img`。

## 不常用参数

这些参数用得不多，但有时很有用。

参数         | 说明
----------- | -----------
author      | 指定博客作者（适合多作者网站）。
readtime    | 显示预计阅读时长，设为 `readtime: true`。
show-avatar | 已在 `_config.yml` 配置头像但想在某页关闭，设为 `show-avatar: false`。
social-share | 博客默认有社交分享按钮，关闭用 `social-share: false`。
nav-short   | 导航栏默认下滑后变窄，某页始终窄用 `nav-short: true`。
gh-repo   | 在文章顶部显示 GitHub 按钮，填写仓库名（如 `daattali/beautiful-jekyll`），需配合 `gh-badge`。
gh-badge  | 选择显示哪些 GitHub 按钮。可选项：[star, watch, fork, follow]，需配合 `gh-repo`。
last-updated | 显示文章更新日期。
layout      | 页面类型（博客默认 `post`，其他为 `page`）。详见下方“页面类型”。

## 高级参数

以下参数仅适合需要极致自定义的网站。

footer-extra | If you want to include extra content below the social media icons in the footer, create an HTML file in the `_includes/` folder (for example `_includes/myinfo.html`) and set `footer-extra` to the name of the file (for example `footer-extra: myinfo.html`). Accepts a single file or a list of files.
before-content | Similar to `footer-extra`, but used for including HTML before the main content of the page (below the title).
after-content | Similar to `footer-extra`, but used for including HTML after the main content of the page (above the footer).
head-extra   | Similar to `footer-extra`, but used if you have any HTML code that needs to be included in the `<head>` tag of the page.
language    | HTML language code to be set on the page's &lt;html&gt; element.
full-width  | By default, page content is constrained to a standard width. Use `full-width: true` to allow the content to span the entire width of the window.
js          | List of local JavaScript files to include in the page (eg. `/assets/js/mypage.js`)
ext-js      | List of external JavaScript files to include in the page (eg. `//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.2/underscore-min.js`). External JavaScript files that support [Subresource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) can be specified using the `href` and `sri` parameters eg.<br/>`href: "//code.jquery.com/jquery-3.1.1.min.js"`<br/>`sri: "sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="`
css         | List of local CSS files to include in the page
ext-css      | List of external CSS files to include in the page. External CSS files using SRI (see `ext-js` parameter) are also supported.

参数         | 说明
----------- | -----------
footer-extra | 在页脚社交图标下方插入额外内容。需在 `_includes/` 目录新建 HTML 文件（如 `_includes/myinfo.html`），并设置 `footer-extra: myinfo.html`。可为单个文件或文件列表。
before-content | 类似 `footer-extra`，但插入内容在主内容区前（标题下方）。
after-content | 类似 `footer-extra`，但插入内容在主内容区后（页脚上方）。
head-extra   | 类似 `footer-extra`，但插入内容到页面 `<head>` 标签内。
language    | 设置页面 `<html>` 标签的 HTML 语言代码。
full-width  | 默认内容宽度有限，设为 `full-width: true` 可全宽展示。
js          | 页面需加载的本地 JS 文件列表（如 `/assets/js/mypage.js`）。
ext-js      | 页面需加载的外部 JS 文件列表（如 `//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.2/underscore-min.js`）。支持 [SRI 子资源完整性](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)，可用 `href` 和 `sri` 指定。
css         | 页面需加载的本地 CSS 文件列表。
ext-css      | 页面需加载的外部 CSS 文件列表。外部 CSS 也支持 SRI。

## 页面类型

- **post** - 博客文章，需在 `_posts` 文件夹下新建 markdown 或 HTML 文件，并加 YAML front matter（两条三短横线）。可参考现有博客文件。
- **page** - `_posts` 目录外的页面，只要加了 YAML front matter，样式与博客类似。
- **home** - 首页布局，展示所有博客文章（新到旧排序）。使用 `home` 布局的文件必须命名为 `index.html`（不能是 `index.md` 或其他）。
- **minimal** - 极简页面，无导航栏和页脚。YAML front matter 设为 `layout: minimal`。
- 如需完全自定义 HTML 页面，可不加 YAML front matter。仅推荐有 HTML 基础者使用！

# 精选用户（成功案例！）

访问[官方网站](http://beautifuljekyll.com/examples)查看使用 Beautiful Jekyll 搭建的网站示例。

如想展示你的网站并加入此列表，[升级到个人计划](https://github.com/sponsors/daattali/sponsorships?&tier_id=7362)即可获得展示机会及其他奖励！

# 下一步

恭喜你看到这里！你已掌握免费搭建精美网站的全部工具。

- 熟悉 Markdown 基础后，建议阅读这篇[示例文章](https://beautifuljekyll.com/2020-02-28-sample-markdown/)及其[源码](https://raw.githubusercontent.com/daattali/beautiful-jekyll/master/_posts/2020-02-28-sample-markdown.md)，学习更多进阶技巧。

- **强烈建议**阅读[*常见问题*](https://beautifuljekyll.com/faq/)，了解你可能未曾想到的问题答案。每隔几个月建议查看[*更新日志*](https://beautifuljekyll.com/updates/)，并学习[如何升级到最新版](https://beautifuljekyll.com/faq/#updating)。

- 你也可以了解[高级安装方式](https://beautifuljekyll.com/getstarted/#install-steps-hard)，获得更多控制权，但操作更复杂。请注意 Beautiful Jekyll 主要为 GitHub 主题设计，Ruby 安装方式不提供支持。

- Beautiful Jekyll 基于 Jekyll 构建。阅读[Jekyll 官方文档](https://jekyllrb.com/)可了解更多强大功能！

# 获取帮助

常见问题请访问[FAQ 页面](https://beautifuljekyll.com/faq)。

**如你选择[成为赞助者](https://beautifuljekyll.com/plans/)，可获得[答疑时间](https://beautifuljekyll.com/officehours/)。** 你也可以在 [Discussions](https://github.com/daattali/beautiful-jekyll/discussions) 区向社区求助。

Beautiful Jekyll 用户超过 5 万，技术水平各异，无法一一解答所有问题。与主题无关的 Jekyll 或网页开发问题，通常可在 Google、[Jekyll 文档](https://jekyllrb.com/)或 [Jekyll 论坛](https://talk.jekyllrb.com/)找到答案。

# 贡献

感谢[所有贡献者](https://github.com/daattali/beautiful-jekyll/graphs/contributors)。如发现问题或有意贡献，欢迎提交 PR/issue 或联系我。

你也可以[成为官方赞助者](https://github.com/sponsors/daattali/sponsorships?tier_id=39856)，助力 Beautiful Jekyll 持续维护！

# 致谢

本模板并非完全原创。特别感谢 [Jekyll Now](https://github.com/barryclark/jekyll-now) 和 [Bootstrap Clean Blog](https://github.com/IronSummitMedia/startbootstrap-clean-blog)，初期借鉴了不少想法。

还要感谢 [Dr. Jekyll's Themes](https://drjekyllthemes.github.io/)、[Jekyll Themes](http://jekyllthemes.org/)、以及另一个 [Jekyll Themes](http://jekyllrc.github.io/jekyllthemes/)，他们在主题目录中收录了 Beautiful Jekyll。


