let isSpeaking = false; // Сүйлөп жатабы же жокпу, ушул жерде сакталат

function speakText() {
    // 1. Эгер азыр сүйлөп жаткан болсо - токтотобуз
    if (window.speechSynthesis.speaking && isSpeaking) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
        document.querySelector(".ai-button").innerText = "🔊 Сабакты угуу";
        return;
    }

    // 2. Эгер сүйлөбөй жаткан болсо - окуп баштайбыз
    let content = document.body.innerText;
    let speech = new SpeechSynthesisUtterance(content);
    speech.lang = 'ru-RU';
    
    // Окуу бүткөндө баскычтын жазуусун кайра өзгөртөбүз
    speech.onend = function() {
        isSpeaking = false;
        document.querySelector(".ai-button").innerText = "🔊 Сабакты угуу";
    };

    window.speechSynthesis.speak(speech);
    isSpeaking = true;
    document.querySelector(".ai-button").innerText = "🛑 Токтотуу";
}