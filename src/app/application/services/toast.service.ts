import { Injectable } from '@angular/core';

import { ToastModel } from '@app/domain';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _toasts: Array<ToastModel> = [];
  get toasts() {
    return this._toasts;
  }

  public add(message: ToastModel) {
    this._toasts.push(message);
    setTimeout(() => this.remove(0), message.duration ?? 4000);
  }

  public remove(index: number) {
    this._toasts.splice(index, 1);
  }
}
