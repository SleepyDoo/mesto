import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(popup) {
        super(popup),
        this._popup = popup,
        this._saveButton = this._popup.querySelector('.form__save-button'),
        this._submitButtonText = 'ДАААА!!!!!!'
        // this._callback = callback,
        // this._callback = this._callback.bind(this)
    }

    // open() {
    //     super.open();
    //     this._submitButton.onclick = this._action


    //     this._saveButton.addEventListener('submit', () => {
    //         this._action();
    //     })
    // }

    // close() {
    //     super.close();
    //     this._saveButton.removeEventListener('submit', () => {
    //         this._action();
    //     })
    // }

    setCallback(callback) {
        this._callback = callback
    }

    
    

    setEventListeners() {
        this._saveButton.addEventListener('click', this._submitEvtHandler);    
        super.setEventListeners();
    }

    // renderLoading(isLoading) {
    //     if(isLoading) { 
    //       this._saveButton.textContent = 'Сохранение...';
    //     }
    //     else {
    //       this._saveButton.textContent = this._submitButtonText;
    //     }
    //   }

      _submitEvtHandler(evt) {
          console.log(this);
        evt.preventDefault();
        // this._saveButton.textContent = 'Сохранение...';
        this._callback()
        .then(() => {
            this.close();
        })
        .finally(() => {
        // this._saveButton.textContent = this._submitButtonText;
        })
      }

}