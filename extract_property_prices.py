#!/usr/bin/env python3
"""
Script to extract prices from property-1.html to property-12.html
"""
import re
import os

base_dir = r'C:\Users\Administrator\Desktop\ponchodavalos'

print("=" * 80)
print("EXTRACCIÓN DE PRECIOS DE PROPIEDADES")
print("=" * 80)
print()

prices = {}

for i in range(1, 13):
    file_path = os.path.join(base_dir, f'property-{i}.html')

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Pattern to find price
        # Looking for: <h6 data-i18n="property.common.price">Price:</h6>
        #              <p>USD $135,000</p>
        pattern = r'<h6 data-i18n="property\.common\.price">Price:</h6>\s*<p>([^<]+)</p>'

        match = re.search(pattern, content)

        if match:
            price_text = match.group(1).strip()
            prices[i] = price_text
            print(f"property-{i}.html: {price_text}")
        else:
            print(f"property-{i}.html: [ERROR] No se encontró precio")

    except Exception as e:
        print(f"property-{i}.html: [ERROR] {e}")

print()
print("=" * 80)
print("PRECIOS EXTRAÍDOS:")
print("=" * 80)
for i, price in prices.items():
    print(f"  {i}: {price}")
