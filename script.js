import { audioRecorder } from "./audioRecorder.js";

const buttonStartRecorder = document.querySelector("#start-recorder");
const buttonPlay = document.querySelector("#audio");

const recorder = audioRecorder();

buttonStartRecorder.addEventListener("click", async () => {
  if (buttonStartRecorder.classList.contains("stop-recording")) {
    buttonStartRecorder.classList.replace("stop-recording", "start-recorder");
    buttonStartRecorder.innerHTML = "Start Recorder";
    await recorder.stop();

    buttonPlay.setAttribute("src", recorder.audio());
  } else {
    buttonStartRecorder.classList.replace("start-recorder", "stop-recording");
    buttonStartRecorder.innerHTML = "Stop Recording";
    recorder.start();
  }
});
