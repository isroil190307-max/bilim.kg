// 1. SUPABASE КОНФИГУРАЦИЯСЫ
const SUPABASE_URL = 'https://iugnskwqgobuwxabqbnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1Z25za3dxZ29idXd4YWJxYm5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMjY1OTksImV4cCI6MjA4ODkwMjU5OX0.luDTOm7cVb_nvFho-enYijXsr-HDBBoQqCYCzYcpSGA'; 
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. ӨЗГӨРМӨЛӨР ЖАНА КОТОРМОЛОР (Сен жазган бойдон)
let isSpeaking = false;

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

// 3. БАРАКЧАЛАРДЫ КОРГОО (Сен берген эң акыркы логика)
async function checkAccess() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    const protectedPages = ['matematika', 'taryh', 'geografiya', 'informatika', 'math-hard'];
    const currentURL = window.location.href;

    const isProtected = protectedPages.some(page => currentURL.includes(page));

    if (isProtected && !user) {
        console.log("Кирүүгө уруксат жок!");
        alert("Бул бөлүмдү көрүү үчүн алгач сайтка кириңиз!");
        window.location.href = "auth.html";
    }
}

// 4. ПИКИРЛЕР (Load & Send)
async function loadComments() {
    const { data, error } = await supabaseClient
        .from('site_comments')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return;

    const list = document.getElementById('comments-list');
    if (list) {
        list.innerHTML = data.map(c => `
            <li>
                <b>${c.user_name}</b>
                <span style="font-size: 10px; color: gray;">${new Date(c.created_at).toLocaleString()}</span>
                <p>${c.comment_text}</p>
            </li>
        `).join('');
    }
}

async function sendComment() {
    const nameInput = document.getElementById('userName');
    const textInput = document.getElementById('userComment');
    const name = nameInput.value.trim();
    const text = textInput.value.trim();

    if (!name || !text) { alert("Толук жазыңыз!"); return; }

    const { error } = await supabaseClient
        .from('site_comments')
        .insert([{ user_name: name, comment_text: text }]);

    if (!error) {
        textInput.value = '';
        loadComments();
    }
}

// 5. САЙТТЫН ФУНКЦИЯЛАРЫ (Тил, Темы, Чыгуу)
function changeLang(lang) {
    document.documentElement.lang = lang; 
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });
}

function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-theme');
    const btn = document.getElementById('dark-mode-btn');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (btn) btn.innerText = isDark ? "☀️ Жарык режим" : "🌙 Караңгы режим";
}

async function handleLogout() {
    await supabaseClient.auth.signOut();
    window.location.href = "auth.html";
}

// 6. КИРҮҮ ЖАНА КАТТАЛУУ
async function handleLogin() {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) document.getElementById('auth-msg').innerText = "Ката: " + error.message;
    else window.location.href = "profile.html";
}

async function handleSignUp() {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const { error } = await supabaseClient.auth.signUp({ email, password });

    if (error) document.getElementById('auth-msg').innerText = "Ката: " + error.message;
    else document.getElementById('auth-msg').innerText = "Каттоо ийгиликтүү! Почтаны текшериңиз.";
}

// 7. БАРАКЧА ЖҮКТӨЛГӨНДӨ БААРЫН ИШТЕТҮҮ
document.addEventListener('DOMContentLoaded', () => {
    checkAccess(); 
    loadComments();
});