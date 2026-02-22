// 1. ӨЗГӨРМӨЛӨР (Башында бир эле жолу жазылат)
let isSpeaking = false;

// 2. КОТОРМОЛОР СӨЗДҮГҮ
const translations = {
    'kg': {
        'main-title': 'БИЛИМ ПЛАТФОРМАСЫ',
        'sub-title': 'Сапаттуу билим — ийгиликтин ачкычы',
        'nav-math': 'Математика',
        'nav-history': 'Тарых',
        'nav-geo': 'География',
        'nav-it': 'Информатика',
        'ai-btn': '🔊 Сабакты угуу',
        'welcome-title': 'Кош келиңиздер!',
        'welcome-desc': 'Биздин портал аркылуу сиз эң керектүү илимдерди акысыз жана кызыктуу түрдө үйрөнө аласыз.',
        'card-books': 'Китептер',
        'desc-books': 'Биздин бардык электрондук китептер ушул жерде.',
        'btn-books': 'Китепканага кирүү',
        'card-tests': 'Тесттер',
        'desc-tests': 'Өз билимиңизди текшериңиз.',
        'btn-tests': 'Тестти баштоо',
        'card-video': 'Видео сабактар',
        'desc-video': 'Тажрыйбалуу мугалимдерден видео түшүндүрмөлөр.',
        'btn-video': 'Видеолорду көрүү',
        'footer-text': '© 2026 Билим Платформасы'
    },
    'ru': {
        'main-title': 'ОБРАЗОВАТЕЛЬНАЯ ПЛАТФОРМА',
        'sub-title': 'Качественное образование — ключ к успеху',
        'nav-math': 'Математика',
        'nav-history': 'История',
        'nav-geo': 'География',
        'nav-it': 'Информатика',
        'ai-btn': '🔊 Слушать урок',
        'welcome-title': 'Добро пожаловать!',
        'welcome-desc': 'Через наш портал вы можете обучаться самым необходимым наукам бесплатно и интересно.',
        'card-books': 'Книги',
        'desc-books': 'Все наши электронные книги здесь.',
        'btn-books': 'Войти в библиотеку',
        'card-tests': 'Тесты',
        'desc-tests': 'Проверьте свои знания.',
        'btn-tests': 'Начать тест',
        'card-video': 'Видео уроки',
        'desc-video': 'Видео объяснения от опытных учителей.',
        'btn-video': 'Смотреть видео',
        'footer-text': '© 2026 Образовательная Платформа'
    }
};

// 3. САБАКТЫ УГУУ ЖАНА ТОКТОТУУ ФУНКЦИЯСЫ
function speakText() {
    const button = document.querySelector(".ai-button");

    // Эгер азыр сүйлөп жаткан болсо - токтотобуз
    if (window.speechSynthesis.speaking && isSpeaking) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
        // Тилге жараша кайра жазуу
        const currentLang = document.documentElement.lang || 'kg';
        button.innerText = translations[currentLang]['ai-btn'];
        return;
    }

    // Окула турган текстти алуу
    let content = document.body.innerText;
    let speech = new SpeechSynthesisUtterance(content);
    
    speech.lang = 'ru-RU'; // Орусча үн кыргызчага окшошураак
    speech.rate = 1.0;

    speech.onstart = () => {
        isSpeaking = true;
        button.innerText = (document.documentElement.lang === 'ru') ? "🛑 Остановить" : "🛑 Токтотуу";
    };

    speech.onend = () => {
        isSpeaking = false;
        const currentLang = document.documentElement.lang || 'kg';
        button.innerText = translations[currentLang]['ai-btn'];
    };

    window.speechSynthesis.cancel(); 
    window.speechSynthesis.speak(speech);
}

// 4. ТИЛ КОТОРУУ ФУНКЦИЯСЫ
function changeLang(lang) {
    console.log("Тил алмашты: " + lang);
    document.documentElement.lang = lang; // Сайттын тилин белгилөө

    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });
}