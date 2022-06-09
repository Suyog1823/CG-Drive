document.getElementById("signin").disabled = true;
var fvalid = document.getElementById("i-username");

var usernameValidation = function () {
  let usernameValue = fvalid.value.trim();
  let validFirstName = /^[A-Za-z]+$/;
  let usernameErr = document.getElementById("firstNametag");
  usernameErr.style.color = "red";

  if (usernameValue == "") {
    usernameErr.innerHTML = "Username is required";
  } else if (!validFirstName.test(usernameValue)) {
    usernameErr.innerHTML = "Username must be only string without white spaces";
  } else {
    usernameErr.innerHTML = "";
    document.getElementById("signin").disabled = false;
    return true;
  }
};

fvalid.oninput = function () {
  usernameValidation();
};

var success = document.getElementById("i-password");

success.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    checkUser();
  }
});

document.querySelector(".img-btn").addEventListener("click", function () {
  document.querySelector(".cont").classList.toggle("s-signup");
});

function addData() {
  let user = document.getElementById("u-username").value;
  let password = document.getElementById("u-password").value;
  var curr = new Date();
  var DateTime =
    curr.getFullYear() +
    "-" +
    curr.getMonth() +
    "-" +
    curr.getDay() +
    " " +
    curr.getHours() +
    ":" +
    curr.getMinutes() +
    ":" +
    curr.getSeconds();
  console.log(DateTime);

  var request = {
    method: "POST",
    redirect: "follow",
    body: JSON.stringify({
      Username: user,
      Password: password,
      createdAt: DateTime,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  fetch("http://localhost:61516/api/Users", request)
    .then((response) => response.text())
    .then((result) => sesstorage(result))
    .catch((error) => console.log("error", error));
}

function sesstorage(result) {
  sessionStorage.setItem("token", result.token);
  sessionStorage.setItem("id", result.id);
  sessionStorage.setItem("name", result.name);
  console.log(result);
}

function loc() {
  if (sessionStorage.getItem("token") != null) {
    window.location.href = "Dashboard.html";
  } else {
    alert("Login Credentials are wrong");
  }
}

function checkUser() {
  let username = document.getElementById("i-username").value;
  let password = document.getElementById("i-password").value;

  var request = {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      Username: username,
      Password: password,
    }),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  try {
    fetch("http://localhost:61516/api/login", request)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => showstorage(data));
  } catch (error) {
    alert("you are not valid");
  }
}

function showstorage(data) {
  if (data.token != null && data.token != undefined && data.token != "") {
    console.log(data);
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("id", data.id);
    sessionStorage.setItem("name", data.name);
  }
  loc();
}
function loc() {
  if (sessionStorage.getItem("token") != null) {
    window.location.href = "Dashboard.html";
  } else {
    alert("Login Credentials are wrong");
  }
}
