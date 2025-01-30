from bs4 import BeautifulSoup
import re

# Load the HTML file
with open('d:/RealFemboy/RealFemboy.Tech/www/index.html', 'r', encoding='utf-8') as file:
    soup = BeautifulSoup(file, 'html.parser')

# Function to update class names in HTML
def update_class_names(soup, old_class, new_class):
    for element in soup.find_all(class_=re.compile(r'\b' + re.escape(old_class) + r'\b')):
        classes = element.get('class', [])
        updated_classes = [new_class if cls == old_class else cls for cls in classes]
        element['class'] = updated_classes

# Function to update id names in HTML
def update_id_names(soup, old_id, new_id):
    for element in soup.find_all(id=old_id):
        element['id'] = new_id

# Function to update data-unit-id in HTML
def update_data_unit_id(soup, old_data_unit_id, new_data_unit_id):
    for element in soup.find_all(attrs={"data-unit-id": old_data_unit_id}):
        element['data-unit-id'] = new_data_unit_id

# Function to update class, id, and data-unit-id names in CSS
def update_css_names(css_content, old_name, new_name):
    css_content = re.sub(r'\.' + re.escape(old_name) + r'(\W)', r'.' + new_name + r'\1', css_content)
    css_content = re.sub(r'#' + re.escape(old_name) + r'(\W)', r'#' + new_name + r'\1', css_content)
    css_content = re.sub(r'\[data-unit-id="' + re.escape(old_name) + r'"\]', r'[data-unit-id="' + new_name + r'"]', css_content)
    return css_content

# List of name changes
name_changes = {
    'homepage-section': 'HUB-section',
    'unit-image-apple-watch-unity-hero-apple-watch-unity': 'united-by-femboys',
    'unit-image-apple-watch-series-10-promo-apple-watch-series-10-avail-lte': 'thighs-class',
    'unit-image-macbook-air-m3-promo-macbook-air-m3': 'cute-and-love-starved',
    'unit-image-ipad-pro-promo-ipadpro-avail': 'want-you',
    'unit-image-airpods-pro-2-promo-airpods-pro-2-avail': 'like-anime',
    'unit-image-iphone-tradein-promo-iphone-tradein': 'get-your-femboy'
}

# Update class, id, and data-unit-id names in HTML
for old_name, new_name in name_changes.items():
    update_class_names(soup, old_name, new_name)
    update_id_names(soup, old_name, new_name)
    update_data_unit_id(soup, old_name, new_name)

# Save the updated HTML back to the file
with open('d:/RealFemboy/RealFemboy.Tech/www/TrueIndex.html', 'w', encoding='utf-8') as file:
    file.write(str(soup))

# Load the CSS file
with open('d:/RealFemboy/RealFemboy.Tech/www/HUB_files/main.built.css', 'r', encoding='utf-8') as file:
    css_content = file.read()

# Update class, id, and data-unit-id names in CSS
for old_name, new_name in name_changes.items():
    css_content = update_css_names(css_content, old_name, new_name)

# Save the updated CSS back to the file
with open('d:/RealFemboy/RealFemboy.Tech/www/HUB_files/output4.css', 'w', encoding='utf-8') as file:
    file.write(css_content)

print("HTML and CSS classes, ids, and data-unit-ids updated successfully.")