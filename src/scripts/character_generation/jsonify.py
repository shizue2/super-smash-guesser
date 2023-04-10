import csv
import json

def csv_to_json(csv_file, json_file):
    with open(csv_file, 'r') as csvfile:
        csv_reader = csv.DictReader(csvfile)
        data = [row for row in csv_reader]

    with open(json_file, 'w') as jsonfile:
        json.dump(data, jsonfile, indent=2)

csv_file = 'characters.csv'
json_file = 'characters.json'
csv_to_json(csv_file, json_file)