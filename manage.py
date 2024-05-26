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
            ('bereich', None),
            ('thema', None),
            ('beschreibung', None),
            ('fach', None),
            ('klasse', None),
            ('reviewed_from', 'lmh'),
            ('reviewed_on', datetime.datetime.now().strftime('%d.%m.%Y')),
        ])   

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

                with open(file_path, 'w') as file:
                    file.write('---\n')
                    for doc in parsed_data:
                        yaml.dump(dict(doc), file, default_flow_style=False, allow_unicode=True, sort_keys=False)
                        file.write('---\n')

def main():
    parser = argparse.ArgumentParser(description='Parse and process source files.')
    parser.add_argument('--clean', action='store_true', help='Toggle to clean process the files')


    args = parser.parse_args()

    source_parser = SourceParser(**vars(args))
    
    if args.clean:
        source_parser.clean_files()

if __name__ == '__main__':
    main()
