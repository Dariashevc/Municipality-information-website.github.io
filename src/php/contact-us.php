<?php

$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$to = "admin@city.local";

$headers = "From: $email";

$fullMessage = "
Name: $name
Email: $email

Message:
$message
";

mail($to, $subject, $fullMessage, $headers);

echo "Message sent successfully!";

?>