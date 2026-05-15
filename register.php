<?php  
  
require_once '../config/db.php';  
  
$error = '';  
  
if ($_SERVER['REQUEST_METHOD'] == 'POST') {  
  
    $email = $_POST['email'];  
    $password = $_POST['password'];  
  
    $pdo = getConnection();  
  
    $sql = "SELECT * FROM users WHERE email = ?";  
  
    $stmt = $pdo->prepare($sql);  
  
    $stmt->execute([$email]);  
  
    $user = $stmt->fetch();  
  
    if ($user) {  
  
        if (password_verify($password, $user['password_hash'])) {  
  
            session_start();  
  
            $_SESSION['user_id'] = $user['user_id'];  
            $_SESSION['user_name'] = $user['name'];  
  
            header("Location: ../index.php");  
            exit;  
  
        } else {  
  
            $error = "كلمة المرور غير صحيحة";  
  
        }  
  
    } else {  
  
        $error = "البريد الإلكتروني غير موجود";  
  
    }  
}  
  
?>  
  
<!DOCTYPE html>  
<html lang="ar" dir="rtl">  
  
<head>  
  <meta charset="utf-8">  
  <meta name="viewport" content="width=device-width, initial-scale=1.0">  
  <title>تسجيل الدخول - رواء</title>  
  
  <style>  
  
    body {  
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;  
      background-color: #f9fbf9;  
      display: flex;  
      justify-content: center;  
      align-items: center;  
      height: 100vh;  
      margin: 0;  
    }  
  
    .login-container {  
      background-color: white;  
      padding: 40px;  
      border-radius: 15px;  
      width: 100%;  
      max-width: 400px;  
      text-align: center;  
      border-top: 5px solid #2d6a4f;  
      box-shadow: 0 10px 25px rgba(0,0,0,0.05);  
    }  
  
    h2 {  
      color: #2d6a4f;  
      margin-bottom: 25px;  
    }  
  
    .input-group {  
      margin-bottom: 20px;  
      text-align: right;  
    }  
  
    label {  
      display: block;  
      margin-bottom: 8px;  
      font-weight: bold;  
    }  
  
    input[type="email"],  
    input[type="password"] {  
  
      width: 100%;  
      padding: 12px;  
      border: 1px solid #ddd;  
      border-radius: 8px;  
      box-sizing: border-box;  
    }  
  
    input[type="submit"] {  
  
      width: 100%;  
      padding: 12px;  
      background-color: #2d6a4f;  
      color: white;  
      border: none;  
      border-radius: 25px;  
      font-size: 16px;  
      cursor: pointer;  
    }  
  
    input[type="submit"]:hover {  
      background-color: #1b4332;  
    }  
  
    .error {  
      color: red;  
      margin-bottom: 15px;  
    }  
  
    .register-link {  
      margin-top: 15px;  
      font-size: 14px;  
    }  
  
    .register-link a {  
      color: #2d6a4f;  
      text-decoration: none;  
    }  
  
  </style>  
</head>  
  
<body>  
  
<div class="login-container">  
  
  <h2>تسجيل الدخول</h2>  
  
  <?php if($error != '') { ?>  
    <p class="error"><?php echo $error; ?></p>  
  <?php } ?>  
  
  <form method="post">  
  
    <div class="input-group">  
      <label for="email">البريد الإلكتروني</label>  
      <input type="email" name="email" id="email" required>  
    </div>  
  
    <div class="input-group">  
      <label for="password">كلمة المرور</label>  
      <input type="password" name="password" id="password" required>  
    </div>  
  
    <input type="submit" value="دخول">  
  
  </form>  
  
  <div class="register-link">  
    ليس لديك حساب؟ <a href="register.php">إنشاء حساب</a>  
  </div>  
  
</div>  
  
</body>  
</html>  
