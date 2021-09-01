const getPrayerTimes = async (latitude, longitude) => {
  fetch(
    `http://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=2`
  )
    .then((response) => response.json())
    .then((response) => console.log(response));
};

const success = (position) => {
  const { latitude, longitude } = position.coords;
  getPrayerTimes(latitude, longitude);
};

const error = () => {
  alert("Posisi tidak dapat diakses");
};

const userLocation = () => {
  if (!navigator.geolocation) {
    alert(
      "Geolocation tidak didukung di dalam browser kamu, silahkan gunakan browser lain"
    );
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
};

const index = () => {
  let app = document.getElementById("app");
  let h3 = document.createElement("h3");
  h3.innerHTML = "Prayer Times";

  app.appendChild(h3);

  userLocation();
};

index();
