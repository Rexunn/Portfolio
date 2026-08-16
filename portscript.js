

var form = document.getElementById("contact-form");

async function handleSubmit(event) {
  event.preventDefault(); // stop page from reloading
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Thank you so much for your submission! I'll be in touch soon.";
      form.reset(); // clear form fields
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "Whoops! There was a problem submitting your form"
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Whoops! There was a problem submitting your form"
  });
}

// add the event listener if form exists on the current page
if (form) {
    form.addEventListener("submit", handleSubmit);
}

// toggle button
const themeButton = document.getElementById('theme-toggle');

// Check if the button exists to avoid errors
if (themeButton) {
    themeButton.addEventListener('click', () => {
        // Toggle the class on the body
        document.body.classList.toggle('gradient-mode');
        
        // Optional: Save preference so it remembers on refresh
        if (document.body.classList.contains('gradient-mode')) {
            localStorage.setItem('theme', 'gradient');
        } else {
            localStorage.setItem('theme', 'default');
        }
    });
}

// Check for saved preference when page loads
if (localStorage.getItem('theme') === 'gradient') {
    document.body.classList.add('gradient-mode');
}