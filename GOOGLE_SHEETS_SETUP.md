# Configuracion de Google Sheets + Apps Script para Lead Form

## Paso 1: Crear la hoja de calculo

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de calculo llamada "Poncho Davalos - Leads"
3. En la primera fila, agrega estos encabezados:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Timestamp | Name | Email | Phone | Interest | Guide | Language |

## Paso 2: Crear el Apps Script

1. En tu hoja de calculo, ve a **Extensiones > Apps Script**
2. Borra todo el codigo existente y pega el siguiente:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Agregar nueva fila con los datos
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.interest || '',
      data.guide || '',
      data.language || 'en'
    ]);

    // Opcional: Enviar email de notificacion
    // sendNotificationEmail(data);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Funcion opcional para enviar notificacion por email
function sendNotificationEmail(data) {
  var recipient = 'hello@ponchodavalos.com.mx'; // Cambia por tu email
  var subject = 'Nuevo Lead - ' + data.guide;
  var body = 'Nuevo registro para descargar guia:\n\n' +
             'Nombre: ' + data.name + '\n' +
             'Email: ' + data.email + '\n' +
             'Telefono: ' + (data.phone || 'No proporcionado') + '\n' +
             'Interes: ' + (data.interest || 'No especificado') + '\n' +
             'Guia descargada: ' + data.guide + '\n' +
             'Idioma: ' + data.language + '\n' +
             'Fecha: ' + data.timestamp;

  MailApp.sendEmail(recipient, subject, body);
}

// Funcion para probar que el script funciona
function testDoPost() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        phone: '+1234567890',
        interest: 'buying',
        guide: 'Buyers Guide',
        language: 'en',
        timestamp: new Date().toISOString()
      })
    }
  };

  var result = doPost(testData);
  Logger.log(result.getContent());
}
```

3. Guarda el proyecto con un nombre como "Lead Form Handler"

## Paso 3: Desplegar como Web App

1. Haz clic en **Implementar > Nueva implementacion**
2. En "Seleccionar tipo", elige **Aplicacion web**
3. Configura:
   - **Descripcion**: Lead Form Handler
   - **Ejecutar como**: Yo (tu email)
   - **Quien tiene acceso**: Cualquier persona
4. Haz clic en **Implementar**
5. Autoriza el acceso cuando se solicite
6. **COPIA LA URL** que se genera (algo como: `https://script.google.com/macros/s/XXXXX/exec`)

## Paso 4: Configurar la URL en tu sitio

1. Abre el archivo `js/lead-form.js`
2. Busca la linea:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Reemplaza `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` con la URL que copiaste

## Paso 5: Probar

1. Abre tu sitio web
2. Haz clic en una de las 3 tarjetas de "Why Choose Poncho Davalos"
3. Llena el formulario con datos de prueba
4. Verifica que los datos aparezcan en tu hoja de calculo

## Notas importantes

- Si haces cambios al Apps Script, debes crear una **nueva implementacion** para que los cambios se apliquen
- Los datos se guardan automaticamente en la hoja de calculo
- Puedes activar la funcion `sendNotificationEmail` quitando el comentario `//` para recibir emails con cada nuevo registro
- La URL del Apps Script es publica pero solo puede recibir datos POST

## Solucion de problemas

### Los datos no llegan a la hoja
- Verifica que la URL en `lead-form.js` sea correcta
- Asegurate de que la implementacion tenga acceso "Cualquier persona"
- Revisa la consola del navegador (F12) por errores

### Error de CORS
- Esto es normal con `mode: 'no-cors'`. El formulario funcionara aunque no recibas respuesta del servidor

### Quiero agregar mas campos
1. Agrega el campo al HTML del formulario en `lead-form.js`
2. Agrega el campo a `formData` en la funcion `handleSubmit`
3. Agrega una nueva columna en Google Sheets
4. Modifica `sheet.appendRow()` en el Apps Script
