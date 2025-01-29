from bs4 import BeautifulSoup
import re

# Load the HTML file
with open('d:/RealFemboy/RealFemboy.Tech/www/index.html', 'r', encoding='utf-8') as file:
    soup = BeautifulSoup(file, 'html.parser')

# Function to update class names in HTML
def update_class_names(soup, old_class, new_class):
    for element in soup.find_all(class_=old_class):
        element['class'] = [new_class if cls == old_class else cls for cls in element['class']]

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
    css_content = re.sub(r'\.' + old_name + r'(\W)', r'.' + new_name + r'\1', css_content)
    css_content = re.sub(r'#' + old_name + r'(\W)', r'#' + new_name + r'\1', css_content)
    css_content = re.sub(r'\[data-unit-id="' + old_name + r'"\]', r'[data-unit-id="' + new_name + r'"]', css_content)
    return css_content

# List of name changes
name_changes = {
    'homepage-section': 'HUB-section',
    'apple-watch-unity': 'United-By-Femboys',
    'apple-watch-series-10': 'Thighs',
    'privacy-day': 'Single',
    'macbook-air-m3': 'Cute-And-Love-Starved',
    'ipad-pro': 'Want-You',
    'airpods-pro-2': 'Like-Anime',
    'iphone-tradein': 'Get-Your-Femboy'
}

# Update class, id, and data-unit-id names in HTML
for old_name, new_name in name_changes.items():
    update_class_names(soup, old_name, new_name)
    update_id_names(soup, old_name, new_name)
    update_data_unit_id(soup, old_name, new_name)

# Save the updated HTML back to the file
with open('d:/RealFemboy/RealFemboy.Tech/www/index.html', 'w', encoding='utf-8') as file:
    file.write(str(soup))

# Load the CSS file
with open('d:/RealFemboy/RealFemboy.Tech/www/HUB_files/output3.css', 'r', encoding='utf-8') as file:
    css_content = file.read()

# Update class, id, and data-unit-id names in CSS
for old_name, new_name in name_changes.items():
    css_content = update_css_names(css_content, old_name, new_name)

# Save the updated CSS back to the file
with open('d:/RealFemboy/RealFemboy.Tech/www/HUB_files/output4.css', 'w', encoding='utf-8') as file:
    file.write(css_content)

print("HTML and CSS classes, ids, and data-unit-ids updated successfully.")