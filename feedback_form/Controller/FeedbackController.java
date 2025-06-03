package com.example.feedback_form.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.feedback_form.Entity.Feedback;
import com.example.feedback_form.Repository.FeedbackRepository;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "*")
public class FeedbackController {

    @Autowired
    private FeedbackRepository repository;

    @PostMapping
    public Feedback addFeedback(@RequestBody Feedback feedback) {
        return repository.save(feedback);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Feedback> updateFeedback(@PathVariable Long id, @RequestBody Feedback updated) {
        return repository.findById(id).map(fb -> {
            fb.setName(updated.getName());
            fb.setEmail(updated.getEmail());
            fb.setMessage(updated.getMessage());
            repository.save(fb);
            return ResponseEntity.ok(fb);
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Feedback> getAllFeedbacks() {
        return repository.findAll();
    }

    @DeleteMapping("/api/feedback/{id}")
public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
    repository.deleteById(id);
    return ResponseEntity.noContent().build();
}

}
