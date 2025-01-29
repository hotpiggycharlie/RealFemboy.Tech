import re

def process_css(input_file, output_file):
    in_media = False
    media_block = []

    with open(input_file, 'r', encoding="utf8") as infile:
        for line in infile:
            stripped_line = line.strip()

            # Check if we're entering a media query
            if stripped_line.startswith('@media'):
                in_media = True
                media_block.append(line)

                # Find the opening brace
                while '{' not in stripped_line:
                    line = next(infile)
                    stripped_line = line.strip()
                    media_block.append(line)

                # Start processing lines inside the media block
                continue_processing = True

                while continue_processing:
                    line = next(infile, '')
                    stripped_line = line.strip()

                    if '}' in stripped_line:
                        media_block.append(line)
                        in_media = False
                        continue_processing = False
                    else:
                        # Remove background-image properties
                        if not stripped_line.startswith('background-image'):
                            media_block.append(line)
            else:
                media_block.append(line)


    # Write the processed lines to the output file
    with open(output_file, 'w', encoding='utf8') as outfile:
        for line in media_block:
            outfile.write(line)

# Usage
process_css('output2.css', 'output3.css')