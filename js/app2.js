Cookies.get("token");
let userEmail = Cookies.get("email");
document.getElementById(
  "welcomeUser"
).innerHTML = `<h2>Welcome ${userEmail}!</h2>`;

function getColoursSuccess(res) {
  console.log(res);
  let colors = res.data.data;
  for (let i = 0; i < colors.length; i++) {
    // let colorsContainer = document.getElementById("colorsContainer");
    // colorsContainer.innerHTML += `<h3>${colors[i].name}</h3><h4>${colors[i].year}</h4>`;
    let newDiv = document.createElement("div");
    colorsContainer.appendChild(
      newDiv
    ).innerHTML += `<h3>${colors[i].name}</h3><h4>${colors[i].year}</h4>`;
    newDiv.classList.add("colourBox");
    newDiv.style.background = `${colors[i].color}`;
  }
}
function getColoursError(err) {
  console.log(err);
}

function getColours(e) {
  axios
    .request({
      method: "GET",
      url: "https://reqres.in/api/unknown",
    })
    .then(getColoursSuccess)
    .catch(getColoursError);
}

window.addEventListener("load", getColours);
