function audioRecorder() {
  let mediaRecorder = null;
  let audioChunks = [];

  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error(
      "Browser API navigator.mediaDevices.getUserMedia not available"
    );
  }

  function start() {
    audioChunks = [];

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.addEventListener("dataavailable", (event) => {
          audioChunks.push(event.data);
        });

        mediaRecorder.start();
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  function stop() {
    return new Promise((resolve, reject) => {
      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.addEventListener("stop", () => {
          mediaRecorder = null;
          if (audioChunks.length) {
            resolve();
          } else {
            reject(new Error("No audio data available"));
          }
        });

        mediaRecorder.stop();
      } else {
        reject(new Error("MediaRecorder not available or not recording"));
      }
    });
  }

  function audio() {
    const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
    const audioUrl = URL.createObjectURL(audioBlob);

    return audioUrl;
  }

  return {
    start,
    stop,
    audio,
  };
}

export { audioRecorder };
