<?php
require 'PHPMailer-master/PHPMailerAutoload.php'; $mail = new PHPMailer;

if(!isset($_POST['email']))die("<a href='index.php'>403 - Forbidden</a>");

if(isset( $_POST['company_name'])) $company_name = $_POST['company_name'];
else $company_name = "Не задан";

if(isset( $_POST['name']))$name = $_POST['name'];
else $name = "Не задан";

if(isset($_POST['count']))	$count = $_POST['count'];
else $count = "Не задан";

if(isset( $_POST['phone']))	$phone = $_POST['phone'];
else $phone = "Не задан";

if(isset($_POST['email']))	$email = $_POST['email'];
else $email = "Не задан";

$mail->isSMTP();
$mail->SMTPSecure = 'no';
$mail->SMTPAuth = true;
$mail->Host = 'mail.uecentr.kz';
$mail->Port = 25;
$mail->Username = 'uecentr@uecentr.kz'; 
$mail->Password = 'UEcentr123'; 
$mail->setFrom('UECenter@uecentr.kz'); 
$mail->addAddress('erbcreedok@gmail.com'); 
$mail->Subject = "UECenter.kz - new application";
$mail->Body = "Название компании: $company_name\r\nИмя: $name\r\nКол-во человек на аттестацию: $count\r\nТелефон: $phone\r\nЭлектронный адрес: $email";
//send the message, check for errors
if (!$mail->send()) {
die("ERROR: " . $mail->ErrorInfo);} 
sleep(2);
die("success");
?>
