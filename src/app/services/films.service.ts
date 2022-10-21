import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
// import {default as movie_data} from "data.json";
import { HtmlTagDefinition } from '@angular/compiler';
import { Constant } from '../Utilities/constant';
import { film,user } from '../Utilities/films';
import {catchError, Observable,retry, throwError} from "rxjs"
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  constructor(private httpClient: HttpClient) { }

  getMovies() :Observable<film[]>{
    // return movie_data.movies;
    return this.httpClient.get<film[]>(Constant.Endpoint.toString()).pipe(retry(1), catchError(this.handleError));
  }

  getDetails(id:Number) :Observable<film>{
    // return movie_data.movies;
    return this.httpClient.get<film>(Constant.Endpoint.toString()+`/${id}`).pipe(retry(1), catchError(this.handleError));
  }

  handleError(error :any){
    return throwError(() => {
      console.log("There was an error", error);
    })
  }

  
  updateTickets(postData: Object, id:Number) {
    let endPoints = `/${id}`;
    this.httpClient.put(Constant.Endpoint.toString() + endPoints, postData).subscribe(data => {
      console.log(data,"Hi this works");
    });
  }

  addBookings(data:any, name:String ,movie_id:Number){
    data.movie= name;
    data.movie_id=movie_id;
    this.httpClient.post(Constant.booking.toString(), data).subscribe(data => {console.log(data)});
  }


  getUserDetails(): Observable<user[]>{
    return  this.httpClient.get<user[]>(Constant.booking.toString()).pipe(retry(1), catchError(this.handleError));
  }


  updateUserDetails(Userdata: Object, id:Number):any{
    let endPoints = `/${id}`;
    this.httpClient.put(Constant.booking.toString() + endPoints, Userdata).subscribe(data => {
      console.log(data);
    });
    
  }

  deleteUserDetails(id:Number){
    return this.httpClient.delete(Constant.booking.toString()+`/${id}`);
  }

}
