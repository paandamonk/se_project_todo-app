import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handlerFormSubmit }, settings) {
    super({ popupSelector });
    this._settings = settings;
    this._handlerFormSubmit = handlerFormSubmit;
    this._form = this._popup.querySelector(this._settings.formSelector);
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(this._settings.inputSelector);
    const values = {};
    this._inputList.forEach((input) => {
      const name = input.name;
      const value = input.value;
      values[name] = value;
    });
    return values;
  }

  getForm() {
    return this._form;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const values = this._getInputValues();
      this._handlerFormSubmit(values);
    });
  }
}
