$(document).ready(function() {
  
  $('.nav1').css('display', 'none'); //Profile
  $('.nav2').css('display', 'inline-block'); //Register
  $('.nav3').css('display', 'inline-block'); //Login
  $('.nav4').css('display', 'none'); //Logout
  $('.nav5').css('display', 'none'); //Home
  $('.nav6').css('display', 'none'); //Sign in as
  $('#alert').css('display', 'none');
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {

    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function() {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(handleLoginErr);
      //.catch(function(err) {
       // console.log("girdim" + err);
      //});
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(JSON.stringify(err.statusText));
    //$("#alert").fadein(500);
    $('#alert').css('display', 'inline-block');
    setTimeout(function(){ $('#alert').css('display', 'none'); }, 3000);
  }
});
