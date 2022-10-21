import { Component, OnInit } from '@angular/core';
import { FilmsService } from 'src/app/services/films.service';
import { Router } from '@angular/router';
import { film } from 'src/app/Utilities/films';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  public movie_data: film[] = [];
  constructor(private _filmService: FilmsService, private route: Router) {}

  ngOnInit(): void {
    this._filmService.getMovies().subscribe((data: film[]) => {
      this.movie_data = data;
    });
    console.log(this.movie_data);
  }

  onSelect(id: Number) {
    this.route.navigate(['/book-tickets', id]);
  }
}
