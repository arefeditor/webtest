const knowledgeBase = [
    {
        domain: 'building',
        keywords: ['بتن', 'فشاری', 'تیر', 'مقاومت'],
        answer: 'برای تیرهای بتنی در معرض شرایط معمول بهره‌برداری، حداقل مقاومت فشاری مشخصه بتن طبق مبحث نهم برای اعضای خمشی متعارف معمولاً حداقل C25 پیشنهاد می‌شود. کنترل ظرفیت خمشی، برش و ترک‌خوردگی مطابق فصل‌های 9-9 و 9-10 الزامی است.',
        references: [
            { title: 'مبحث ۹ مقررات ملی ساختمان', section: 'فصل 9-3 و 9-9 (مقاومت مشخصه و طراحی خمشی)', type: 'سازه بتن' },
            { title: 'آیین‌نامه طرح اختلاط بتن', section: 'حداقل عیار سیمان و دوام محیطی', type: 'بتن' }
        ]
    },
    {
        domain: 'building',
        keywords: ['حریق', 'آتش', 'خروج', 'ایمنی'],
        answer: 'برای ساختمان‌های مسکونی ۳ تا ۵ طبقه، حداقل دو مسیر خروج مستقل با حداقل عرض خالص ۱۱۰ سانتی‌متر نیاز است. درهای خروج باید در جهت خروج باز شوند و جداره راه‌پله مقاوم در برابر حریق حداقل ۹۰ دقیقه داشته باشد.',
        references: [
            { title: 'مبحث ۳ مقررات ملی ساختمان', section: 'بخش 3-4 (راه‌های خروج) و جدول الزامات عرض پله', type: 'ایمنی حریق' },
            { title: 'استاندارد ۱ راه‌پله فرار', section: 'مقاومت حریق جداره‌ها', type: 'استاندارد ملی' }
        ]
    },
    {
        domain: 'labor',
        keywords: ['اضافه کار', 'ساعت', 'کارگر'],
        answer: 'میزان اضافه‌کاری باید با رضایت کارگر انجام شود و حداکثر ۴ ساعت در روز است. نرخ پرداخت معادل ۴۰٪ بیش از مزد هر ساعت کار عادی است. رعایت سقف ۴۴ ساعت کار هفتگی مطابق ماده ۵۱ و ۵۹ قانون کار الزامی است.',
        references: [
            { title: 'قانون کار', section: 'مواد ۵۱ و ۵۹ (ساعات کار و اضافه‌کاری)', type: 'حقوق کار' },
            { title: 'آیین‌نامه حفاظت فنی', section: 'حداکثر زمان کار مجاز در شرایط خاص', type: 'ایمنی کار' }
        ]
    },
    {
        domain: 'insurance',
        keywords: ['بیمه', 'بیکاری', 'حق بیمه', 'پیمانکار'],
        answer: 'در قراردادهای پیمانکاری مشمول طرح عمرانی، میزان حق بیمه طبق بخشنامه‌های سازمان تأمین اجتماعی با نرخ مقطوع (مثلاً ۷٪ دستمزد) محاسبه و به همراه مفاصاحساب پروژه مطالبه می‌شود. استفاده از لیست ماهانه و ارسال برخط سوابق الزامی است.',
        references: [
            { title: 'قانون تأمین اجتماعی', section: 'ماده ۳۸ (تعهدات پیمانکار و کارفرما)', type: 'بیمه' },
            { title: 'بخشنامه نحوه محاسبه حق بیمه قراردادها', section: 'قراردادهای طرح عمرانی و غیرعمرانی', type: 'بخشنامه' }
        ]
    },
    {
        domain: 'budget',
        keywords: ['فهرست بها', 'صورت‌وضعیت', 'برآورد', 'نشریه'],
        answer: 'برای صورت‌وضعیت دوره‌ای در پروژه‌های ابنیه، ردیف‌های فهرست بهای سالانه رشته ابنیه (مثلاً ۱۴۰۳) مبنای قیمت‌گذاری هستند. ضرایب تجهیز کارگاه، بالاسری، تعدیل و منطقه‌ای طبق بخشنامه ابلاغی همان سال اعمال می‌شود.',
        references: [
            { title: 'نشریه ۱۰۱/۱۱۰ فهرست بها ابنیه', section: 'فصل کلیات و ضرایب تجهیز کارگاه', type: 'فهرست بها' },
            { title: 'نشریه ۵۱ شرایط عمومی پیمان', section: 'فصل دوم (صورت‌وضعیت و پرداخت‌ها)', type: 'حقوقی' }
        ]
    }
];

const domainLabels = {
    building: 'مقررات ملی ساختمان',
    labor: 'قانون کار',
    insurance: 'قوانین بیمه و تأمین اجتماعی',
    budget: 'نشریات سازمان برنامه و بودجه'
};

const form = document.getElementById('question-form');
const questionInput = document.getElementById('question');
const detailedInput = document.getElementById('detailed');
const answerBox = document.getElementById('answer');
const answerText = document.getElementById('answer-text');
const answerDomain = document.getElementById('answer-domain');
const referenceList = document.getElementById('reference-list');
let activeDomain = 'building';

function chooseAnswer(question) {
    const normalized = question.trim();
    if (!normalized) return null;

    const candidates = knowledgeBase.filter(item => {
        if (activeDomain && item.domain !== activeDomain) return false;
        return item.keywords.some(kw => normalized.includes(kw));
    });

    if (candidates.length > 0) {
        return candidates[0];
    }

    // fallback: search any domain
    const loose = knowledgeBase.find(item => item.keywords.some(kw => normalized.includes(kw)));
    return loose || null;
}

function renderAnswer(entry) {
    answerBox.classList.remove('hidden');
    answerDomain.textContent = entry ? domainLabels[entry.domain] : 'پیشنهاد عمومی';

    if (entry) {
        const detailNote = detailedInput.checked ? ' • خلاصه آیین‌نامه‌ای: ' : ' ';
        answerText.textContent = entry.answer + detailNote + 'به فصل و جداول مرجع مراجعه شود.';
        referenceList.innerHTML = entry.references.map(ref => `
            <div class="reference-item">
                <strong>${ref.title}</strong><br>
                <span>${ref.section}</span>
                <div class="pill" style="display:inline-block; margin-top:6px;">${ref.type}</div>
            </div>
        `).join('');
    } else {
        answerText.textContent = 'سوال شما نیاز به بررسی دقیق‌تری دارد. لطفاً مبحث یا نشریه مرتبط را مشخص کرده و متن رسمی را کنترل کنید.';
        referenceList.innerHTML = '<div class="reference-item">مبحث‌های ۳، ۶، ۹، ۱۰ مقررات ملی ساختمان و آخرین فهرست بهای سالانه نقطه شروع خوبی هستند.</div>';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const question = questionInput.value;
    const match = chooseAnswer(question);
    renderAnswer(match);
});

// Domain filters
const domainButtons = document.querySelectorAll('#domain-filters .chip');
domainButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        domainButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeDomain = btn.dataset.domain;
    });
});

// Calculator logic
const loadInput = document.getElementById('load-intensity');
const spanInput = document.getElementById('span-length');
const momentResult = document.getElementById('moment-result');
document.getElementById('calc-moment').addEventListener('click', () => {
    const w = parseFloat(loadInput.value);
    const L = parseFloat(spanInput.value);
    if (isNaN(w) || isNaN(L)) {
        momentResult.textContent = 'لطفاً بار و طول را وارد کنید.';
        return;
    }
    const M = (w * Math.pow(L, 2)) / 8;
    momentResult.textContent = `Mmax = ${M.toFixed(2)} kN.m`;
});

const floorLoad = document.getElementById('floor-load');
const floorArea = document.getElementById('floor-area');
const floorResult = document.getElementById('floor-result');
document.getElementById('calc-floor').addEventListener('click', () => {
    const q = parseFloat(floorLoad.value);
    const A = parseFloat(floorArea.value);
    if (isNaN(q) || isNaN(A)) {
        floorResult.textContent = 'لطفاً بار طراحی و مساحت را وارد کنید.';
        return;
    }
    const P = q * A;
    floorResult.textContent = `بار کل = ${P.toFixed(2)} kN`;
});

const rebarDiameter = document.getElementById('rebar-diameter');
const rebarCount = document.getElementById('rebar-count');
const rebarResult = document.getElementById('rebar-result');
document.getElementById('calc-rebar').addEventListener('click', () => {
    const d = parseFloat(rebarDiameter.value);
    const n = parseInt(rebarCount.value, 10);
    if (isNaN(d) || isNaN(n)) {
        rebarResult.textContent = 'قطر و تعداد را پر کنید.';
        return;
    }
    const areaOne = Math.PI * Math.pow(d, 2) / 4;
    const totalArea = areaOne * n;
    rebarResult.textContent = `As = ${totalArea.toFixed(0)} mm²`;
});
