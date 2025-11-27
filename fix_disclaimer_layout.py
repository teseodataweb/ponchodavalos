#!/usr/bin/env python3
"""
Script to fix the disclaimer layout in property pages
Removes the <br> tag to make it display in a single line
"""
import re
import os

base_dir = r'C:\Users\Administrator\Desktop\ponchodavalos'

def fix_disclaimer_layout(property_num):
    """Fix disclaimer layout in a property page"""

    file_path = os.path.join(base_dir, f'property-{property_num}.html')

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Pattern: Find the disclaimer with <br> tag
        old_pattern = r'(<div class="price-disclaimer"[^>]*>)\s*<strong data-i18n="propertiesPage\.priceDisclaimer\.text">([^<]+)</strong>\s*<span class="exchange-rate">([^<]+)</span>\s*<br>\s*<span data-i18n="propertiesPage\.priceDisclaimer\.note">([^<]+)</span>\s*</div>'

        # New layout without <br>, using class for second line
        new_layout = r'\1\n    <strong data-i18n="propertiesPage.priceDisclaimer.text">\2</strong>\n    <span class="exchange-rate">\3</span>\n    <span class="disclaimer-note" data-i18n="propertiesPage.priceDisclaimer.note">\4</span>\n  </div>'

        if re.search(old_pattern, content):
            content = re.sub(old_pattern, new_layout, content)

            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"[OK] property-{property_num}.html: Disclaimer actualizado")
                return True
            else:
                print(f"[SKIP] property-{property_num}.html: Sin cambios")
                return False
        else:
            print(f"[WARNING] property-{property_num}.html: No se encontro patron de disclaimer")
            return False

    except Exception as e:
        print(f"[ERROR] property-{property_num}.html: {e}")
        return False


if __name__ == '__main__':
    print("=" * 80)
    print("CORRIGIENDO LAYOUT DEL DISCLAIMER EN PÁGINAS PROPERTY")
    print("=" * 80)
    print()

    success_count = 0
    for i in range(1, 13):
        if fix_disclaimer_layout(i):
            success_count += 1

    print()
    print("=" * 80)
    print(f"Páginas actualizadas: {success_count}/12")
    print("=" * 80)
