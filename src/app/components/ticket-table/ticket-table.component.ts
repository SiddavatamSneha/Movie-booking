import { Component, OnInit, ViewChild } from '@angular/core';
import { FilmsService } from 'src/app/services/films.service';
import { film, user } from 'src/app/Utilities/films';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatTableDataSource } from '@angular/material/table';

// export interface PeriodicElement {
//     name:string
//     email:string;
//     contact:string;
//     timings:string;
//     tickets:number;
//     movie:string;
//     id:number;
// }

@Component({
  selector: 'app-ticket-table',
  templateUrl: './ticket-table.component.html',
  styleUrls: ['./ticket-table.component.css'],
})
export class TicketTableComponent implements OnInit {
  users_data: user[] = [];
  dataSource: any;

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'contact',
    'movie',
    'timings',
    'tickets',
    'action',
  ];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private _filmService: FilmsService, private dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getUserDetails();
    //this.users_data.paginator = this.paginator;
    console.log('users ', this.users_data);
    this.dataSource = new MatTableDataSource(this.users_data);
  }

  getUserDetails() {
    this._filmService.getUserDetails().subscribe((data: user[]) => {
      this.users_data = data;
    });
  }
  //dataSource = new MatTableDataSource<user>(this.users_data);
  // ngAfterViewInit() {
  //   console.log(this.dataSource);
  //   this.dataSource.paginator = this.paginator;
  // }

  updateTicketDetails(movie_id: Number, ticket: Number) {
    this._filmService.getDetails(movie_id).subscribe((data) => {
      this.movie_data = data;
      // console.log(this.movie_data);

      this.movie_data.tickets += Number(ticket);
      console.log(this.movie_data, 'New Details');
      this._filmService.updateTickets(this.movie_data, movie_id);
    });
  }

  editDetails(element: any) {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: element,
      })
      .afterClosed()
      .subscribe((val) => {
        this.getUserDetails();
      });
  }
  movie_data: any = [];

  deleteUser(id: Number, movie_id: Number, tickets: Number) {
    this.updateTicketDetails(movie_id, tickets);

    this._filmService.deleteUserDetails(id).subscribe({
      next: (res) => {
        alert('Record deleted successfully');
        this.getUserDetails();
      },
      error: () => {
        alert('Error while deleting the record');
      },
    });
  }
}
