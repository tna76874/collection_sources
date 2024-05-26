#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@author: lmh
"""
import os
import yaml
import datetime
import argparse
from collections import OrderedDict
from slugify import slugify

class SourceParser:
    def __init__(self, **kwargs):
        self.config =   {
                        'sources_dir' : '_sources',
                        }
        self.config.update(kwargs)
        self.source_keys = OrderedDict([
            ('source_link', None),
            ('youtube_id', None),
            ('youtube_time_start', None),
            ('youtube_time_end', None),
            ('fach', None),
            ('klasse', None),
            ('bereich', None),
            ('thema', None),
            ('beschreibung', None),
            ('reviewed_from', 'lmh'),
            ('reviewed_on', datetime.datetime.now().strftime('%d.%m.%Y')),
        ])

    def write_yaml_to_file(self, file_path, data):
        file_path = os.path.join(os.path.dirname(file_path), self.slugify_file_name(file_path))
        with open(file_path, 'w') as file:
            file.write('---\n')
            yaml.dump(data, file, default_flow_style=False, allow_unicode=True, sort_keys=False)
            file.write('---\n')

    def parse_sources_file(self, file_path):
        with open(file_path, 'r') as file:
            content = list(yaml.safe_load_all(file))

            parsed_data = []
            for doc in content:
                if doc:
                    ordered_doc = OrderedDict()
                    for key in self.source_keys.keys():
                        ordered_doc[key] = doc.get(key) or self.source_keys.get(key) or None

                    for key in doc:
                        if key not in ordered_doc.keys():
                            ordered_doc[key] = doc[key]

                    parsed_data.append(ordered_doc)

            return parsed_data

    def clean_files(self):
        for file_name in os.listdir(self.config['sources_dir']):
            if file_name.endswith('.md'):
                file_path = os.path.join(self.config['sources_dir'], file_name)
                parsed_data = self.parse_sources_file(file_path)

                for doc in parsed_data:
                    self.write_yaml_to_file(file_path, dict(doc))


    def slugify_file_name(self, file_name, delete=True):
        # Extract the base name from the full path
        base_name_with_extension = os.path.basename(file_name)
        # Remove file extension for slugifying
        base_name = os.path.splitext(base_name_with_extension)[0]
        # Replace non-alphanumeric characters with separator
        slug = slugify(base_name, separator='_')
        # Add the file extension back
        slugified_name = f"{slug}.md"
        old_file_path = os.path.join(self.config['sources_dir'], base_name_with_extension)
        # If the cleaned filename is different, delete the old file if it exists
        if base_name_with_extension != slugified_name and os.path.exists(old_file_path) and delete:
            os.remove(old_file_path)
        return slugified_name
                    
    def create_new_file(self):
        new_doc = OrderedDict()
        for key in self.source_keys.keys():
            user_input = input(f'Enter value for {key} \t (default: {self.source_keys.get(key)}): ')
            new_doc[key] = user_input if user_input else None

        file_name = input('Enter the name for the new source file (without extension): ') 
        file_path = os.path.join(self.config['sources_dir'], self.slugify_file_name(file_name))
        
        self.write_yaml_to_file(file_path, dict(new_doc))

def main():
    parser = argparse.ArgumentParser(description='Parse and process source files.')
    parser.add_argument('--clean', action='store_true', help='Toggle to clean process the files')
    parser.add_argument('-n', '--new', action='store_true', help='Toggle to create a new source file')


    args = parser.parse_args()

    source_parser = SourceParser(**vars(args))
    
    if args.clean:
        source_parser.clean_files()

    if args.new:
        source_parser.create_new_file()

if __name__ == '__main__':
    main()
