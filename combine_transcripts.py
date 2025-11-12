#!/usr/bin/env python3
"""
Combine multiple XML transcript files into a single JSON file with timing information.
"""

import xml.etree.ElementTree as ET
import json
import glob
import os
from pathlib import Path

def parse_xml_transcript(xml_file):
    """Parse a single XML transcript file and extract words with timestamps."""
    tree = ET.parse(xml_file)
    root = tree.getroot()

    words = []
    for elem in root:
        # Get the tag without namespace
        tag = elem.tag.split('}')[-1] if '}' in elem.tag else elem.tag

        if tag == 'w':
            # Regular word
            word_text = elem.text if elem.text else ''

            # Check if it's punctuation
            is_punc = elem.get('punc') == 'true'

            # Get timestamps
            start_time = elem.get('starttime')
            end_time = elem.get('endtime')

            if word_text and not is_punc:
                words.append({
                    'word': word_text,
                    'start': float(start_time) if start_time else 0,
                    'end': float(end_time) if end_time else 0,
                    'speaker': os.path.basename(xml_file).split('.')[1]  # Extract speaker ID (A, B, C, D)
                })

    return words

def combine_transcripts(base_path, output_file):
    """Combine all transcript files into a single JSON file."""

    # Find all XML files matching the pattern
    xml_files = glob.glob(os.path.join(base_path, 'ES2007a.*.words.xml'))

    if not xml_files:
        print(f"No transcript files found in {base_path}")
        return

    print(f"Found {len(xml_files)} transcript files:")
    for f in xml_files:
        print(f"  - {os.path.basename(f)}")

    # Parse all files
    all_words = []
    for xml_file in xml_files:
        words = parse_xml_transcript(xml_file)
        all_words.extend(words)
        print(f"Parsed {len(words)} words from {os.path.basename(xml_file)}")

    # Sort by start time
    all_words.sort(key=lambda x: x['start'])

    # Create full transcript text
    transcript_text = ' '.join([w['word'] for w in all_words])

    # Create output data
    output_data = {
        'full_text': transcript_text,
        'words': all_words,
        'total_words': len(all_words),
        'duration': all_words[-1]['end'] if all_words else 0
    }

    # Write to JSON file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)

    print(f"\n✓ Combined transcript saved to: {output_file}")
    print(f"  Total words: {len(all_words)}")
    print(f"  Duration: {output_data['duration']:.2f} seconds")
    print(f"\nFirst 100 characters of transcript:")
    print(f"  {transcript_text[:100]}...")

if __name__ == '__main__':
    base_path = '/Users/akshaykn/Documents/Official/Random/MAP - STT test/assets/audio'
    output_file = '/Users/akshaykn/Documents/Official/Random/MAP - STT test/maptest/public/ground_truth.json'

    # Create output directory if it doesn't exist
    os.makedirs(os.path.dirname(output_file), exist_ok=True)

    combine_transcripts(base_path, output_file)
