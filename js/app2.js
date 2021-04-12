//put cookies in variables to use later
var token = Cookies.get("token");
let userEmail = Cookies.get("email");

//welcome message when user gets to page
document.getElementById(
  "welcomeUser"
).innerHTML = `<h2>Welcome ${userEmail}!</h2>`;

//logout button removes the cookies and sends user back to login  page
function logout() {
  if (token) {
    Cookies.remove("token");
    Cookies.remove("email");
    window.open("./index.html", "_self");
  }
}
//function called on page load, so anything I want to be loaded on page load is here
function getColoursSuccess(res) {
  document.getElementById(
    "welcomeUser"
  ).innerHTML += `<button id="logoutBtn" onclick="logout()">Logout</button>`;
  console.log(res);
  let colors = res.data.data;
  //loops through colours data
  for (let i = 0; i < colors.length; i++) {
    //create a div, append it to the 'colorsContainer' so the names can be on top of the boxes
    let newDiv = document.createElement("div");
    colorsContainer.appendChild(
      newDiv
    ).innerHTML += `<h3>${colors[i].name}</h3><h4>${colors[i].year}</h4>`;
    //add class so that I can add styling
    newDiv.classList.add("colourBox");
    //make background of the new element the colour of the hex code given
    newDiv.style.background = `${colors[i].color}`;
  }
}
//error fn
function getColoursError(err) {
  console.log(err);
}
//if user doesn't login
function retryLogin() {
  window.open("./index.html", "_self");
}
//if the login token cookie is undefined,
if (token === undefined) {
  //give user a little message n a button to go back and login
  document.getElementById(
    "welcomeUser"
  ).innerHTML = `<h2>Sorry! It appears you're not logged in</h2>`;
  document.getElementById(
    "welcomeUser"
  ).innerHTML += `<button id="retryLoginBtn">Login now</button>`;
  let retryLoginBtn = document.getElementById("retryLoginBtn");
  //call the 'retry login' function above that sends user back to homepage
  retryLoginBtn.addEventListener("click", retryLogin);
}
//otherwise if the cookie is defined, send the request for the colours
else if (token) {
  axios
    .request({
      method: "GET",
      url: "https://reqres.in/api/unknown",
    })
    .then(getColoursSuccess)
    .catch(getColoursError);
}
