#!/usr/bin/env python3
"""
Script to verify disclaimer positioning in all property pages
"""
import re
import os

base_dir = r'C:\Users\Administrator\Desktop\ponchodavalos'

print("=" * 80)
print("VERIFICACIÓN FINAL DEL DISCLAIMER")
print("=" * 80)
print()

all_good = True

for i in range(1, 13):
    file_path = os.path.join(base_dir, f'property-{i}.html')

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check 1: Disclaimer is NOT inside custom-info-card
        price_card_section = re.search(r'<div class="custom-info-card">.*?alt="Price Icon".*?</div>\s*</div>', content, re.DOTALL)

        if price_card_section and 'price-disclaimer' in price_card_section.group(0):
            print(f"[ERROR] property-{i}.html: Disclaimer está DENTRO de custom-info-card")
            all_good = False
        else:
            print(f"[OK] property-{i}.html: Disclaimer está FUERA de custom-info-card")

        # Check 2: Disclaimer exists somewhere in the page
        if 'price-disclaimer' not in content:
            print(f"  [ERROR] property-{i}.html: NO se encontró disclaimer")
            all_good = False

        # Check 3: No inline styles
        if re.search(r'<div class="price-disclaimer"[^>]*style=', content):
            print(f"  [ERROR] property-{i}.html: Tiene estilos inline")
            all_good = False

    except Exception as e:
        print(f"[ERROR] property-{i}.html: {e}")
        all_good = False

print()
print("=" * 80)
if all_good:
    print("RESULTADO: TODOS LOS DISCLAIMERS ESTÁN CORRECTAMENTE POSICIONADOS")
else:
    print("RESULTADO: ALGUNOS DISCLAIMERS TIENEN PROBLEMAS")
print("=" * 80)
