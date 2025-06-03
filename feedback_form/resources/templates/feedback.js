const feedbackForm = document.getElementById('feedbackForm');
const feedbackList = document.getElementById('feedbackList');

// Load user info from localStorage
document.getElementById('username').value = localStorage.getItem('username') || '';
document.getElementById('email').value = localStorage.getItem('email') || '';

// Fetch and display all feedbacks
async function fetchFeedbacks() {
  try {
    const response = await fetch('http://localhost:8080/api/feedback');
    const feedbacks = await response.json();
    feedbackList.innerHTML = '';

    feedbacks.forEach(feedback => {
      const li = document.createElement('li');
      li.textContent = `${feedback.name} (${feedback.email}): ${feedback.message}`;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => deleteFeedback(feedback.id);
      li.appendChild(deleteButton);

      feedbackList.appendChild(li);
    });
  } catch (err) {
    console.error('Failed to fetch feedbacks:', err);
  }
}

// Delete feedback by ID
async function deleteFeedback(id) {
  const confirmed = confirm('Are you sure you want to delete this feedback?');
  if (!confirmed) return;

  try {
    const response = await fetch(`http://localhost:8080/api/feedback/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Feedback deleted!');
      fetchFeedbacks();
    } else {
      alert('Error deleting feedback.');
    }
  } catch (err) {
    console.error('Delete failed:', err);
    alert('Error deleting feedback.');
  }
}

// Submit feedback
feedbackForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const feedback = {
    name: document.getElementById('username').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };

  try {
    const response = await fetch('http://localhost:8080/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedback),
    });

    if (response.ok) {
      alert('Feedback submitted successfully!');
      feedbackForm.reset();
      fetchFeedbacks();
    } else {
      alert('Failed to submit feedback.');
    }
  } catch (err) {
    console.error('Submit failed:', err);
    alert('Error submitting feedback.');
  }
});

// Initial load
fetchFeedbacks();
