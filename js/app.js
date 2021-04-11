function userLoginSuccess(res) {
  console.log(res);
  Cookies.set("token", `${res.data.token}`);
  let userEmail = document.getElementById("emailInput").value;
  Cookies.set("email", `${userEmail}`);
  window.open("./second.html", "_self");
}
function userLoginError(err) {
  console.log(err);
  document.getElementById(
    "loginStatus"
  ).innerHTML = `<h2>Sorry, please try again</h2>`;
}
function userLogin(e) {
  axios
    .request({
      method: "POST",
      url: "https://reqres.in/api/login",
      Headers: { "Content-Type": "application/json" },
      data: {
        email: document.getElementById("emailInput").value,
        password: document.getElementById("passwordInput").value,
      },
    })
    .then(userLoginSuccess)
    .catch(userLoginError);
}
let submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", userLogin);
