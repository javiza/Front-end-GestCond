import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedQrService {
  private qrData = new BehaviorSubject<any>(null);
  qrData$ = this.qrData.asObservable();

  setQrData(data: any) {
    this.qrData.next(data);
  }

  getQrData() {
    return this.qrData.getValue();
  }

  clearQrData() {
    this.qrData.next(null);
  }
}
