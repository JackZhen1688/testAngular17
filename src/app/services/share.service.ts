import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Page {
  csuname: string;
  changed: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  serviceData: any = null;

  private _page$ = new BehaviorSubject<Page>(<Page>({csuname: '', changed: false}));
  changedVar = this._page$.asObservable();

  changeVar(csunameStr: string, changeBln: boolean) //method defined
  {
    let page = <Page>({csuname: csunameStr, changed: changeBln});
    this._page$.next(page);   //assign the page value to _page$
  }

  getServiceData():any {
    return this.serviceData;
  }

  setServiceData(value: any) {
    this.serviceData = value;
  }

}
