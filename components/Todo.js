//creates a to-do item with a name (and optionally, a due date) along with the appropriate handlers

export default class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._completed = data.completed;
    this._date = data.date;
    this._name = data.name;
    this._id = data.id;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  //sets the necessary event listeners for the delete button and the checkbox.
  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._completed = !this._completed;
      this._handleCheck(this._completed);
    });
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._handleDelete(this._completed);
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._completed;
    this._todoCheckboxEl.id = `todo-${this._id}`;
    this._todoLabel.setAttribute("for", `todo-${this._id}`);
  }

  //adds handles generating the markup from a template and adding the necessary data to the element
  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    this._todoNameEl.textContent = this._name;

    this._dueDate = new Date(this._date);
    if (!isNaN(this._dueDate)) {
      this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}`;
    }

    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}
