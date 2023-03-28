alert("1)Login using your username and password if you have already created a account");
alert("2)If u have not created account then register for free using signup");

function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }