import { Component, OnInit } from '@angular/core';
import { ContactListService } from 'src/app/services/contact-list.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  title: string;
  contact: Contact;

  constructor(private activatedRoute: ActivatedRoute, private flashMessage: FlashMessagesService,
              private contactListService: ContactListService, private router: Router) { }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.title;
    this.contact = new Contact();

    this.activatedRoute.params.subscribe(params => {
      this.contact._id = params.id;
    });

    if (this.title === 'Edit Contact') {
      this.getContact(this.contact);
    }
  }

  private getContact(contact: Contact): void {
    this.contactListService.getContact(contact).subscribe(data => {
      this.contact = data.contact;
    });
  }

  onDetailsPageSubmit(): void {
    switch (this.title) {
      case 'Add Contact':
      this.contactListService.addContact(this.contact).subscribe(data => {
        if (data.success) {
          this.flashMessage.show('Contact has been added.', {cssClass: 'alert-success', timeOut: 3000});
          this.router.navigate(['/contact/contact-list']);
        } else {
          this.flashMessage.show('Contact was not added.', {cssClass: 'alert-danger', timeOut: 3000});
          this.router.navigate(['/contact/contact-list']);
        }
      });
      break;

      case 'Edit Contact':
      console.log(this.contact);
      this.contactListService.editContact(this.contact).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
          this.router.navigate(['/contact/contact-list']);
        } else {
          this.flashMessage.show('Contact was not edited.', {cssClass: 'alert-danger', timeOut: 3000});
          this.router.navigate(['/contact/contact-list']);
        }
      });
      break;
    }
  }

}
