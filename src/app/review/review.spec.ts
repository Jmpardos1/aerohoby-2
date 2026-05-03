import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importante para simular peticiones HTTP
import { ReviewService } from './review.service';

describe('ReviewService', () => { 
  let service: ReviewService; 
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] 
    });
    service = TestBed.inject(ReviewService);
  });

  it('se debe crear', () => {
    expect(service).toBeTruthy();
  });
});
