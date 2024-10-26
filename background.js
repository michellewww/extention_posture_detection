chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === "checkCameraPermission") {
      chrome.contentSettings['mediaStreamCamera'].get(
        { primaryUrl: sender.origin },
        (details) => {
          if (details.setting === 'block') {
            // Request to allow camera access
            chrome.contentSettings['mediaStreamCamera'].set({
              primaryPattern: sender.origin,
              setting: 'allow'
            }, () => {
              sendResponse({ status: "updated", message: "Camera permission updated. Please try accessing the camera again." });
            });
          } else {
            sendResponse({ status: "allowed", message: "Camera permission is already allowed." });
          }
        }
      );
      return true; // Keeps the message channel open for async `sendResponse`
    }
  });
  