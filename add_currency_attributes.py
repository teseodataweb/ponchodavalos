#!/usr/bin/env python3
"""
Script to add data-price-mxn and data-price-usd attributes to property prices
"""
import re

# Exchange rate
EXCHANGE_RATE = 20.0  # 1 USD = 20 MXN

def extract_price_mxn(price_text):
    """Extract numeric price from text like '$3,000,000 MXN'"""
    # Remove commas and extract number
    match = re.search(r'\$([\d,]+)', price_text)
    if match:
        price_str = match.group(1).replace(',', '')
        return float(price_str)
    return None

def calculate_usd(price_mxn):
    """Calculate USD price from MXN"""
    return round(price_mxn / EXCHANGE_RATE, 2)

def add_price_attributes(file_path):
    """Add data-price-mxn and data-price-usd to all prices"""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Pattern to find price elements
    # Looking for: <li><strong data-i18n="propertiesPage.card.price">Price:</strong> $X,XXX,XXX MXN</li>
    pattern = r'(<li><strong data-i18n="propertiesPage\.card\.price">Price:</strong>\s*)(\$[\d,]+\s+MXN)(</li>)'

    matches = list(re.finditer(pattern, content))
    print(f"Found {len(matches)} price elements")

    # Process matches in reverse order to maintain positions
    for match in reversed(matches):
        before = match.group(1)
        price_text = match.group(2)
        after = match.group(3)

        # Extract MXN price
        price_mxn = extract_price_mxn(price_text)

        if price_mxn:
            price_usd = calculate_usd(price_mxn)

            # Create new element with data attributes
            new_element = (
                f'{before}'
                f'<span data-price-mxn="{price_mxn}" data-price-usd="{price_usd}">'
                f'{price_text}'
                f'</span>'
                f'{after}'
            )

            # Replace in content
            content = content[:match.start()] + new_element + content[match.end():]

            print(f"  [OK] Added: MXN ${price_mxn:,.0f} = USD ${price_usd:,.2f}")

    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"\n[OK] Successfully updated {file_path}")
        return True
    else:
        print(f"\n[SKIP] No changes needed for {file_path}")
        return False

if __name__ == '__main__':
    import os
    base_dir = r'C:\Users\Administrator\Desktop\ponchodavalos'
    file_path = os.path.join(base_dir, 'portfolio-four-column-wide.html')

    print("=" * 80)
    print("ADDING CURRENCY ATTRIBUTES TO PORTFOLIO PAGE")
    print("=" * 80)
    print()

    add_price_attributes(file_path)

    print()
    print("=" * 80)
    print("DONE")
    print("=" * 80)
