import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut, expand } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  formStatus = 'new';
  submission: Feedback = { firstname: '', lastname: '', telnum: 0, email: '', agree: false, contacttype: 'None', message: ''};
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First name is required.',
      'minlength': 'First name must be atleast 2 characters long',
      'maxlength': 'First name cannot be more than 25 characters'
    },
    'lastname': {
      'required': 'Last name is required.',
      'minlength': 'Last name must be atleast 2 characters long',
      'maxlength': 'Last name cannot be more than 25 characters'
    },
    'telnum': {
      'required': 'Tel. number is required.',
      'pattern': 'Tel. number must contain only numbers'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format'
    }
  };

  constructor(private fb: FormBuilder,
    private feedbackService: FeedbackService) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern ] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages

  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    // Both feedback and feedbackForm have the same structure in this case, however
    // if that isn't the case you must explicitly map each valid property between the two
    this.feedback = this.feedbackForm.value;
    this.formStatus = 'processing';
    this.feedbackService.submitFeedback(this.feedback)
      .subscribe(submission => {this.submission = submission; this.formStatus='show'});
    setTimeout(() => this.formStatus='new', 5000);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }



}
