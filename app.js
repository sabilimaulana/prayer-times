const getPrayerTimes = async (latitude, longitude) => {
  fetch(
    `http://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=2`
  )
    .then((response) => response.json())
    .then((response) => {
      const data = response.data[new Date().getDate() - 1].timings;

      const app = document.getElementById("app");
      const table = document.createElement("table");
      const tableTBody = document.createElement("tbody");

      for (i in data) {
        const row = tableTBody.insertRow();
        const name = row.insertCell(0);
        const time = row.insertCell(1);

        name.innerHTML = i;
        time.innerHTML = data[i];
        tableTBody.appendChild(row);
      }

      table.appendChild(tableTBody);
      app.appendChild(table);

      console.log(data);
    });
};

const success = (position) => {
  const { latitude, longitude } = position.coords;
  getPrayerTimes(latitude, longitude);
};

const error = () => {
  // Set default latitude and longitude based on Jakarta, Indonesia
  const latitude = -6.2;
  const longitude = 106.816666;

  getPrayerTimes(latitude, longitude);
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
