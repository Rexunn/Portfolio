

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