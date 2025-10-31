#!/usr/bin/env python3
"""
Script to apply i18n attributes to property pages
"""
import re
import sys

# Property taglines and descriptions mapping
PROPERTIES_DATA = {
    2: {
        "tagline": "Your dream lifestyle with panoramic ocean views.",
        "tagline_es": "Tu estilo de vida soñado con vistas panorámicas al mar.",
        "title": "Indah 3B"
    },
    3: {
        "tagline": "Your dream lifestyle with panoramic ocean views.",
        "tagline_es": "Tu estilo de vida soñado con vistas panorámicas al mar.",
        "title": "Amapas B11"
    },
    4: {
        "tagline": "Your dream lifestyle with panoramic ocean views.",
        "tagline_es": "Tu estilo de vida soñado con vistas panorámicas al mar.",
        "title": "Condominio Las Perlas"
    },
    5: {
        "tagline": "Your dream lifestyle with panoramic ocean views.",
        "tagline_es": "Tu estilo de vida soñado con vistas panorámicas al mar.",
        "title": "Coras Living D3"
    },
    6: {
        "tagline": "Your dream lifestyle with panoramic ocean views.",
        "tagline_es": "Tu estilo de vida soñado con vistas panorámicas al mar.",
        "title": "Coras Living D4"
    },
    7: {
        "tagline": "Your dream lifestyle with panoramic ocean views.",
        "tagline_es": "Tu estilo de vida soñado con vistas panorámicas al mar.",
        "title": "Altomar B3"
    },
    8: {
        "tagline": "Your dream lifestyle with panoramic ocean views.",
        "tagline_es": "Tu estilo de vida soñado con vistas panorámicas al mar.",
        "title": "Palm Springs 353 Condo Chris"
    },
    9: {
        "tagline": "Your dream lifestyle with panoramic ocean views.",
        "tagline_es": "Tu estilo de vida soñado con vistas panorámicas al mar.",
        "title": "Urban 3A"
    },
    10: {
        "tagline": "Your dream lifestyle with panoramic ocean views.",
        "tagline_es": "Tu estilo de vida soñado con vistas panorámicas al mar.",
        "title": "Pavilion 309"
    },
    11: {
        "tagline": "Your dream lifestyle with panoramic ocean views.",
        "tagline_es": "Tu estilo de vida soñado con vistas panorámicas al mar.",
        "title": "Casa Corona"
    },
    12: {
        "tagline": "Your dream lifestyle with panoramic ocean views.",
        "tagline_es": "Tu estilo de vida soñado con vistas panorámicas al mar.",
        "title": "Altomar A6"
    }
}

def apply_i18n(file_path, property_num):
    """Apply i18n attributes to a property page"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # 1. Add i18n.css in head (before </head> or before style.css)
    if '<link rel="stylesheet" href="css/i18n.css" />' not in content:
        content = content.replace(
            '<link href="style.css" rel="stylesheet"/>',
            '<link rel="stylesheet" href="css/i18n.css" />\n<link href="style.css" rel="stylesheet"/>'
        )

    # 2. Add language switcher after <body>
    if '<div class="lang-switcher">' not in content:
        lang_switcher = '''<!-- Language Switcher -->
<div class="lang-switcher">
    <button class="lang-btn active" data-lang="en" aria-label="Switch to English">
        <span class="sr-only">Switch to</span>EN
    </button>
    <button class="lang-btn" data-lang="es" aria-label="Cambiar a Español">
        <span class="sr-only">Cambiar a</span>ES
    </button>
</div>
'''
        content = content.replace('<body>\n', f'<body>\n{lang_switcher}')

    # 3. Add data-i18n to navigation menu
    nav_replacements = [
        (r'<li class=""><a href="index\.html">Home</a></li>',
         '<li class=""><a href="index.html" data-i18n="nav.home">Home</a></li>'),
        (r'<li class="current-menu-item"><a href="portfolio-four-column-wide\.html">Properties</a></li>',
         '<li class="current-menu-item"><a href="portfolio-four-column-wide.html" data-i18n="nav.properties">Properties</a></li>'),
        (r'<li><a href="about-us\.html">About Us</a></li>',
         '<li><a href="about-us.html" data-i18n="nav.about">About Us</a></li>'),
        (r'<li class="menu-item-has-children"><a href="servcies-detail-1\.html">Services</a>',
         '<li class="menu-item-has-children"><a href="servcies-detail-1.html" data-i18n="nav.services">Services</a>'),
    ]

    for pattern, replacement in nav_replacements:
        content = re.sub(pattern, replacement, content)

    # 4. Add data-i18n to breadcrumb tagline
    tagline_pattern = r'<li class="active">([^<]+)</li>'
    tagline_replacement = f'<li class="active" data-i18n="property.property{property_num}.tagline">{PROPERTIES_DATA[property_num]["tagline"]}</li>'
    content = re.sub(tagline_pattern, tagline_replacement, content)

    # 5. Add data-i18n to info cards
    info_card_replacements = [
        (r'<h6>Price:</h6>', '<h6 data-i18n="property.common.price">Price:</h6>'),
        (r'<h6>Surface:</h6>', '<h6 data-i18n="property.common.surface">Surface:</h6>'),
        (r'<h6>Bedrooms:</h6>', '<h6 data-i18n="property.common.bedrooms">Bedrooms:</h6>'),
        (r'<h6>Baths:</h6>', '<h6 data-i18n="property.common.baths">Baths:</h6>'),
        (r'<h6>Bathrooms:</h6>', '<h6 data-i18n="property.common.baths">Bathrooms:</h6>'),
        (r'<h6>Parking:</h6>', '<h6 data-i18n="property.common.parking">Parking:</h6>'),
        (r'<p>1 space</p>', '<p data-i18n="property.common.parkingSpace">1 space</p>'),
    ]

    for pattern, replacement in info_card_replacements:
        content = re.sub(pattern, replacement, content)

    # 6. Add data-i18n to Description header
    content = re.sub(r'<h4>Description</h4>',
                     '<h4 data-i18n="property.common.description">Description</h4>',
                     content)

    # 7. Add data-i18n to description paragraph (first <p> after Description h4)
    desc_pattern = r'(<h4 data-i18n="property\.common\.description">Description</h4>\s*<p)([^>]*)(>)'
    desc_replacement = rf'\1 data-i18n="property.property{property_num}.description"\3'
    content = re.sub(desc_pattern, desc_replacement, content)

    # 8. Add data-i18n to card titles
    card_replacements = [
        (r'<h6 class="card-title">Amenities</h6>',
         '<h6 class="card-title" data-i18n="property.common.amenities.title">Amenities</h6>'),
        (r'<h6 class="card-title">Devices</h6>',
         '<h6 class="card-title" data-i18n="property.common.devices.title">Devices</h6>'),
        (r'<h6 class="card-title">Electricity</h6>',
         '<h6 class="card-title" data-i18n="property.common.electricity.title">Electricity</h6>'),
        (r'<h6 class="card-title">Location</h6>',
         '<h6 class="card-title" data-i18n="property.common.location.title">Location</h6>'),
        (r'<h6 class="card-title">View</h6>',
         '<h6 class="card-title" data-i18n="property.common.view.title">View</h6>'),
        (r'<h6 class="card-title">Security</h6>',
         '<h6 class="card-title" data-i18n="property.common.security.title">Security</h6>'),
        (r'<h6 class="card-title">Construction</h6>',
         '<h6 class="card-title" data-i18n="property.common.construction.title">Construction</h6>'),
    ]

    for pattern, replacement in card_replacements:
        content = re.sub(pattern, replacement, content)

    # 9. Add data-i18n to Location heading (second occurrence)
    content = re.sub(r'<h4>Location</h4>',
                     '<h4 data-i18n="property.common.location.title">Location</h4>',
                     content, count=1)

    # 10. Add data-i18n to CTA section
    cta_replacements = [
        (r'<h2>Ready to Visit This Property\?</h2>',
         '<h2 data-i18n="property.common.cta.title">Ready to Visit This Property?</h2>'),
        (r'<a class="cta-btn cta-principal" href="https://wa\.me/523222922312" target="_blank">',
         '<a class="cta-btn cta-principal" href="https://wa.me/523222922312" target="_blank" data-i18n="property.common.cta.whatsapp">'),
        (r'<a class="cta-btn cta-secundario" href="contact\.html">',
         '<a class="cta-btn cta-secundario" href="contact.html" data-i18n="property.common.cta.schedule">'),
    ]

    for pattern, replacement in cta_replacements:
        content = re.sub(pattern, replacement, content)

    # 11. Add i18n.js script before </body>
    if '<script src="js/i18n.js"></script>' not in content:
        content = content.replace(
            '</body>',
            '<!-- i18n SCRIPT -->\n<script src="js/i18n.js"></script>\n</body>'
        )

    # Only write if content changed
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"[OK] Applied i18n to {file_path}")
        return True
    else:
        print(f"[SKIP] No changes needed for {file_path}")
        return False

if __name__ == '__main__':
    import os
    base_dir = r'C:\Users\Administrator\Desktop\ponchodavalos'

    for i in range(2, 13):
        file_path = os.path.join(base_dir, f'property-{i}.html')
        if os.path.exists(file_path):
            try:
                apply_i18n(file_path, i)
            except Exception as e:
                print(f"[ERROR] Error processing property-{i}.html: {e}")
        else:
            print(f"[ERROR] File not found: property-{i}.html")

    print("\n[DONE] i18n implementation complete for properties 2-12")
