#!/usr/bin/env python3
"""
Script to add language switcher to service pages that are missing it
"""
import os

LANG_SWITCHER = '''<!-- Language Switcher -->
<div class="lang-switcher">
    <button class="lang-btn active" data-lang="en" aria-label="Switch to English">
        <span class="sr-only">Switch to</span>EN
    </button>
    <button class="lang-btn" data-lang="es" aria-label="Cambiar a Español">
        <span class="sr-only">Cambiar a</span>ES
    </button>
</div>
'''

def add_lang_switcher(file_path):
    """Add language switcher after <body> tag if missing"""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if lang-switcher already exists
    if 'lang-switcher' in content:
        return False

    # Add after <body> tag
    content = content.replace('<body>', f'<body>\n{LANG_SWITCHER}')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    return True

if __name__ == '__main__':
    base_dir = r'C:\Users\Administrator\Desktop\ponchodavalos'

    print("=" * 80)
    print("ADDING LANGUAGE SWITCHER TO SERVICE PAGES")
    print("=" * 80)
    print()

    services_to_fix = [3, 4, 5, 6]
    fixed_count = 0

    for i in services_to_fix:
        file_path = os.path.join(base_dir, f'servcies-detail-{i}.html')
        if os.path.exists(file_path):
            if add_lang_switcher(file_path):
                print(f"[OK] Added language switcher to servcies-detail-{i}.html")
                fixed_count += 1
            else:
                print(f"[SKIP] Language switcher already exists in servcies-detail-{i}.html")
        else:
            print(f"[ERROR] File not found: servcies-detail-{i}.html")

    print()
    print("=" * 80)
    print(f"SUMMARY: {fixed_count} files fixed")
    print("=" * 80)
