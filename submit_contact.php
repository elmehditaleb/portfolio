<?php
header('Content-Type: application/json'); // Set the content type to JSON

// Load Composer's autoloader
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve and sanitize input data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();                                            
        $mail->Host       = 'smtp.gmail.com';                     
        $mail->SMTPAuth   = true;                                 
        $mail->Username   = 'talebelmehdi2@gmail.com';             
        $mail->Password   = 'lyjy ihav lkgr cpkv';                
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;      
        $mail->Port       = 587;                                  

        // Recipients
        $mail->setFrom($email, $name);      
        $mail->addAddress('talebelmehdi2@gmail.com');          

        // Content
        $mail->isHTML(true);                                      
        $mail->Subject = 'New contact form submission from ' . $name; 
        $mail->Body    = '<strong>Name:</strong> ' . $name . '<br>
                          <strong>Email:</strong> ' . $email . '<br>
                          <strong>Message:</strong> ' . nl2br($message);

        $mail->send();
        header("Location: index.html?success=1"); // Redirect back with a success flag
        exit; // Stop further script execution
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo 'Invalid request method.';
}
?>
