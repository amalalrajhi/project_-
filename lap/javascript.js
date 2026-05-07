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
