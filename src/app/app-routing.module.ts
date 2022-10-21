import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { FormComponent } from './components/form/form.component';
import { TicketTableComponent } from './components/ticket-table/ticket-table.component';

const routes: Routes = [
  {
    path:'',
    component:CardsComponent
  },
  {
    path:'book-tickets/:id',
    component:FormComponent
  },
  {
    path:'bookings',
    component:TicketTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
