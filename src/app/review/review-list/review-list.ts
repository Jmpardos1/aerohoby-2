import { Component, OnInit } from '@angular/core';
import { Review } from '../review';
import { ReviewService } from '../review.service'; // Asumiendo que nombraste al servicio review.service.ts

@Component({
  selector: 'app-review-list',
  standalone: false,
  templateUrl: './review-list.html',
  styleUrls: ['./review-list.css']   
})
export class ReviewListComponent implements OnInit {
  reviews: Review[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.cargarReviews();
  }

  cargarReviews(): void {
    this.reviewService.getReviews().subscribe({
      next: (data) => {
        this.reviews = data || [];
      },
      error: (err) => {
        console.error('Error al cargar las reseñas', err);
      }
    });
  }
}
