<?php
require 'PHPMailer-master/PHPMailerAutoload.php'; $mail = new PHPMailer;
$mail->isSMTP();
$mail->SMTPSecure = 'no';
$mail->SMTPAuth = true;
$mail->Host = 'mail.uecentr.kz';
$mail->Port = 25;
$mail->Username = 'uecentr@uecentr.kz'; 
$mail->Password = 'UEcentr123'; 
$mail->setFrom('UECenter@uecentr.kz'); 
$mail->addAddress('uecentr.kz@gmail.com'); 
$mail->Subject = "UECenter.kz - new application";
$mail->Body = "Название компании: ";
//send the message, check for errors
if (!$mail->send()) {
die("ERROR: " . $mail->ErrorInfo);} 
sleep(2);
die("success");
?>


