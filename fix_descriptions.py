#!/usr/bin/env python3
"""
Script to add data-i18n attributes to description paragraphs in property pages
"""
import re
import os

def fix_description(file_path, property_num):
    """Add data-i18n to description paragraph"""

    if not os.path.exists(file_path):
        print(f"[ERROR] File not found: {file_path}")
        return False

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Find the description <h4> and then find the next <p> tag
    # Look for: <h4 data-i18n="property.common.description">Description</h4>
    # followed by: <p>...

    # Pattern to find <p> after Description h4 that doesn't have data-i18n
    pattern = r'(<h4 data-i18n="property\.common\.description">Description</h4>\s*)<p>([^<]*(?:<[^/][^>]*>[^<]*</[^>]*>[^<]*)*)</p>'

    def replace_func(match):
        before_p = match.group(1)
        p_content = match.group(2)
        return f'{before_p}<p data-i18n="property.property{property_num}.description">{p_content}</p>'

    # Try simpler approach: find first <p> after the Description h4
    desc_section_pattern = r'(<h4 data-i18n="property\.common\.description">Description</h4>\s*)(<p>)'

    if re.search(desc_section_pattern, content):
        # Check if the <p> already has data-i18n
        match = re.search(desc_section_pattern + r'([^<]*)', content)
        if match:
            after_p_tag = match.group(0)
            if 'data-i18n' not in after_p_tag:
                content = re.sub(
                    desc_section_pattern,
                    rf'\1<p data-i18n="property.property{property_num}.description">',
                    content,
                    count=1
                )
                print(f"[OK] Added data-i18n to description in property-{property_num}.html")

                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                return True
            else:
                print(f"[SKIP] Description already has data-i18n in property-{property_num}.html")
                return False
    else:
        print(f"[ERROR] Could not find description section in property-{property_num}.html")
        return False

if __name__ == '__main__':
    base_dir = r'C:\Users\Administrator\Desktop\ponchodavalos'

    print("=" * 80)
    print("FIXING DESCRIPTION data-i18n IN ALL PROPERTY PAGES (1-12)")
    print("=" * 80)
    print()

    fixed_count = 0
    skipped_count = 0

    for i in range(1, 13):
        file_path = os.path.join(base_dir, f'property-{i}.html')
        if fix_description(file_path, i):
            fixed_count += 1
        else:
            skipped_count += 1

    print()
    print("=" * 80)
    print(f"SUMMARY: {fixed_count} files fixed, {skipped_count} files skipped")
    print("=" * 80)
