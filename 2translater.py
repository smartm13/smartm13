import os, logging
from deep_translator import GoogleTranslator
from bs4 import BeautifulSoup

logging.basicConfig(format='%(asctime)s [%(levelname)s2].<%(process)d>:%(module)s.%(funcName)s.%(lineno)s: %(message)s',
                    level=logging.DEBUG, datefmt='%Y-%m-%d %H:%M:%S')

def detect_encoding(input_path, encodings = ['utf8', 'gb2312', 'iso8859']):
    # will open the html file and return meta charset value
    for enc in encodings:
        with open(input_path, encoding='utf8') as f:
            try:
                text = f.read()
            except UnicodeDecodeError:
                continue
            # try charset="asd"
            if 'charset="' in text:
                st = text.index('charset="') + len('charset="')
                en = text.index('"', st)
                return text[st:en]
            else:
                st = text.index('charset=') + len('charset=')
                en = text.index('"', st)
                return text[st:en]
    raise Exception(f"Cant detect encoding for: {input_path}")

# Function to translate Chinese text in HTML file
def ranslate_html_file_soup(input_path, output_path):
    enc = detect_encoding(input_path)
    logging.info(f"Translating {input_path} with Encoding {enc}")
    with open(input_path, 'r', encoding=enc) as file:
        html_content = file.read()
        soup = BeautifulSoup(html_content, 'html.parser')
        chinese_elements = soup.find_all(text=True)
        for element in chinese_elements:
            if any('\u4e00' <= c <= '\u9fff' for c in element):
                translated_text = GoogleTranslator(source='zh-CN', target='en').translate(element)
                logging.info(f"Old Text: {element}")
                logging.info(f"New Text: {translated_text}")
                element.replace_with(translated_text)
        # translated_text = GoogleTranslator(source='zh-CN', target='en').translate(html_content)
        with open(output_path, 'w', encoding='utf-8') as new_file:
            new_file.write(str(soup))
            # new_file.write(str(translated_text))

def translate_html_file(input_path, output_path):
    enc = detect_encoding(input_path)
    logging.info(f"Translating {input_path} with Encoding {enc}")
    with open(input_path, 'r', encoding=enc) as file:
        html_content = file.read()
        translated_text = ""
        buffer = ""
        for c in html_content:
            if '\u4e00' <= c <= '\u9fff':
                buffer += c
            else:
                if buffer:
                    translated_text += GoogleTranslator(source='zh-CN', target='en').translate(buffer)
                    buffer = ""
                translated_text += c

        with open(output_path, 'w', encoding='utf-8') as new_file:
            new_file.write(str(translated_text))


# Main function to create English version folder
def create_english_version_folder(input_folder):
    output_folder = input_folder + '_english_version'
    failed = []
    for root, dirs, files in os.walk(input_folder):
        for file in files:
            if file.endswith('.html'):
                input_path = os.path.join(root, file)
                output_path = input_path.replace(input_folder, output_folder)
                os.makedirs(os.path.dirname(output_path), exist_ok=True)
                try:
                    translate_html_file(input_path, output_path)
                except:
                    failed.append(input_path)
    print("Failed: ", failed)


if __name__ == '__main__':
    create_english_version_folder('Site1-www.haiws.com')
