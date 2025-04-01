
//Popup class. Currently, only popup is when clicking the "Add Todo" button.
//Instantiate the class when clicking "Add Todo" button.
export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector(".popup__close");
    }

    open() {
        this._popup.classList.add("popup_visible");
    }

    close() {
        this._popup.classList.remove("popup_visible");
    }

    _handleEscapeClose() {

    }

    setEventListeners() {
        this._closeButton.addEventListener("click", () => {
            this.close();
        })
    }
}