# GitHub repositories searcher (table)

Check the [Demo](https://chifangchen.github.io/github-repos-table/)

---

## Introduction

This project was developed by `React` `Styled Component` & `TypeScript`.

I choose `Material UI` as the design framework. When typing in the search input, it will `debounce` the request of getting the data from API. I also build the code as server-side render files to improve `SEO`. There are two `language` versions provided.

You can scroll up right away by clicking the _back to top button_ when it shows. When switching the sort or the programming language, the page will initialize to 1. Because the API said it could only provide the first 1000 search results, I defined the max page in the repo. The per-page property is 20 setting in the file variables in folder utils. If there occurs some problem, it will show an error message to info the user.

---

## Code design

Only 1 page in the APP.

All components are placed in the `components` folder, and all hooks are placed in the `hooks` folder.

Common functions and variables are defined in the `utils` folder.

---

## Activate the APP

- Clone the repo
- `npm install`
- `npm start`
