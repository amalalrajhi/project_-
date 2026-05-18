// المتغيرات الأساسية
let stock = 10; 
let quantity = 1;

// دالة التحكم في الأزرار (+ و -)
function changeQuantity(change) {
    let newQuantity = quantity + change;

    // التأكد من عدم تجاوز المخزن أو النزول عن 1
    if (newQuantity >= 1 && newQuantity <= stock) {
        quantity = newQuantity;
        document.getElementById('chosen-quantity').innerText = quantity;
    } else if (newQuantity > stock) {
        alert("عذراً، الكمية المطلوبة غير متوفرة في المخزن حالياً.");
    }
}

// دالة تأكيد التبني وإظهار الرسائل
function confirmAdoption() {
    const quantity = parseInt(document.getElementById('chosen-quantity').innerText);
    const stockElement = document.getElementById('stock-count');
    let currentStock = parseInt(stockElement.innerText);

    if (currentStock >= quantity) {
        // 1. تنقيص المخزون
        currentStock -= quantity;
        stockElement.innerText = currentStock;

        // 2. إظهار تنبيه بسيط (اختياري)
        alert("تم تسجيل طلبكم بنجاح!");

        // 3. الانتقال لصفحة الشكر (هذا هو سطر الربط)
        window.location.href = "thank.html"; 
    } else {
        alert("عذراً، الكمية المطلوبة غير متوفرة في المخزون حالياً.");
    }
}

function goToPlantPage() {
    let input = document.getElementById('plantsSearch').value.trim();
    
    let pages = {
        "البوتس": "pothos.html",
        "الصبار": "cactus.html",
        "الياسمين": "jasmine.html",
        "اللافندر": "lavender.html",
        "النعناع": "mint.html",
        "توليب": "tulip.html",
        "المونستيرا": "monstera.html"
    };

    if (pages[input]) {
        window.location.href = pages[input];
    } else {
        alert("يرجى اختيار اسم نبتة صحيح من القائمة");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // سحب الهيدر
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        });

    // سحب الفوتر
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
});
// صحة البيانات

function setupFormValidation() {
    const form = document.querySelector('form');
    const nameInput = document.getElementsByName('name')[0];
    const emailInput = document.getElementsByName('email')[0];
    const passwordInput = document.getElementsByName('password')[0];
    
    if (form && nameInput && emailInput && passwordInput) {
        emailInput.type = "text";

        const nameError = document.createElement('span');
        const emailError = document.createElement('span');
        const passwordError = document.createElement('span');
        
        [nameError, emailError, passwordError].forEach(span => {
            span.style.color = "#d90429";
            span.style.fontSize = "13px";
            span.style.display = "block";
            span.style.marginTop = "5px";
            span.style.fontWeight = "bold";
            span.style.textAlign = "right";
        });
        
        nameInput.parentNode.appendChild(nameError);
        emailInput.parentNode.appendChild(emailError);
        passwordInput.parentNode.appendChild(passwordError);
        
        form.addEventListener('submit', function(event) {
            let nameValue = nameInput.value.trim();
            let emailValue = emailInput.value.trim();
            let passwordValue = passwordInput.value.trim();
            
            nameError.innerText = "";
            emailError.innerText = "";
            passwordError.innerText = "";
            
            let isValid = true;
            
            if (nameValue === "") {
                nameError.innerText = "⚠️ حقل الاسم مطلوب ولا يمكن تركه فارغاً.";
                isValid = false;
            }
            
            if (emailValue === "") {
                emailError.innerText = "⚠️ حقل البريد الإلكتروني مطلوب.";
                isValid = false;
            } else if (!emailValue.includes('@') || !emailValue.includes('.')) {
                emailError.innerText = "⚠️ صيغة البريد غير صحيحة (يجب أن يحتوي على @ و .)";
                isValid = false;
            }
            
            if (passwordValue === "") {
                passwordError.innerText = "⚠️ حقل كلمة المرور مطلوب.";
                isValid = false;
            } else if (passwordValue.length < 6) {
                passwordError.innerText = "⚠️ كلمة المرور يجب ألا تقل عن 6 خانات.";
                isValid = false;
            }
            
            if (!isValid) {
                event.preventDefault();
                alert("يرجى تصحيح الأخطاء الحمراء أولاً.");
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    setupFormValidation();
});
