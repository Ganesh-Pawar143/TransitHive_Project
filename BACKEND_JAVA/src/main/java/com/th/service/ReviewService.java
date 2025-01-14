package com.th.service;

import java.util.List;

import com.th.dto.ReviewDTO;

public interface ReviewService {
    ReviewDTO getReviewById(Long id);
    ReviewDTO saveReview(ReviewDTO reviewDTO);
    List<ReviewDTO> getAllReviews();
    void deleteReviewById(Long id);
}
