const inputs = document.querySelectorAll("input");
const btnLogin = document.getElementById("btnLogin");
const formData = document.querySelector("form");


const mode = document.getElementById("mode");
if (localStorage.getItem("theme") != null) {
   const themeData = localStorage.getItem("theme");

   if (themeData === "light") {
      mode.classList.replace("fa-sun", "fa-moon");
   } else {
      mode.classList.replace("fa-moon", "fa-sun");
   }

   document.querySelector("html").setAttribute("data-theme", themeData);
}
let isValid = false;
//--------------------events----------------------
btnLogin.addEventListener("click", function () {});
formData.addEventListener("submit", function (e) {
  e.preventDefault();
  if (isValid) {
    setForm();
  }
});
formData.addEventListener("input", function () {
  if (validationEmail() && validationPassword()) {
    isValid = true;
  } else {
    isValid = false;
  }
});

//--------------------functions----------------------
function setForm() {
  const user = {

    email: inputs[0].value,
    password: inputs[1].value,

  };
  loginForm(user);
}
async function loginForm(userData) {
  const api = await fetch(`https://movies-api.routemisr.com/signin`, {
    method: "post",
    body: JSON.stringify(userData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const response = await api.json();
  if (response.message === "success") {
    console.log('succes');
    location.href = "../home.html";
  } else {
    console.log('fail');
    document.getElementById("msg1").innerHTML = response.message;
  }
  if (response.message === "success") {
    localStorage.setItem("uToken", response.token);
    location.href = "./home.html";
 } else {
    document.getElementById("msg").innerHTML = response.message;
 }
  console.log(response);
}

//--------------------validation----------------------

function validationEmail() {
  let regexStyle =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (regexStyle.test(inputs[0].value)) {
    inputs[0].classList.add("is-valid");
    inputs[0].classList.remove("is-invalid");
    return true;
  } else {
    inputs[0].classList.add("is-invalid");
    inputs[0].classList.remove("is-valid");
    return false;
  }
}
function validationPassword() {
  let regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (regexStyle.test(inputs[1].value)) {
    inputs[1].classList.add("is-valid");
    inputs[1].classList.remove("is-invalid");
    return true;
  } else {
    inputs[1].classList.add("is-invalid");
    inputs[1].classList.remove("is-valid");
    return false;
  }
}
mode.addEventListener("click", function (e) {
  if (mode.classList.contains("fa-sun")) {
     document.querySelector("html").setAttribute("data-theme", "light");
     mode.classList.replace("fa-sun", "fa-moon"); // change icon -->moon

     localStorage.setItem("theme", "light");
  } else {
     mode.classList.replace("fa-moon", "fa-sun"); //change icon -->sun
     document.querySelector("html").setAttribute("data-theme", "dark");
     localStorage.setItem("theme", "dark");
  }
});