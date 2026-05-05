<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../../vendor/autoload.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    exit;
}

$name    = htmlspecialchars(trim($_POST['name'] ?? ''));
$email   = htmlspecialchars(trim($_POST['email'] ?? ''));
$subject = htmlspecialchars(trim($_POST['subject'] ?? ''));
$message = htmlspecialchars(trim($_POST['message'] ?? ''));

if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid email address.']);
    exit;
}

try {
    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host       = '127.0.0.1';
    $mail->Port       = 1025;
    $mail->SMTPAuth   = false;
    $mail->SMTPSecure = false;

    $mail->setFrom($email, $name);
    $mail->addAddress('city@city.com');

    $mail->Subject = $subject;
    $mail->Body    = "You have received a new message from the City website contact form.\n\n"
                   . "Name:    $name\n"
                   . "Email:   $email\n"
                   . "Subject: $subject\n\n"
                   . "Message:\n$message";

    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'Your message has been sent! We will get back to you shortly.']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to send message. Please try again later.']);
}
?>
