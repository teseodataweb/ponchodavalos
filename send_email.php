<?php
// CONFIGURA TU CORREO AQUÍ
$to = "tu_correo@ejemplo.com"; 
$subject = "Nuevo mensaje desde el formulario";

// Respuesta en JSON
header('Content-Type: application/json');

// Validación simple
if (!isset($_POST['name'], $_POST['email'], $_POST['message'])) {
    echo json_encode(["status" => "error", "msg" => "Datos incompletos"]);
    exit;
}

$name    = htmlspecialchars($_POST['name']);
$email   = htmlspecialchars($_POST['email']);
$phone   = htmlspecialchars($_POST['phone']);
$area    = htmlspecialchars($_POST['area']);
$message = htmlspecialchars($_POST['message']);

// Cuerpo del mensaje
$body = "
Nombre: $name
Correo: $email
Teléfono: $phone
Área de interés: $area
Mensaje:
$message
";

// Encabezados
$headers = "From: $email\r\n" .
           "Reply-To: $email\r\n" .
           "X-Mailer: PHP/" . phpversion();

// Envío
if (mail($to, $subject, $body, $headers)) {
    echo json_encode(["status" => "success", "msg" => "Mensaje enviado correctamente"]);
} else {
    echo json_encode(["status" => "error", "msg" => "No se pudo enviar el mensaje"]);
}
?>
