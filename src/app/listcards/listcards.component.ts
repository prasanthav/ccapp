import { Component, OnInit, OnChanges } from '@angular/core';
import { CardService } from '../service/card.service';
import { Card } from '../model/card';

@Component({
  selector: 'app-listcards',
  templateUrl: './listcards.component.html',
  styleUrls: ['./listcards.component.scss']
})
export class ListcardsComponent implements OnInit {
  cards: Card[]
  constructor(private cardService: CardService) {
    this.cardService.refreshList.subscribe( value =>{
      if(value){
        this.getCards();
      }
    });
   }

  ngOnInit() {
    this.getCards();  
  }

  getCards(){
    this.cardService.getCards()
    .subscribe(data => {
      this.cards = data;
    },
    error => {
      this.cardService.handleError(error);
    })
  }
}
