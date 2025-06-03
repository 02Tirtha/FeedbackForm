const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // (Optional) Basic password check (you can add more later)
  if (password.length < 4) {
    alert('Password must be at least 4 characters long.');
    return;
  }

  // Save to localStorage
  localStorage.setItem('username', username);
  localStorage.setItem('email', email);

  // Redirect to feedback page
  window.location.href = 'feedback.html';
});
