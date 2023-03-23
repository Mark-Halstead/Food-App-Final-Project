$("form[name=signup_form").submit(function(e) {

    var $form = $(this);
    var $error = $form.find(".error");
    var data = $form.serialize();
  
    $.ajax({
      url: "/users/signup",
      type: "POST",
      data: data,
      dataType: "json",
      success: function(resp) {
        console.log(resp);
        window.location.href = "/dashboard"
      },
      error: function(resp) {
        console.log(resp);
      }
    });
    e.preventDefault();
  });


// Login form

$("form[name=login_form").submit(function(e) {

    var $form = $(this);
    var $error = $form.find(".error");
    var data = $form.serialize();
  
    $.ajax({
      url: "/users/login",
      type: "POST",
      data: data,
      dataType: "json",
      success: function(resp) {
        console.log(resp);
        window.location.href = "/dashboard"
      },
      error: function(resp) {
        console.log(resp);
      }
    });
    e.preventDefault();
  });
