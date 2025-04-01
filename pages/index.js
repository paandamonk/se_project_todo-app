import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import Section from "../components/Section.js";

//Instantiates the todosList as a new Section class.
const todosList = new Section({
  items: initialTodos,
  renderer: (data) => {
    const todo = new Todo(data, "#todo-template");
    return todo.getView();
  }
},
".todos__list"
);

const addTodoPopup = new Popup("#add-todo-popup");

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];
//const addTodoPopup = document.querySelector("#add-todo-popup");
//const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");

const formValidator = new FormValidator(validationConfig, addTodoForm);

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

/* addTodoCloseBtn.addEventListener("click", () => {
  addTodoPopup.close();
}); */

//Adds new todos to the todoList.
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  //grabs inputs from the form
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  //create a unique id 
  const id = uuidv4();

  todosList.addItems({name, date, id});
  addTodoPopup.close();
  formValidator.resetValidation();
});

todosList.renderItems();
formValidator.enableValidation();
