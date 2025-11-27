#!/usr/bin/env python3
"""
Script to add data-i18n attributes to description paragraphs in property pages (v2)
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

    # Find the line with Description h4
    lines = content.split('\n')
    desc_h4_index = -1

    for i, line in enumerate(lines):
        if '<h4 data-i18n="property.common.description">Description</h4>' in line:
            desc_h4_index = i
            break

    if desc_h4_index == -1:
        print(f"[ERROR] Could not find Description h4 in property-{property_num}.html")
        return False

    # Find the next <p> tag after the Description h4
    p_tag_index = -1
    for i in range(desc_h4_index + 1, min(desc_h4_index + 5, len(lines))):
        if '<p' in lines[i]:
            p_tag_index = i
            break

    if p_tag_index == -1:
        print(f"[ERROR] Could not find <p> after Description h4 in property-{property_num}.html")
        return False

    # Check if the <p> already has data-i18n
    p_line = lines[p_tag_index]

    if 'data-i18n=' in p_line:
        print(f"[SKIP] Description <p> already has data-i18n in property-{property_num}.html")
        return False

    # Add data-i18n to the <p> tag
    # Replace <p> or <p > with <p data-i18n="property.propertyN.description">
    new_p_line = re.sub(
        r'<p(\s*)>',
        f'<p data-i18n="property.property{property_num}.description">',
        p_line
    )

    lines[p_tag_index] = new_p_line
    content = '\n'.join(lines)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"[OK] Added data-i18n to description <p> in property-{property_num}.html")
    return True

if __name__ == '__main__':
    base_dir = r'C:\Users\Administrator\Desktop\ponchodavalos'

    print("=" * 80)
    print("FIXING DESCRIPTION <p> data-i18n IN ALL PROPERTY PAGES (1-12) - V2")
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
