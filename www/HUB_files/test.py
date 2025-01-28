def format_css_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Replace '}' with '}\n' and ';' with ';\n'
    formatted_content = content.replace('}', '}\n').replace(';', ';\n')

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(formatted_content)

if __name__ == "__main__":
    format_css_file('main.built.css')