<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Obtener los campos del formulario y eliminar los espacios en blanco
  $nombre = strip_tags(trim($_POST["nombre"]));
  $nombre = str_replace(array("\r","\n"),array(" "," "),$nombre);
  $correo = filter_var(trim($_POST["correo"]), FILTER_SANITIZE_EMAIL);
  $telefono = trim($_POST["telefono"]);
  $mensaje = trim($_POST["mensaje"]);

  // Verificar que todos los campos requeridos estén completos
  if (empty($nombre) || empty($mensaje) || !filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "Por favor completa todos los campos requeridos.";
    exit;
  }

  // Establecer la dirección de correo electrónico del destinatario
  $para = "mtri21019@gmail.com";

  // Establecer el asunto del correo electrónico
  $asunto = "Nuevo mensaje de $nombre";

  // Construir el contenido del correo electrónico
  $contenido_correo = "Nombre: $nombre\n";
  $contenido_correo .= "Correo electrónico: $correo\n";
  $contenido_correo .= "Teléfono: $telefono\n";
  $contenido_correo .= "Mensaje:\n$mensaje\n";

  // Construir los encabezados del correo electrónico
  $encabezados = "From: $nombre <$correo>";

  // Enviar el correo electrónico
  if (mail($para, $asunto, $contenido_correo, $encabezados)) {
    http_response_code(200);
    echo "¡Gracias! Tu mensaje ha sido enviado.";
  }
  else {
    http_response_code(500);
    echo "Ha ocurrido un error al enviar tu mensaje. Por favor inténtalo de nuevo más tarde.";
  }
}
else {
  http_response_code(403);
  echo "Ha ocurrido un error al enviar tu mensaje. Por favor inténtalo de nuevo más tarde.";
}
