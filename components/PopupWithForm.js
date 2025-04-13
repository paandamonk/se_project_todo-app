import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handlerFormSubmit }) {
    super({ popupSelector });
    this._handlerFormSubmit = handlerFormSubmit;
    this._form = this._popup.querySelector("#add-todo-form");
  }

  _getInputValues(evt) {
    const name = evt.target.name.value;
    const dateInput = evt.target.date.value;
    return { name: name, dateInput: dateInput };
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handlerFormSubmit(this._getInputValues(evt));
    });
  }
}
