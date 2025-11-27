#!/usr/bin/env python3
"""
Script to add currency conversion system to property-1.html through property-12.html
Adds:
1. CSS link for currency-switcher.css
2. Currency switcher buttons (MXN/USD)
3. Price attributes (data-price-mxn and data-price-usd)
4. Price disclaimer
5. JavaScript link for currency-switcher.js
"""
import re
import os

base_dir = r'C:\Users\Administrator\Desktop\ponchodavalos'

# Exchange rate
EXCHANGE_RATE = 20.0

# Price data: property_number: USD_price
PRICES_USD = {
    1: 135000,
    2: 1498968,
    3: 809110,
    4: 154250,
    5: 156800,
    6: 242886,
    7: 329999,
    8: 253935,
    9: 620000,
    10: 495000,
    11: 580000,
    12: 185000
}

def add_currency_system(property_num):
    """Add complete currency system to a property page"""

    file_path = os.path.join(base_dir, f'property-{property_num}.html')

    print(f"\n{'='*80}")
    print(f"PROCESANDO property-{property_num}.html")
    print('='*80)

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        changes_made = []

        # Get USD price
        price_usd = PRICES_USD.get(property_num)
        if not price_usd:
            print(f"  [ERROR] No se encontro precio USD para property-{property_num}")
            return False

        price_mxn = price_usd * EXCHANGE_RATE

        # 1. Add CSS link after i18n.css
        if 'currency-switcher.css' not in content:
            pattern = r'(<link rel="stylesheet" href="css/i18n\.css" />)'
            replacement = r'\1\n<link rel="stylesheet" href="css/currency-switcher.css" />'
            content = re.sub(pattern, replacement, content)
            changes_made.append("CSS link agregado")
        else:
            print("  [SKIP] CSS ya existe")

        # 2. Add currency switcher buttons after language switcher
        if '<div class="currency-switcher">' not in content:
            # Find the language switcher closing </div>
            pattern = r'(<!-- Language Switcher -->.*?</div>)'
            currency_buttons = '''
    <!-- Currency Switcher -->
    <div class="currency-switcher">
        <button class="currency-btn active" data-currency="MXN" aria-label="Show prices in Mexican Pesos">
            <span class="sr-only">Currency:</span>MXN
        </button>
        <button class="currency-btn" data-currency="USD" aria-label="Show prices in US Dollars">
            <span class="sr-only">Currency:</span>USD
        </button>
    </div>'''

            replacement = r'\1' + currency_buttons
            content = re.sub(pattern, replacement, content, flags=re.DOTALL)
            changes_made.append("Botones de moneda agregados")
        else:
            print("  [SKIP] Botones de moneda ya existen")

        # 3. Update price paragraph with data attributes
        # Pattern: <h6 data-i18n="property.common.price">Price:</h6>
        #          <p>USD $XXX,XXX</p>
        pattern = r'(<h6 data-i18n="property\.common\.price">Price:</h6>\s*)<p>USD \$[0-9,]+</p>'

        # Format prices
        price_mxn_formatted = f"${price_mxn:,.0f} MXN"

        replacement = (
            r'\1'
            f'<p><span data-price-mxn="{price_mxn}" data-price-usd="{price_usd}">'
            f'{price_mxn_formatted}'
            f'</span></p>'
        )

        if re.search(pattern, content):
            content = re.sub(pattern, replacement, content)
            changes_made.append(f"Precio actualizado: MXN ${price_mxn:,.0f} / USD ${price_usd:,.0f}")
        else:
            print("  [WARNING] No se encontro patron de precio")

        # 4. Add price disclaimer after the price card
        # Find the price card and add disclaimer after it
        if 'price-disclaimer' not in content:
            # Pattern: Find the custom-info-card div that contains the price
            pattern = r'(<div class="custom-info-card">.*?<h6 data-i18n="property\.common\.price">Price:</h6>.*?</div>)'

            disclaimer = '''

  <!-- Price Disclaimer -->
  <div class="price-disclaimer" style="margin-top: 20px; background: #fff9e6; border-left: 4px solid #c0b596; padding: 12px 20px; border-radius: 4px;">
    <strong data-i18n="propertiesPage.priceDisclaimer.text">Prices displayed are for reference only and subject to change. Exchange rate:</strong>
    <span class="exchange-rate">1 USD = 20 MXN</span>
    <br>
    <span data-i18n="propertiesPage.priceDisclaimer.note">Please contact us for the most current pricing and availability.</span>
  </div>'''

            replacement = r'\1' + disclaimer
            content = re.sub(pattern, replacement, content, flags=re.DOTALL)
            changes_made.append("Disclaimer de precios agregado")
        else:
            print("  [SKIP] Disclaimer ya existe")

        # 5. Add JavaScript link after i18n.js
        if 'currency-switcher.js' not in content:
            pattern = r'(<script src="js/i18n\.js"></script>)'
            replacement = r'\1\n<script src="js/currency-switcher.js"></script>'
            content = re.sub(pattern, replacement, content)
            changes_made.append("JavaScript agregado")
        else:
            print("  [SKIP] JavaScript ya existe")

        # Write file if changes were made
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)

            print(f"\n[OK] Archivo actualizado exitosamente")
            print(f"\nCambios realizados:")
            for change in changes_made:
                print(f"  - {change}")
            return True
        else:
            print("\n[SKIP] No se realizaron cambios")
            return False

    except Exception as e:
        print(f"\n[ERROR] Error procesando archivo: {e}")
        return False


if __name__ == '__main__':
    print("=" * 80)
    print("AGREGANDO SISTEMA DE CONVERSIÓN DE MONEDA A PÁGINAS PROPERTY")
    print("=" * 80)

    success_count = 0
    for i in range(1, 13):
        if add_currency_system(i):
            success_count += 1

    print(f"\n{'='*80}")
    print("RESUMEN FINAL")
    print('='*80)
    print(f"Páginas procesadas exitosamente: {success_count}/12")
    print('='*80)
