import "./styles.css";
import { todoController } from "./logic";
import { userInterface } from "./ui.js";

console.log("Hello, World!");
const controller = todoController();
userInterface(controller);