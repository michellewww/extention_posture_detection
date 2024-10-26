document.getElementById("start-camera").addEventListener("click", startCamera);

async function startCamera() {
  try {
    // Attempt to access the camera
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.getElementById("video");
    video.srcObject = stream;

    // Start capturing images every 10 seconds
    setInterval(() => {
      captureAndStorePhoto(video);
    }, 10000);
  } catch (error) {
    if (error.name === "NotAllowedError") {
      alert(
        "It looks like camera access was denied. To re-enable the prompt, please go to Chrome's site settings and ensure that camera permissions for this extension are set to 'Ask' or 'Allow'. Then click 'Start Camera' again."
      );
    } else {
      console.error("Error accessing webcam:", error);
      alert("Unable to access webcam: " + error.message);
    }
  }
}

function captureAndStorePhoto(videoElement) {
  const canvas = document.createElement("canvas");
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  const context = canvas.getContext("2d");

  // Draw the current video frame onto the canvas
  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  const photoData = canvas.toDataURL("image/png");

  // Store the photo in chrome.storage.local with a unique key
  const timestamp = Date.now();
  chrome.storage.local.set({ [`photo_${timestamp}`]: photoData }, () => {
    console.log(`Photo captured and saved with key: photo_${timestamp}`);
  });
}
