// 'use strict mode'

const textInput = document.getElementById('text');
const voiceSelect = document.getElementById('voiceSelect');
const speakButton = document.getElementById('speakBtnCon');
const pauseButton = document.getElementById('pauseBtnCon');
const resumeButton = document.getElementById('resumeBtnCon');

let utterance;
let voices = [];
let isPaused = false;

const populateVoiceList = () => {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = '';

    voices.forEach(voice => {
        const option = document.createElement('option');
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
};

speechSynthesis.onvoiceschanged = populateVoiceList;

speakButton.addEventListener('click', function (e) {
    e.preventDefault();
    const text = textInput.value.trim();

    if (!text) {
        alert("Please enter some text.");
        return;
    }

    if (utterance) {
        speechSynthesis.cancel();
    }

    utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
    utterance.voice = voices.find(voice => voice.name === selectedVoice);


    utterance.onend = () => {
        isPaused = false;
        utterance = null;
    };

    speechSynthesis.speak(utterance);
    isPaused = false; 
});

pauseButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (speechSynthesis.speaking && !isPaused) {
        speechSynthesis.pause()
    }
            
     utterance.onpause = () => {
        isPaused = true;
    };
});

resumeButton.addEventListener('click', function (e) {
   e.preventDefault();
    if (isPaused) {
             speechSynthesis.resume();
            isPaused = false;
        }
    });

window.addEventListener('beforeunload', () => {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
});
  


