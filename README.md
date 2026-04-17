# 📝 do-it.org — Todo App

A fully functional **project-based todo application** built with vanilla JavaScript, HTML, and CSS as part of the Odin Project curriculum.

---

## 🚀 Features

### 📂 Project Management

* Create new projects
* Edit project name & description
* Delete projects (with protected default projects)
* Switch between projects

### ✅ Todo Management

* Add todos with:

  * Title
  * Description
  * Due date
  * Priority
* Edit todos
* Delete todos
* Mark todos as complete (checkbox toggle)

### 🎨 UI & UX

* Clean sidebar + main content layout
* Active project highlighting
* Priority-based visual indicators
* Strikethrough completed tasks

### 💾 Persistence

* All data stored in **localStorage**
* Projects and todos persist across page reloads
* Full **rehydration** of objects on load

---

## 🧠 Key Concepts Learned

This project focuses heavily on:

* **Object-Oriented Programming (OOP)**
* **Separation of concerns**

  * Logic layer (controller)
  * UI layer (DOM rendering)
* **State management**
* **Dynamic DOM rendering**
* **Event handling & delegation**
* **localStorage persistence**
* **Serialization & rehydration**

  * Converting stored JSON back into working class instances

---

## 🏗️ Project Structure

```
src/
├── index.js        # Entry point
├── logic.js        # Application logic (Project, ToDo, controller)
├── ui.js           # DOM rendering & event handling
├── styles.css      # Styling
```

---

## ⚙️ How It Works

### 1. State Management

All data is managed inside a central controller:

```js
projectArray → contains all projects
each Project → contains todoArray
```

---

### 2. Rendering Flow

```
User Action → Update Data → Save → Re-render UI
```

---

### 3. Persistence

Data is saved to localStorage:

```js
localStorage.setItem("projects", JSON.stringify(projectArray));
```

On load:

* Data is parsed
* Rebuilt into `Project` and `ToDo` class instances

---

## 🧩 Challenges Faced

* Managing **state synchronization** between UI and logic
* Handling **localStorage persistence correctly**
* Rebuilding class instances (**rehydration**)
* Avoiding bugs from:

  * undefined IDs
  * incorrect initialization order
  * stale or corrupted storage data

---

## 🛠️ Tech Stack

* HTML
* CSS
* JavaScript (ES6+)
* Webpack

---

## 📦 Setup & Installation

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
npm start
```

---

## 📌 Future Improvements

* Drag & drop todos
* Filtering (Today / Upcoming / Completed)
* Better date formatting
* Animations & transitions
* Event delegation refactor
* Backend integration

---

## 🙌 Acknowledgements

* Built as part of **The Odin Project** curriculum
* Inspired by modern todo apps and task managers

---

## 📷 Preview

*(Add screenshots here if you want)*

---

## ✨ Final Thoughts

This project marks a transition from:

> “manipulating the DOM”

to:

> **building a state-driven application**

---

Made with 💻 and a lot of debugging.
