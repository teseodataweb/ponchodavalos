#!/usr/bin/env python3
"""
Script to fix missing i18n attributes in all property pages (1-12)
"""
import re
import os

def fix_property_page(file_path, property_num):
    """Fix missing i18n attributes in a property page"""

    if not os.path.exists(file_path):
        print(f"[ERROR] File not found: {file_path}")
        return False

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    changes_made = []

    # 1. Fix mobile menu - Home link
    if '<li class="menu-item-has-children current-menu-item current-menu-ancestor">\n                                                    <a href="index.html">Home</a>' in content:
        content = content.replace(
            '<li class="menu-item-has-children current-menu-item current-menu-ancestor">\n                                                    <a href="index.html">Home</a>',
            '<li class="menu-item-has-children current-menu-item current-menu-ancestor">\n                                                    <a href="index.html" data-i18n="nav.home">Home</a>'
        )
        changes_made.append("Mobile menu - Home")

    # 2. Fix mobile menu - Properties link
    if '<li class="menu-item-has-children"><a href="portfolio-four-column-wide.html">Properties</a>' in content:
        content = content.replace(
            '<li class="menu-item-has-children"><a href="portfolio-four-column-wide.html">Properties</a>',
            '<li class="menu-item-has-children"><a href="portfolio-four-column-wide.html" data-i18n="nav.properties">Properties</a>'
        )
        changes_made.append("Mobile menu - Properties")

    # 3. Fix mobile menu - About Us link
    if '<li class="menu-item-has-children"><a href="about-us.html">About Us</a>' in content:
        content = content.replace(
            '<li class="menu-item-has-children"><a href="about-us.html">About Us</a>',
            '<li class="menu-item-has-children"><a href="about-us.html" data-i18n="nav.about">About Us</a>'
        )
        changes_made.append("Mobile menu - About Us")

    # 4. Fix mobile menu - Services link
    pattern_services = r'<li class="menu-item-has-children"><a href="servcies-detail-1\.html">Services</a>'
    if re.search(pattern_services, content):
        content = re.sub(
            pattern_services,
            '<li class="menu-item-has-children"><a href="servcies-detail-1.html" data-i18n="nav.services">Services</a>',
            content
        )
        changes_made.append("Mobile menu - Services")

    # 5. Fix mobile menu - Services submenu items
    mobile_services_fixes = [
        (r'<li><a href="servcies-detail-1\.html">Comprehensive Advisory</a></li>',
         '<li><a href="servcies-detail-1.html" data-i18n="nav.services.comprehensive">Comprehensive Advisory</a></li>'),
        (r'<li><a href="servcies-detail-2\.html">Investment for Foreign Buyers</a></li>',
         '<li><a href="servcies-detail-2.html" data-i18n="nav.services.investment">Investment for Foreign Buyers</a></li>'),
        (r'<li><a href="servcies-detail-3\.html">Second Home Acquisition</a></li>',
         '<li><a href="servcies-detail-3.html" data-i18n="nav.services.secondHome">Second Home Acquisition</a></li>'),
        (r'<li><a href="servcies-detail-4\.html">Premium Property Sales</a></li>',
         '<li><a href="servcies-detail-4.html" data-i18n="nav.services.premium">Premium Property Sales</a></li>'),
        (r'<li><a href="servcies-detail-5\.html">Legal & Transaction Magnagement</a></li>',
         '<li><a href="servcies-detail-5.html" data-i18n="nav.services.legal">Legal & Transaction Magnagement</a></li>'),
        (r'<li><a href="servcies-detail-6\.html">Market & Appreciation Analysis</a></li>',
         '<li><a href="servcies-detail-6.html" data-i18n="nav.services.market">Market & Appreciation Analysis</a></li>'),
    ]

    for pattern, replacement in mobile_services_fixes:
        if re.search(pattern, content):
            content = re.sub(pattern, replacement, content)
            changes_made.append(f"Mobile submenu - {replacement.split('>')[1].split('<')[0]}")

    # 6. Fix mobile menu - Blog link
    if '<li class="menu-item-has-children"><a href="#">Blog</a>' in content:
        content = content.replace(
            '<li class="menu-item-has-children"><a href="#">Blog</a>',
            '<li class="menu-item-has-children"><a href="#" data-i18n="nav.blog">Blog</a>'
        )
        changes_made.append("Mobile menu - Blog")

    # 7. Fix mobile menu - Contact Us link
    if '<li><a href="contact.html">Contact Us</a></li>' in content:
        content = content.replace(
            '<li><a href="contact.html">Contact Us</a></li>',
            '<li><a href="contact.html" data-i18n="nav.contact">Contact Us</a></li>'
        )
        changes_made.append("Mobile menu - Contact Us")

    # 8. Fix breadcrumb tagline (only if NOT already fixed)
    breadcrumb_pattern = r'<li class="active">([^<]+)</li>'
    breadcrumb_match = re.search(breadcrumb_pattern, content)
    if breadcrumb_match and 'data-i18n' not in breadcrumb_match.group(0):
        tagline_text = breadcrumb_match.group(1)
        content = re.sub(
            breadcrumb_pattern,
            f'<li class="active" data-i18n="property.property{property_num}.tagline">{tagline_text}</li>',
            content,
            count=1
        )
        changes_made.append("Breadcrumb tagline")

    # 9. Fix Bathrooms without data-i18n
    if '<h6>Bathrooms:</h6>' in content and 'data-i18n="property.common.baths"' not in content[:content.find('<h6>Bathrooms:</h6>') + 100]:
        content = content.replace(
            '<h6>Bathrooms:</h6>',
            '<h6 data-i18n="property.common.baths">Bathrooms:</h6>',
            1  # Only first occurrence
        )
        changes_made.append("Bathrooms label")

    # 10. Fix card titles without data-i18n
    card_titles = [
        ('Connectivity', 'property.common.connectivity.title'),
        ('Building Information', 'property.common.buildingInfo.title'),
        ('HOA Fee Information', 'property.common.hoaFee.title'),
        ('Property Details', 'property.common.propertyDetails.title'),
    ]

    for title, i18n_key in card_titles:
        pattern = f'<h6 class="card-title">{title}</h6>'
        if pattern in content:
            content = content.replace(
                pattern,
                f'<h6 class="card-title" data-i18n="{i18n_key}">{title}</h6>'
            )
            changes_made.append(f"Card title - {title}")

    # 11. Fix second Location h4 (the one before the map)
    # This is tricky - we need to find the SECOND occurrence of <h4>Location</h4>
    location_h4_pattern = r'<h4>Location</h4>'
    matches = list(re.finditer(location_h4_pattern, content))
    if len(matches) >= 2:
        second_match = matches[1]
        # Check if it doesn't already have data-i18n nearby
        context = content[max(0, second_match.start() - 50):second_match.end() + 50]
        if 'data-i18n' not in context:
            # Replace second occurrence
            parts = content.split('<h4>Location</h4>', 2)
            if len(parts) == 3:
                content = parts[0] + '<h4>Location</h4>' + parts[1] + '<h4 data-i18n="property.common.location.title">Location</h4>' + parts[2]
                changes_made.append("Second Location h4")

    # Write back if changes were made
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"[OK] Fixed property-{property_num}.html - Changes: {', '.join(changes_made)}")
        return True
    else:
        print(f"[SKIP] No changes needed for property-{property_num}.html")
        return False

if __name__ == '__main__':
    base_dir = r'C:\Users\Administrator\Desktop\ponchodavalos'

    print("=" * 80)
    print("FIXING i18n ATTRIBUTES IN ALL PROPERTY PAGES (1-12)")
    print("=" * 80)
    print()

    fixed_count = 0
    skipped_count = 0

    for i in range(1, 13):
        file_path = os.path.join(base_dir, f'property-{i}.html')
        if fix_property_page(file_path, i):
            fixed_count += 1
        else:
            skipped_count += 1
        print()

    print("=" * 80)
    print(f"SUMMARY: {fixed_count} files fixed, {skipped_count} files skipped")
    print("=" * 80)
