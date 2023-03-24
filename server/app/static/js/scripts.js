// Signup form
document.querySelector("form[name=signup_form]").addEventListener("submit", function(e) {
    e.preventDefault();
  
    var form = e.target;
    var error = form.querySelector(".error");
    var data = new FormData(form);
  
    fetch("/users/signup", {
      method: "POST",
      body: data
    })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error occurred during the request");
      }
    })
    .then(function(resp) {
      console.log(resp);
      window.location.href = "/dashboard";
    })
    .catch(function(error) {
      console.log(error);
    });
  });
  
  // Login form
  document.querySelector("form[name=login_form]").addEventListener("submit", function(e) {
    e.preventDefault();
  
    var form = e.target;
    var error = form.querySelector(".error");
    var data = new FormData(form);
  
    fetch("/users/login", {
      method: "POST",
      body: data
    })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error occurred during the request");
      }
    })
    .then(function(resp) {
      console.log(resp);
      window.location.href = "/dashboard";
    })
    .catch(function(error) {
      console.log(error);
    });
  });
  
