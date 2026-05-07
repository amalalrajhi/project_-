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
    // إظهار نافذة التأكيد (Confirm Box)
    let userAgreed = confirm("هل أنت متأكد من رغبتك في تبني " + quantity + " من هذه النبتة؟");
    
    if (userAgreed) {
        alert("تم التبني بنجاح! شكراً لمساهمتك 🌿");
        
        // تحديث المخزن برمجياً في الصفحة
        stock -= quantity;
        document.getElementById('stock-count').innerText = stock;
        
        // إعادة تصفير الاختيار إلى 1
        quantity = 1;
        document.getElementById('chosen-quantity').innerText = quantity;
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