import csv
import json

def main():
    reader = csv.DictReader(open('hki_liikennemaarat.csv', 'r'), delimiter=";")
    measurement_points = handle_csv(reader)
    print json.dumps(measurement_points, indent=2, separators=(',', ': '))

def handle_csv(reader):
    filtered_data = filter_data(reader)
    return create_measurement_points(filtered_data)

def filter_data(reader):
    filter_years = [row for row in reader if row['vuosi'] == '2014']
    return filter_years

def create_measurement_points(data):
    measurement_points = {}
    for row in data:
        create_measurement_point(row, measurement_points)
        handle_row(row, measurement_points)
    return measurement_points

def create_measurement_point(row, measurement_points):
    measurement_point = row['piste']
    if not measurement_point in measurement_points:
        measurement_points[measurement_point] = []

def handle_row(row, measurement_points):
    minutes = get_minutes(row)
    if minutes == 0:
        measurement = create_new_measurement(row)
        measurement_point = row['piste']
        measurement_points[measurement_point].append(measurement)
    else:
        measurement_point = row['piste']
        latest_measurement = measurement_points[measurement_point][-1]
        measurement_points[measurement_point][-1] = append_to_previous_measurement(row, latest_measurement)

def create_new_measurement(row):
    measurement = {}
    measurement['direction'] = row['suunta']
    measurement['time'] = parse_time(row['aika'])
    measurement['car'] = int(row['ha'])
    measurement['van'] = int(row['pa'])
    measurement['truck'] = int(row['ka']) + int(row['ra'])
    measurement['bus'] = int(row['la'])
    measurement['motorcycle'] = int(row['mp'])
    measurement['tram'] = int(row['rv'])
    measurement['total'] = int(row['autot'])
    return measurement

def append_to_previous_measurement(row, latest_measurement):
    measurement = create_new_measurement(row)
    measurement['car'] += latest_measurement['car']
    measurement['van'] += latest_measurement['van']
    measurement['truck'] += latest_measurement['truck']
    measurement['bus'] += latest_measurement['bus']
    measurement['motorcycle'] += latest_measurement['motorcycle']
    measurement['tram'] += latest_measurement['tram']
    measurement['total'] += latest_measurement['total']
    return measurement

def get_minutes(row):
    return int(row['aika']) % 100

def parse_time(time_str):
    time_int = int(time_str)
    # return '{0}:{1}'.format(time_int / 100, time_int % 100)
    return time_int / 100

if __name__ == "__main__":
    main()