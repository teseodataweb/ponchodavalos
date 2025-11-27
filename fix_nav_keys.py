#!/usr/bin/env python3
"""
Script to fix inconsistent i18n keys in navigation
"""
import os
import glob

def fix_nav_keys(file_path):
    """Fix nav.aboutUs -> nav.about and nav.contacts -> nav.contact"""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Fix nav.aboutUs -> nav.about
    content = content.replace('data-i18n="nav.aboutUs"', 'data-i18n="nav.about"')

    # Fix nav.contacts -> nav.contact
    content = content.replace('data-i18n="nav.contacts"', 'data-i18n="nav.contact"')

    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

if __name__ == '__main__':
    base_dir = r'C:\Users\Administrator\Desktop\ponchodavalos'

    print("=" * 80)
    print("FIXING NAVIGATION i18n KEY INCONSISTENCIES")
    print("=" * 80)
    print()

    # Get all HTML files
    html_files = glob.glob(os.path.join(base_dir, '*.html'))

    fixed_count = 0

    for file_path in html_files:
        filename = os.path.basename(file_path)
        if fix_nav_keys(file_path):
            print(f"[OK] Fixed {filename}")
            fixed_count += 1

    print()
    print("=" * 80)
    print(f"SUMMARY: {fixed_count} files fixed")
    print("=" * 80)
