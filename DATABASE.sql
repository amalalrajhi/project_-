-- 🌿 نظام تبني النباتات
CREATE DATABASE rawa;
USE rawa;
-- 1) جدول المستخدمين
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(100) NOT NULL
);


-- 2) جدول النباتات
CREATE TABLE plants (
    plant_id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    category ENUM(
        'النباتات المزهرة',
        'النباتات المنزلية',
        'نباتات مميزة',
        'نباتات داخلية'
    ),

    description TEXT,

    image_url VARCHAR(500),

    stock INT NOT NULL DEFAULT 10,

    status ENUM(
        'تحت العناية',
        'متاحة',
        'محجوزة',
        'تم تبنيها'
    ) NOT NULL DEFAULT 'متاحة',

    care_level ENUM(
        'سهل',
        'متوسط',
        'متقدم'
    ) DEFAULT 'سهل'
);


-- 3) إضافة بيانات النباتات
INSERT INTO plants
(
    name,
    category,
    description,
    image_url,
    stock,
    status,
    care_level
)
VALUES

(
    'الياسمين',
    'النباتات المزهرة',
    'نبتة عطرية تنشر الجمال',
    'jasmine.jpg',
    10,
    'متاحة',
    'متوسط'
),

(
    'التوليب',
    'النباتات المزهرة',
    'زهرة رقيقة تعشق الأجواء الهادئة',
    'tulip.jpg',
    10,
    'محجوزة',
    'متقدم'
),

(
    'البوتس',
    'النباتات المنزلية',
    'نبتة تضيف الحياة للمكان',
    'pothos.jpg',
    10,
    'تم تبنيها',
    'سهل'
),

(
    'الصبار',
    'النباتات المنزلية',
    'نبتة قوية تتحمل الظروف',
    'cactus.jpg',
    10,
    'متاحة',
    'سهل'
),

(
    'اللافندر',
    'نباتات مميزة',
    'نبتة مريحة',
    'lavender.jpg',
    10,
    'متاحة',
    'متقدم'
),

(
    'النعناع',
    'نباتات مميزة',
    'نبتة منعشة',
    'mint.jpg',
    10,
    'متاحة',
    'سهل'
),

(
    'الفيكس',
    'نباتات داخلية',
    'نبتة أنيقة',
    'ficus.jpg',
    10,
    'تحت العناية',
    'متوسط'
),

(
    'المونستيرا',
    'نباتات داخلية',
    'نبتة مميزة',
    'monstera.jpg',
    10,
    'متاحة',
    'متوسط'
);


-- 4) جدول التبني
CREATE TABLE adoptions (
    adoption_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    plant_id INT NOT NULL,

    quantity INT NOT NULL DEFAULT 1,

    notes TEXT,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id),

    FOREIGN KEY (plant_id)
        REFERENCES plants(plant_id)
);


-- 5) View النباتات المتاحة
CREATE VIEW v_available_plants AS

SELECT
    plant_id,
    name,
    care_level,
    stock,
    status

FROM plants

WHERE status = 'متاحة'
AND stock > 0;


-- 6) عرض البيانات
SELECT * FROM users;

SELECT * FROM plants;

SELECT * FROM adoptions;

SELECT * FROM v_available_plants;
