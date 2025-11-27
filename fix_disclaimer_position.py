#!/usr/bin/env python3
"""
Script to fix the disclaimer position in property pages
Moves it outside the custom-info-cards container
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

        # Pattern: Find the disclaimer INSIDE the custom-info-card
        # We need to:
        # 1. Remove the disclaimer from inside the custom-info-card
        # 2. Add it after the closing </div> of custom-info-cards

        # First, remove the disclaimer from its current position
        disclaimer_pattern = r'\s*<!-- Price Disclaimer -->\s*<div class="price-disclaimer"[^>]*>.*?</div>\s*'

        disclaimer_match = re.search(disclaimer_pattern, content, re.DOTALL)

        if disclaimer_match:
            disclaimer_html = disclaimer_match.group(0)

            # Remove the disclaimer from current position
            content = re.sub(disclaimer_pattern, '', content, flags=re.DOTALL)

            # Clean up the disclaimer HTML - remove inline styles
            disclaimer_html = re.sub(r' style="[^"]*"', '', disclaimer_html)

            # Find the end of custom-info-cards container
            # Pattern: </div> that closes custom-info-cards, before the next section
            cards_end_pattern = r'(</div>\s*</div>\s*</div>\s*<!-- End custom-info-cards -->)'

            if not re.search(cards_end_pattern, content):
                # Try alternative pattern
                cards_end_pattern = r'(</div>\s*</div>\s*<div class="row">)'

            if re.search(cards_end_pattern, content):
                # Insert disclaimer after custom-info-cards
                replacement = r'\1\n\n  <!-- Price Disclaimer -->\n  <div class="price-disclaimer">\n    <strong data-i18n="propertiesPage.priceDisclaimer.text">Prices displayed are for reference only and subject to change. Exchange rate:</strong>\n    <span class="exchange-rate">1 USD = 20 MXN</span>\n    <span class="disclaimer-note" data-i18n="propertiesPage.priceDisclaimer.note">Please contact us for the most current pricing and availability.</span>\n  </div>\n'

                content = re.sub(cards_end_pattern, replacement, content)

                if content != original_content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"[OK] property-{property_num}.html: Disclaimer reposicionado")
                    return True
            else:
                print(f"[WARNING] property-{property_num}.html: No se encontro patron de cierre de cards")
                return False
        else:
            print(f"[SKIP] property-{property_num}.html: No se encontro disclaimer")
            return False

    except Exception as e:
        print(f"[ERROR] property-{property_num}.html: {e}")
        return False


if __name__ == '__main__':
    print("=" * 80)
    print("REPOSICIONANDO DISCLAIMER EN PÁGINAS PROPERTY")
    print("=" * 80)
    print()

    success_count = 0
    for i in range(1, 13):
        if fix_disclaimer_position(i):
            success_count += 1

    print()
    print("=" * 80)
    print(f"Páginas actualizadas: {success_count}/12")
    print("=" * 80)
