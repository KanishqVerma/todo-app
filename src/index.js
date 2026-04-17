import "./styles.css";
import { todoController } from "./logic";
import { userInterface } from "./ui.js";

const controller = todoController();
userInterface(controller);