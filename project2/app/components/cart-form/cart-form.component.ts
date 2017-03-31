import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { ValidationService } from './validation.service';
import { ControlMessagesComponent } from './control-messages.component'

@Component({
  selector: 'cart-form',
  template: require('./cart-form.component.html'),
  providers: [ ValidationService ],
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, ControlMessagesComponent],


})

export class CartForm {

  public cartForm: FormGroup;

  constructor(private fb: FormBuilder, private validate: ValidationService) {}

  ngOnInit() {
    this.cartForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, ValidationService.emailValidator]]
    });
  }

   saveUser() {
    if (this.cartForm.dirty && this.cartForm.valid) {
      alert(`Name: ${this.cartForm.value.name} Email: ${this.cartForm.value.email}`);
    }
  }
}
