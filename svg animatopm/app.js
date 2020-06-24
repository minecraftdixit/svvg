const btn = document.querySelector('.talk');
const content = document.querySelector('.content');


const greetings = [' I am tanjiro created by ayush dixit on 23 june', 'hello listener', 'i am  tanjiro currently in developing phase hahaha'];

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


const recognition = new SpeechRecognition();

recognition.onstart = function() {
  console.log(' voice is activated ');
};
recognition.onresult = function(event) {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  content.textContent = transcript;
  readOutLoud(transcript);
};

btn.addEventListener('click', () => {
  recognition.start();
});

function readOutLoud(message) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = 'i dont know what is the answer';
  if (message.includes('how are you')) {
    const finalText = greetings[Math.floor(Math.random() * greetings.length)];
    speech.text = finalText;
  }

  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);

}