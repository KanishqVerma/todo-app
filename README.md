#  Webpack Starter Template

<p align="center">
  A clean, minimal, and scalable Webpack setup to kickstart modern JavaScript projects.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Webpack-5-blue?logo=webpack" />
  <img src="https://img.shields.io/badge/Node.js-Required-green?logo=node.js" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" />
</p>

---

##  Features

*  Pre-configured Webpack setup
*  Webpack Dev Server with live reload
*  Clean and minimal structure
*  Organized for scalability
*  Easy to extend with loaders/plugins

---

##  Project Structure

```bash
webpack-starter-template/
├── src/
│   ├── index.js
│   └── style.css
├── dist/
├── package.json
├── webpack.config.js
├── .gitignore
└── README.md
```

---

##  Getting Started

### Use this template

Click **"Use this template"** on GitHub
or clone manually:

```bash
git clone <your-repo-url>
cd webpack-starter-template
```

---

### Install dependencies

```bash
npm install
```

---

### Start development server

```bash
npm run start
```

* Opens your app in the browser
* Auto-reloads on file changes

---

### Build for production

```bash
npm run build
```

* Outputs optimized files in the `dist/` folder

---

## Scripts

```json
"scripts": {
  "start": "webpack serve --open",
  "build": "webpack"
}
```

---

## How It Works

| Concept   | Description                         |
| --------- | ----------------------------------- |
| Entry     | `src/index.js` — starting point     |
| Output    | `dist/main.js` — bundled file       |
| Mode      | Development / Production            |
| DevServer | Serves app locally with live reload |

---

## Customization

You can extend this setup with:

*  CSS / Sass loaders
*  Asset modules (images, fonts)
*  HTML Webpack Plugin
*  Code splitting
*  Separate dev/prod configs

---

##  Best Practices

*  Do not commit `node_modules/`
*  Do not commit `dist/` (unless deploying static builds)
*  Keep dependencies minimal
*  Keep configs readable

---

##  Usage

1. Click **"Use this template"**
2. Create a new repository
3. Run:

   ```bash
   npm install && npm run start
   ```
4. Start building 

---

##  Roadmap (Optional Improvements)

* [ ] Add `html-webpack-plugin`
* [ ] Add CSS loaders
* [ ] Split dev & prod configs
* [ ] Add ESLint + Prettier
* [ ] Add TypeScript support

---

## Contributing

Feel free to fork, improve, and submit a PR.

---

## License

This project is licensed under the MIT License.

---

## Philosophy

> **Clone → Install → Start → Build**

Simple, fast, and production-ready.
