import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FilmsService } from 'src/app/services/films.service';
import { film } from 'src/app/Utilities/films';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private _filmService: FilmsService,
    private dialog: MatDialog
  ) {
    this.myForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contact: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
      ]),
      timings: new FormControl('', [Validators.required]),
      tickets: new FormControl(0, [Validators.required]),
    });
  }

  get name(): any {
    return this.myForm.get('name');
  }

  get email(): any {
    return this.myForm.get('email');
  }

  get contact(): any {
    return this.myForm.get('contact');
  }

  get timings(): any {
    return this.myForm.get('timings');
  }

  get tickets(): any {
    return this.myForm.get('tickets');
  }

  m_id: any;

  movie_data: any = [];
  ngOnInit(): void {
    this.m_id = this.route.snapshot.paramMap.get('id');
    this._filmService.getDetails(this.m_id).subscribe((data: any) => {
      this.movie_data = data;
    });
    console.log(this.movie_data);
  }

  public c = 0;
  public ticket_details=[];

  submitHandlerBook(TicketForm: FormGroup): any {
    if (TicketForm.valid) {
      if (this.movie_data.tickets >= TicketForm.value.tickets) {
        this.movie_data.tickets -= TicketForm.value.tickets;
        localStorage.setItem('id'+this.c, JSON.stringify(TicketForm.value));
        this.c += 1;
        this._filmService.updateTickets(this.movie_data, this.m_id);
        console.log(TicketForm.value);
        this._filmService.addBookings(
          this.myForm.value,
          this.movie_data.name,
          this.movie_data.id
        );
        this.dialog.open(SuccessDialogComponent, {
          width: '30%',
          data: TicketForm.value,
        });
      } else {
        console.log('Sorry - Tickets not avaialble');
        window.alert('Sorry - Tickets not avaialble :(');
      }
    } else {
      console.log('Invalid details - Please enter the correct details');
    }
  }
}
