let button = document.getElementById('requestPermission');

button.onclick = () => {
  navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia ||
                                        navigator.webkitGetUserMedia ||
                                        navigator.mozGetUserMedia;

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 1280, height: 720 } })
      .then((stream) => {
        console.log('Webcam access granted.');
        alert("Webcam permission granted! You can now close this page.");
        stream.getTracks().forEach(track => track.stop()); // Stop the stream after granting permission
      })
      .catch((err) => {
        console.error(`Error occurred: ${err.name}`);
        alert("Webcam access was denied. Please enable it in Chrome settings.");
      });
  } else {
    console.log("getUserMedia not supported on this browser.");
    alert("Webcam access is not supported on this browser.");
  }
};
