import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import TodoCounter from "../components/TodoCounter.js";

//Function to handle updating the todo counter through the checkboxes.
function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

//Function to handle updating the todo counter through the delete button.
function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

//Instantiates the todosList as a new Section class.
const todosList = new Section(
  {
    items: initialTodos,
    renderer: (data) => {
      const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
      return todo.getView();
    },
  },
  ".todos__list"
);

//Instantiate the todoCounter.
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

//Instantiate the todo popup window.
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handlerFormSubmit: (getInputValues) => {
    const { name, dateInput } = getInputValues;
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const id = uuidv4();
    todosList.addItems({ name, date, id });
    addTodoPopup.close();
    todoCounter.updateTotal(true);
    formValidator.resetValidation();
  },
});

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];

const formValidator = new FormValidator(validationConfig, addTodoForm);

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

addTodoPopup.setEventListeners();
todosList.renderItems();
formValidator.enableValidation();

export { formValidator };
