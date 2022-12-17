---
title: 'The way of ReactJS'
excerpt: 'Explain how React works from scratch step by step'
coverImage: '/assets/blog/hello-world/cover.jpg'
date: '2020-09-02T05:35:07.322Z'
author:
  name: trongtai37
  picture: '/assets/blog/authors/tim.jpeg'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
---

We are going to rewrite React from scratch. Step by step. Following the architecture from the real React code but without all the optimizations and non-essential features.

If you’ve read any of my previous “build your own React” posts, the difference is that this post is based on React 16.8, so we can now use hooks and drop all the code related to classes.

You can find the history with the old blog posts and the code on the `Didact` repo. There’s also a talk covering the same content. But this is a self-contained post.

Starting from scratch, these are all the things we’ll add to our version of React one by one:

> - Step I: The createElement Function
> - Step II: The render Function
> - Step III: Concurrent Mode
> - Step IV: Fibers
> - Step V: Render and Commit Phases
> - Step VI: Reconciliation
> - Step VII: Function Components
> - Step VIII: Hooks
