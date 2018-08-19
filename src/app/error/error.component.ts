import { Component, OnInit } from '@angular/core';
import { CardService } from '../service/card.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  errorMessage: String;
  constructor(cardService: CardService) {
    cardService.showError.subscribe(errorMessage => {
      this.errorMessage = errorMessage;
    });
  }

  ngOnInit() {
  }

}
