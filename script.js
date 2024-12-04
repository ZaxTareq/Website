document.getElementById("clickMe").addEventListener("click", function() {
  const serverIP = document.getElementById("server-ip").value;
  if (!serverIP) {
    alert("Please enter a server IP!");
    return;
  }

  const resultContainer = document.getElementById("result");
  const statusElement = document.getElementById("status");
  const pingElement = document.getElementById("ping");
  const motdElement = document.getElementById("motd");

  statusElement.innerText = "Pinging...";
  pingElement.innerText = "N/A";
  motdElement.innerText = "N/A";

  fetch(`ping.php?host=${serverIP}`)
    .then(response => response.json())
    .then(data => {
      if (data.status === "online") {
        statusElement.innerText = "Online";
        pingElement.innerText = `${data.ping} ms`;
        motdElement.innerText = data.motd || "No MOTD available";
      } else {
        statusElement.innerText = "Offline";
      }
    })
    .catch(error => {
      alert("Error pinging server. Please try again later.");
      statusElement.innerText = "Error";
    });
});
