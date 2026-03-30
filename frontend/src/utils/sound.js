import sendSound from "../assests/sounds/send.mp3";
import receiveSound from "../assests/sounds/receive.mp3";
import successSound from "../assests/sounds/success.mp3";

const sendAudio = new Audio(sendSound);
const receiveAudio = new Audio(receiveSound);
const successAudio = new Audio(successSound);

export const playSendSound = () => {
  sendAudio.currentTime = 0;
  sendAudio.play();
};

export const playReceiveSound = () => {
  receiveAudio.currentTime = 0;
  receiveAudio.play();
};

export const playSuccessSound = () => {
  successAudio.currentTime = 0;
  successAudio.play();
};