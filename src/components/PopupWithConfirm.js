import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(popup) {
        super(popup),
        this._popup = popup,
        this._saveButton = this._popup.querySelector('.form__save-button'),
        this._submitButtonText = this._saveButton.textContent
    }

    setCallback(callback) {
        this._callback = callback
    }

    
    

    setEventListeners() {
        this._saveButton.onclick = (evt) => this._submitEvtHandler(evt);    
        super.setEventListeners();
    }

    renderLoading(isLoading) {
        if(isLoading) { 
          this._saveButton.textContent = 'Сохранение...';
        }
        else {
          this._saveButton.textContent = this._submitButtonText;
        }
      }

      _submitEvtHandler(evt) {
        this.renderLoading(true);
        evt.preventDefault();
        this._callback()
        // .then(() => {
        //     this.close();
        // })
        .finally(() => {
        this.renderLoading(false)
        })
      }

}