import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Angular Training';

  myform: FormGroup;
  email: FormControl;
  emailString: string;
  reverseEmail: string;

  constructor(fb: FormBuilder){

    this.email = new FormControl();

    this.myform = fb.group({
      email: this.email
    });

    this.email.valueChanges.subscribe( item => {
      this.emailString = item;
      this.reverseEmail = item.split('').reverse().join('');
    })

  }

}
