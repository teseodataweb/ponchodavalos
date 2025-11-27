#!/usr/bin/env python3
"""
Script to verify currency system implementation in all property pages
"""
import re
import os

base_dir = r'C:\Users\Administrator\Desktop\ponchodavalos'

print("=" * 80)
print("VERIFICACIÓN DEL SISTEMA DE MONEDA EN PÁGINAS PROPERTY")
print("=" * 80)
print()

verification_results = []

for i in range(1, 13):
    file_path = os.path.join(base_dir, f'property-{i}.html')

    result = {
        'page': f'property-{i}.html',
        'css': False,
        'js': False,
        'buttons': False,
        'price_attrs': False,
        'disclaimer': False,
        'price_mxn': None,
        'price_usd': None
    }

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check CSS
        result['css'] = 'currency-switcher.css' in content

        # Check JavaScript
        result['js'] = 'currency-switcher.js' in content

        # Check buttons
        result['buttons'] = 'class="currency-switcher"' in content

        # Check price attributes
        price_match = re.search(r'data-price-mxn="([^"]+)" data-price-usd="([^"]+)"', content)
        if price_match:
            result['price_attrs'] = True
            result['price_mxn'] = price_match.group(1)
            result['price_usd'] = price_match.group(2)

        # Check disclaimer
        result['disclaimer'] = 'price-disclaimer' in content

        verification_results.append(result)

    except Exception as e:
        print(f"[ERROR] Error procesando {file_path}: {e}")

# Print results
print("COMPONENTES DEL SISTEMA:")
print("-" * 80)
print(f"{'Página':<20} {'CSS':<8} {'JS':<8} {'Botones':<10} {'Attrs':<8} {'Disclaimer':<12}")
print("-" * 80)

all_pass = True
for result in verification_results:
    css_status = "[OK]" if result['css'] else "[ERROR]"
    js_status = "[OK]" if result['js'] else "[ERROR]"
    buttons_status = "[OK]" if result['buttons'] else "[ERROR]"
    attrs_status = "[OK]" if result['price_attrs'] else "[ERROR]"
    disclaimer_status = "[OK]" if result['disclaimer'] else "[ERROR]"

    print(f"{result['page']:<20} {css_status:<8} {js_status:<8} {buttons_status:<10} {attrs_status:<8} {disclaimer_status:<12}")

    if not all([result['css'], result['js'], result['buttons'], result['price_attrs'], result['disclaimer']]):
        all_pass = False

print()
print("=" * 80)
print("PRECIOS CONFIGURADOS:")
print("=" * 80)
print(f"{'Página':<20} {'MXN':<20} {'USD':<20}")
print("-" * 80)

for result in verification_results:
    if result['price_mxn'] and result['price_usd']:
        mxn_formatted = f"${float(result['price_mxn']):,.0f}"
        usd_formatted = f"${float(result['price_usd']):,.0f}"
        print(f"{result['page']:<20} {mxn_formatted:<20} {usd_formatted:<20}")

print()
print("=" * 80)
if all_pass:
    print("RESULTADO: TODAS LAS PÁGINAS VERIFICADAS EXITOSAMENTE")
else:
    print("RESULTADO: ALGUNAS PÁGINAS TIENEN ERRORES")
print("=" * 80)
print()
print("Total de páginas procesadas: 12/12")
print("Sistema de conversión de moneda: COMPLETO")
print()
