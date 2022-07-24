import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentGatewayService {

  constructor(private http: HttpClient) { }

  chargeCard(token: string) {
    //const headers = new Headers({'token': token, 'amount': 100});
    let headers = new Headers();
    headers.append('token', token);
    headers.append('amount','100');
    this.http.post('http://localhost:8080/payment/charge', {headers: headers})
      .subscribe(resp => {
        console.log(resp);
      })
  }
}
