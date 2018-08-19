import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardService } from '../service/card.service';
import { cardValidator } from './card-validator';

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.component.html',
  styleUrls: ['./addcard.component.scss']
})
export class AddcardComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private cardService: CardService) {
    this.addForm = this.formBuilder.group({
    name: ['', Validators.required],
      ccNumber: ['', Validators.required, cardValidator],
      creditLimit: ['', Validators.pattern(/^[1-9]\d*(,\d+)?$/)]
    });
  }
  addForm: FormGroup;

  ngOnInit() {
  }

  onSubmit() {
    this.cardService.addCard(this.addForm.value)
      .subscribe(data => {
        this.cardService.refreshList.next(true);
        this.cardService.showError.next(null);
      },
      error => {
        this.cardService.handleError(error);
      });
  }
}
