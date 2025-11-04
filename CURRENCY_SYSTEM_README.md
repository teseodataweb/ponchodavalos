# Sistema de Conversión de Moneda MXN/USD - Guía de Configuración

## 📋 Descripción

Sistema automático de conversión de moneda que consulta el tipo de cambio USD/MXN en **tiempo real** mediante una API gratuita.

---

## 🌐 API Utilizada

**Proveedor:** exchangerate-api.com
**Endpoint:** `https://api.exchangerate-api.com/v4/latest/USD`
**Costo:** GRATIS (sin límite de peticiones)
**Tipo:** No requiere registro ni API key

### Respuesta de la API:
```json
{
  "base": "USD",
  "date": "2025-01-03",
  "rates": {
    "MXN": 19.85,
    "EUR": 0.93,
    ...
  }
}
```

---

## ⚙️ Configuración

### 1. Tipo de Cambio de Respaldo (Fallback)

Si la API falla o no está disponible, el sistema usa un valor de respaldo.

**Ubicación:** `js/currency-switcher.js` línea 12

```javascript
const FALLBACK_RATE = 20.0; // Cambiar aquí si deseas otro valor
```

**Recomendación:** Actualiza este valor cada 1-2 meses para mantenerlo cercano al valor real.

---

### 2. Duración del Caché

El sistema guarda el tipo de cambio en caché para evitar consultas excesivas a la API.

**Ubicación:** `js/currency-switcher.js` línea 13

```javascript
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
```

**Opciones:**
- `12 * 60 * 60 * 1000` → 12 horas
- `6 * 60 * 60 * 1000` → 6 horas
- `1 * 60 * 60 * 1000` → 1 hora

**Nota:** Valores más bajos = tipo de cambio más actualizado, pero más peticiones a la API.

---

### 3. Cambiar la API (Opcional)

Si deseas usar otra API, solo cambia la URL:

**Ubicación:** `js/currency-switcher.js` línea 11

```javascript
const EXCHANGE_RATE_API = 'https://api.exchangerate-api.com/v4/latest/USD';
```

#### Alternativas recomendadas:

**A) Banxico (Banco de México - Oficial)**
```javascript
const EXCHANGE_RATE_API = 'https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/oportuno?token=TU_TOKEN';
```
*Requiere registro gratuito en: https://www.banxico.org.mx/SieAPIRest/*

**B) exchangerate.host (Gratis, sin registro)**
```javascript
const EXCHANGE_RATE_API = 'https://api.exchangerate.host/latest?base=USD&symbols=MXN';
```

**C) fixer.io (Requiere API key gratuita)**
```javascript
const EXCHANGE_RATE_API = 'https://api.fixer.io/latest?access_key=TU_API_KEY&base=USD&symbols=MXN';
```

---

## 🔍 Cómo Funciona

### Flujo de Consulta:

1. **Al cargar la página:**
   - Verifica si existe tipo de cambio en caché (localStorage)
   - Si existe y tiene menos de 24 horas → usa el caché
   - Si no existe o expiró → consulta la API

2. **Consulta a la API:**
   - Hace petición a `exchangerate-api.com`
   - Extrae el valor de `rates.MXN`
   - Guarda el valor en caché por 24 horas
   - Muestra el tipo de cambio actualizado

3. **Si la API falla:**
   - Usa el valor de respaldo (FALLBACK_RATE = 20.0)
   - Muestra mensaje en consola del navegador

---

## 🎯 Características Implementadas

✅ **Consulta automática en tiempo real**
✅ **Caché de 24 horas** (configurable)
✅ **Fallback manual** si la API falla
✅ **Muestra tiempo de actualización** ("updated 2h ago" / "actualizado hace 2h")
✅ **Soporte bilingüe** (EN/ES) para tiempo de actualización
✅ **Sin dependencias externas** (JavaScript nativo)
✅ **Persistencia de preferencia** (MXN o USD guardado en localStorage)

---

## 🧪 Pruebas y Verificación

### En la Consola del Navegador (F12):

```javascript
// Ver tipo de cambio actual
console.log(window.CurrencySwitcher.getExchangeRate());

// Ver moneda actual
console.log(window.CurrencySwitcher.getCurrentCurrency());

// Limpiar caché para forzar nueva consulta
localStorage.removeItem('exchangeRateCache');
location.reload();
```

### Mensajes en Consola:

```
[Currency Switcher] Initializing...
[Currency Switcher] Fetching exchange rate from API...
[Currency Switcher] ✓ Exchange rate fetched successfully: 19.85
[Currency Switcher] Exchange rate cached for 24 hours
[Currency Switcher] Initialized with currency: MXN
[Currency Switcher] Exchange rate (USD to MXN): 19.85
```

---

## ⚠️ Solución de Problemas

### Problema: "La API no funciona"

**Posibles causas:**
1. Sin conexión a internet
2. La API está temporalmente caída
3. Bloqueado por firewall/antivirus

**Solución:**
- El sistema automáticamente usará el valor de respaldo (20.0)
- Verifica en consola del navegador (F12) el mensaje de error
- Puedes cambiar a otra API (ver sección "Cambiar la API")

### Problema: "El tipo de cambio no se actualiza"

**Causa:** El caché aún es válido (menos de 24 horas)

**Solución:**
```javascript
// En consola del navegador (F12)
localStorage.removeItem('exchangeRateCache');
location.reload();
```

O cambia la duración del caché en la configuración.

---

## 📊 Ejemplo de Conversión

Con tipo de cambio: **1 USD = 19.85 MXN**

| MXN Original | USD Convertido |
|--------------|----------------|
| $3,000,000 | $151,133 |
| $15,000,000 | $755,668 |
| $10,888,000 | $548,489 |

---

## 🔧 Mantenimiento

### Frecuencia Recomendada:

- **Cada 2-3 meses:** Revisar que la API siga funcionando
- **Cada 1-2 meses:** Actualizar el valor de FALLBACK_RATE
- **Anual:** Considerar si el caché de 24 horas sigue siendo apropiado

---

## 📝 Notas Importantes

1. **Disclaimer Legal:** Los precios mostrados incluyen un disclaimer indicando que son "solo de referencia"
2. **Precisión:** El tipo de cambio de la API es indicativo, no es el tipo de cambio bancario oficial
3. **Privacidad:** El sistema NO envía datos del usuario a ningún servidor externo
4. **Rendimiento:** La consulta a la API solo ocurre una vez cada 24 horas (o cuando expira el caché)

---

## 🆘 Soporte

Si necesitas cambiar la configuración o tienes problemas:

1. Abre el archivo: `js/currency-switcher.js`
2. Busca las constantes en las primeras líneas (11-13)
3. Modifica los valores según necesites
4. Guarda y recarga la página

**Ubicación del archivo:**
```
ponchodavalos/
└── js/
    └── currency-switcher.js  ← Aquí se configura todo
```

---

## ✅ Checklist de Verificación

- [ ] El toggle MXN/USD aparece en la página
- [ ] Al hacer click cambian los precios
- [ ] En el disclaimer aparece el tipo de cambio
- [ ] En consola (F12) aparecen mensajes sin errores
- [ ] El tipo de cambio es razonable (18-22 MXN típicamente)
- [ ] Al cambiar idioma, el "updated X ago" se traduce

---

**Última actualización:** Enero 2025
**Versión:** 1.0 (Con API automática)
