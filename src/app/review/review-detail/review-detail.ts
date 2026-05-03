import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 

import { Review } from '../review';
import { ReviewService } from '../review.service'; 

@Component({
  selector: 'app-review-detail',
  standalone: false,
  templateUrl: './review-detail.html', 
  styleUrls: ['./review-detail.css']   
})
export class ReviewDetailComponent implements OnInit {
  review: Review | undefined;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {}

 ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isLoading = true; 
        this.reviewService.getReviewById(id).subscribe({
          next: (data) => {
            this.review = data;
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error al cargar el detalle', err);
            this.isLoading = false;
          }
        });
      }
    });
  }
  
}
