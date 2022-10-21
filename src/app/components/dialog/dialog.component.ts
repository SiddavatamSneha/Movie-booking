import { Component,Inject ,OnInit } from '@angular/core';
import { FilmsService } from 'src/app/services/films.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { film } from 'src/app/Utilities/films';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  userForm:FormGroup;
  constructor(private _filmService:FilmsService,
    @Inject(MAT_DIALOG_DATA) public editDetails :any, //editDetails contain the row value which we want to edit
    private dialogRef:MatDialogRef<DialogComponent>
    ) { 
    this.userForm = new FormGroup({
      name : new FormControl("" ,[
        Validators.required,
        Validators.maxLength(15)
      ]),
      email :new FormControl("",[
        Validators.required,
        Validators.email,
      ]),
      contact:new FormControl('',[
        Validators.required,
        Validators.maxLength(10)
      ]),
      movie: new FormControl('',[
        Validators.required
      ]),
      timings:new FormControl('',[
        Validators.required,
        
      ]),
      tickets:new FormControl(0,[
        Validators.required,
        
      ])
    })
console.log(this.editDetails);

  }

  
  get name(): any{
    return this.userForm.get('name');
   }


   get email(): any{
    return this.userForm.get('email');
   }


   get contact(): any{
    return this.userForm.get('contact');
   }

   get timings() :any{
    return this.userForm.get('timings');
   }

   get movie(): any{
    return this.userForm.get('movie');
   }

   get tickets(): any{
    return this.userForm.get('tickets');
   }

   
   movie_data:any=[];
   t:Number=0;
  ngOnInit(): void {
    if(this.editDetails){
      this.userForm.controls['name'].setValue(this.editDetails.name);
      this.userForm.controls['email'].setValue(this.editDetails.email);
      this.userForm.controls['contact'].setValue(this.editDetails.contact);
      this.userForm.controls['movie'].setValue(this.editDetails.movie);
      this.userForm.controls['timings'].setValue(this.editDetails.timings);
      this.userForm.controls['tickets'].setValue(this.editDetails.tickets);
      this.userForm.controls['movie'].disable();
      console.log(this.t);
      this._filmService.getDetails(this.editDetails.movie_id).subscribe((data) => {this.movie_data = data;

        
        });

    }
  }

  updateDetails(){
    
   this.t=this.editDetails.tickets-this.userForm.value.tickets;
   this.movie_data.tickets=Number(this.movie_data.tickets)+Number(this.t);
  
    this._filmService.updateTickets(this.movie_data,this.editDetails.movie_id);
    this._filmService.updateUserDetails(this.userForm.value,this.editDetails.id)
    alert("Details updated successfully");
    
        this.userForm.reset();
        this.dialogRef.close('update');
       
  
  }

}
