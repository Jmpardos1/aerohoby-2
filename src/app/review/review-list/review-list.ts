import { Component, OnInit } from '@angular/core';
import { Review } from '../review';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-review-list',
  standalone: false,
  templateUrl: './review-list.html',
  styleUrls: ['./review-list.css']
})
export class ReviewListComponent implements OnInit {
  reviews: Review[] = [];
  isLoading = false;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.reviewService.getReviews().subscribe({
      next: (data) => {
        const uid = localStorage.getItem('uid');
        this.reviews = (data || []).filter(r => r.usuarioId === uid);
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
  }

  starRange(puntuacion: number): boolean[] {
    return [1, 2, 3, 4, 5].map(n => n <= puntuacion);
  }
}
