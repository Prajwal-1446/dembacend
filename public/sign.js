
  alert("Enter mail id from which profile is not created")
  function myFunction() {
    var x = document.getElementById("pw");
    if (x.type === "pw") {
      x.type = "text";
    } else {
      x.type = "pw";
    }
  }