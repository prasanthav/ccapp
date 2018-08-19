import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Card } from '../model/card';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public refreshList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showError: BehaviorSubject<String> = new BehaviorSubject<String>(null);
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/ccapp'

  getCards() {
    return this.http.get<Card[]>(this.baseUrl + '/getall');
  }

  addCard(card: Card) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(this.baseUrl + '/add', card, { headers: headers });
  }

  handleError(error){
    console.log(JSON.stringify(error));
    var message = 'Internal Server Error';

    switch(error.status) { 
      case 0: {
        message = 'Service down, please try after sometime';
         break; 
        }  
        case 400:{
          message = 'Bad Request';
          break;
        }
        
        case 500:{
          message = 'Internal Server Error';
          break;
        } 
        default:{
          message = 'Something went wrong';
          break;
        }
    } 
    
    this.showError.next(JSON.stringify(message));
  }
}
