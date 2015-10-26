import unittest
import convert_to_json
import csv

class FilterData(unittest.TestCase):
    def setUp(self):
        lines = [
            'piste;nimi;x_gk25;y_gk25;suunta;aika;vuosi;ha;pa;ka;ra;la;mp;rv;autot',
            'A01;LAUTTASAAREN SILTA;25494426;6672169;1;615;2011;45;4;3;0;8;0;0;60',
            'A01;LAUTTASAAREN SILTA;25494426;6672169;1;630;2014;60;6;2;0;9;1;0;77',
            'A01;LAUTTASAAREN SILTA;25494426;6672169;1;645;2012;77;6;3;0;10;1;0;96'
        ]
        self.reader = csv.DictReader(lines, delimiter=";")

    def test_filtering(self):
        filtered_data = convert_to_json.filter_data(self.reader)
        self.assertEqual(len(filtered_data), 1)
        self.assertEqual(filtered_data[0]['aika'], '630')

class CreateMeasurementPoints(unittest.TestCase):
    def setUp(self):
        lines = [
            'piste;nimi;x_gk25;y_gk25;suunta;aika;vuosi;ha;pa;ka;ra;la;mp;rv;autot',
            'A01;LAUTTASAAREN SILTA;25494426;6672169;1;600;2011;42;4;1;0;7;0;0;54',
            'A01;LAUTTASAAREN SILTA;25494426;6672169;1;615;2011;45;4;3;0;8;0;0;60',
            'A01;LAUTTASAAREN SILTA;25494426;6672169;2;1500;2011;96;10;3;0;6;2;0;115',
            'A05;RUNEBERGINKATU;25495686;6673769;2;1000;2011;543;88;30;2;10;4;0;673'
        ]
        self.reader = csv.DictReader(lines, delimiter=";")

    def test_creation(self):
        points = convert_to_json.create_measurement_points(self.reader)
        self.assertEqual(len(points['A01']), 2)
        self.assertEqual(len(points['A05']), 1)
        
        self.assertEqual(points['A01'][0]['time'], 6)
        self.assertEqual(points['A01'][1]['time'], 15)
        self.assertEqual(points['A05'][0]['time'], 10)

        self.assertEqual(points['A01'][0]['total'], 114)
        self.assertEqual(points['A01'][1]['total'], 115)
        self.assertEqual(points['A05'][0]['total'], 673)

class CreateNewMeasurement(unittest.TestCase):
    def setUp(self):
        data = [
            'piste;nimi;x_gk25;y_gk25;suunta;aika;vuosi;ha;pa;ka;ra;la;mp;rv;autot',
            'A01;LAUTTASAAREN SILTA;25494426;6672169;1;615;2011;45;4;3;7;8;5;18;60',
        ]
        reader = csv.DictReader(data, delimiter=";")
        self.row = list(reader)[0]

    def test_creation(self):
        measurement = convert_to_json.create_new_measurement(self.row)
        self.assertEqual(measurement['direction'], '1')
        self.assertEqual(measurement['time'], 6)
        self.assertEqual(measurement['car'], 45)
        self.assertEqual(measurement['van'], 4)
        self.assertEqual(measurement['truck'], 3 + 7)
        self.assertEqual(measurement['bus'], 8)
        self.assertEqual(measurement['motorcycle'], 5)
        self.assertEqual(measurement['tram'], 18)
        self.assertEqual(measurement['total'], 60)

class AppendToPreviousMeasurement(unittest.TestCase):
    def setUp(self):
        data = [
            'piste;nimi;x_gk25;y_gk25;suunta;aika;vuosi;ha;pa;ka;ra;la;mp;rv;autot',
            'A01;LAUTTASAAREN SILTA;25494426;6672169;1;615;2011;45;4;3;7;8;5;18;60',
        ]
        reader = csv.DictReader(data, delimiter=";")
        self.row = list(reader)[0]
        self.latest_measurement = {
            'direction': '1',
            'time': 6,
            'car': 20,
            'van': 10,
            'truck': 15,
            'bus': 22,
            'motorcycle': 12,
            'tram': 18,
            'total': 115
        }

    def test_creation(self):
        measurement = convert_to_json.append_to_previous_measurement(self.row, self.latest_measurement)
        self.assertEqual(measurement['direction'], '1')
        self.assertEqual(measurement['time'], 6)
        self.assertEqual(measurement['car'], 65)
        self.assertEqual(measurement['van'], 14)
        self.assertEqual(measurement['truck'], 25)
        self.assertEqual(measurement['bus'], 30)
        self.assertEqual(measurement['motorcycle'], 17)
        self.assertEqual(measurement['tram'], 36)
        self.assertEqual(measurement['total'], 175)

class GetMinutes(unittest.TestCase):
    def test_zero_minutes(self):
        row = {
            'aika': '600'
        }
        self.assertEqual(convert_to_json.get_minutes(row), 0)

    def test_non_zero_minutes(self):
        row = {
            'aika': '615'
        }
        self.assertEqual(convert_to_json.get_minutes(row), 15)
