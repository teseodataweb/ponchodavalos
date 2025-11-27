#!/usr/bin/env python3
"""
Script to fix the disclaimer position in property-2 to property-12
Moves disclaimer from inside custom-info-card to after custom-info-cards container
Removes inline styles
"""
import re
import os

base_dir = r'C:\Users\Administrator\Desktop\ponchodavalos'

def fix_disclaimer_position(property_num):
    """Fix disclaimer position in a property page"""

    file_path = os.path.join(base_dir, f'property-{property_num}.html')

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Step 1: Remove disclaimer from inside the first custom-info-card
        # Pattern: Find and remove the disclaimer that's inside the price card
        price_card_pattern = r'(<div class="custom-info-card">\s*<img[^>]*alt="Price Icon"[^>]*>\s*<div class="custom-info-text">\s*<h6[^>]*>.*?</h6>\s*<p>.*?</p>\s*</div>)\s*<!-- Price Disclaimer -->.*?</div>\s*(</div>)'

        match = re.search(price_card_pattern, content, re.DOTALL)

        if match:
            # Replace with just the price card, removing disclaimer
            content = re.sub(price_card_pattern, r'\1\n  \2', content, flags=re.DOTALL)

            # Step 2: Find the end of custom-info-cards and add disclaimer there
            # Pattern: Find </div> that closes custom-info-cards, before the next section
            cards_end_pattern = r'(</div>\s*</div>\s*)\s*(<div class="space-30"></div>)'

            disclaimer_html = '''<!-- Price Disclaimer -->
<div class="price-disclaimer">
  <strong data-i18n="propertiesPage.priceDisclaimer.text">Prices displayed are for reference only and subject to change. Exchange rate:</strong>
  <span class="exchange-rate">1 USD = 20 MXN</span>
  <span class="disclaimer-note" data-i18n="propertiesPage.priceDisclaimer.note">Please contact us for the most current pricing and availability.</span>
</div>

'''

            if re.search(cards_end_pattern, content):
                content = re.sub(cards_end_pattern, r'\1\n' + disclaimer_html + r'\2', content)

                if content != original_content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"[OK] property-{property_num}.html: Disclaimer reposicionado y estilos inline eliminados")
                    return True
                else:
                    print(f"[SKIP] property-{property_num}.html: Sin cambios")
                    return False
            else:
                print(f"[WARNING] property-{property_num}.html: No se encontro patron de cierre")
                return False
        else:
            print(f"[SKIP] property-{property_num}.html: No se encontro disclaimer en tarjeta de precio")
            return False

    except Exception as e:
        print(f"[ERROR] property-{property_num}.html: {e}")
        import traceback
        traceback.print_exc()
        return False


if __name__ == '__main__':
    print("=" * 80)
    print("REPOSICIONANDO DISCLAIMER EN PÁGINAS PROPERTY 2-12")
    print("=" * 80)
    print()

    success_count = 0
    # Skip property-1 as it's already fixed
    for i in range(2, 13):
        if fix_disclaimer_position(i):
            success_count += 1

    print()
    print("=" * 80)
    print(f"Páginas actualizadas: {success_count}/11 (property-1 ya estaba corregida)")
    print("=" * 80)
