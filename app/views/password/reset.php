<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>AfterClass | Remind</title>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,400,300,600,700' rel='stylesheet' type='text/css'>
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.1/css/bootstrap.min.css" rel="stylesheet">
    <link href="/assets_guest/css/remind.css" type="text/css" rel="stylesheet">
    <link href="/assets_guest/css/welcome.css" type="text/css" rel="stylesheet">
    <?php require('../app/views/partials/google-analytics.php')?>
</head>
<body style="background: url(http://afterclass.co.il/assets/img/B5.jpg) center 30% no-repeat">

<div class="container">
    <header class="header">
        <a href="/" style="margin-left: 25px;">
            <img src="/assets/img/logo.png" style="padding-top: 5px;"/>
        </a>
    </header>
    <div style="height: 1px; background: #ccc;"></div>
    <div style="padding-left: 25px;padding-right: 25px;">
        <h1 class="heading_text">ברוך הבא ל-AfterClass</h1>
        <h4 class="heading_text">
            AfterClass הוא כלי בעזרתו תוכל לשאול ולקבל תשובות ממורים.
        </h4>
        <h4 class="heading_text">
            אז אם גם אתם מתקשים מעט בחומר או בשאלה ספיציפית - מוזמנים להכנס ולקבל תשובות ישירות ממורים!
        </h4>
        <div class="alerts">
        <?php
            $error = Session::get('error');
            if (!empty($error)){
                echo "<div class='alert-danger'>" . $error . "</div>";
            }
            ?>
        </div>
        <h4 class="form-head">Reset password</h4>
        <div class="separator"></div>
        <div class="wrapper">
            <form method="post" action="/reset">
                <input type="hidden" name="token" value="<?php echo $token;?>">
                <input type="email" class="input" name="email" placeholder="Email">
                <input type="password" class="input" name="password" placeholder="New Password">
                <input type="password" class="input" name="password_confirmation" placeholder="Confirm">
                <input type="submit" class="remind_button" value="Reset">
            </form>
        </div>
        <div class="right"></div>
    </div>
</div>

</body>
</html>