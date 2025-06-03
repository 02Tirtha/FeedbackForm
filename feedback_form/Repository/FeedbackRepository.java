package com.example.feedback_form.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.feedback_form.Entity.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
}

