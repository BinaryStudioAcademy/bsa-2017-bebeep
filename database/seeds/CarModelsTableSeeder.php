<?php

use Illuminate\Database\Seeder;

class CarModelsTableSeeder extends Seeder
{
    /**
     * Auto generated seed file.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('car_models')->delete();

        \DB::table('car_models')->insert([
            0 => [
                'id_car_mark' => 1,
                'name' => '378 GT Zagato',
            ],
            1 => [
                'id_car_mark' => 1,
                'name' => 'Ace',
            ],
            2 => [
                'id_car_mark' => 1,
                'name' => 'Aceca',
            ],
            3 => [
                'id_car_mark' => 1,
                'name' => 'Cobra',
            ],
            4 => [
                'id_car_mark' => 2,
                'name' => 'CL',
            ],
            5 => [
                'id_car_mark' => 2,
                'name' => 'CSX',
            ],
            6 => [
                'id_car_mark' => 2,
                'name' => 'EL',
            ],
            7 => [
                'id_car_mark' => 2,
                'name' => 'ILX',
            ],
            8 => [
                'id_car_mark' => 2,
                'name' => 'Integra',
            ],
            9 => [
                'id_car_mark' => 2,
                'name' => 'Legend',
            ],
            10 => [
                'id_car_mark' => 2,
                'name' => 'MDX',
            ],
            11 => [
                'id_car_mark' => 2,
                'name' => 'NSX',
            ],
            12 => [
                'id_car_mark' => 2,
                'name' => 'RDX',
            ],
            13 => [
                'id_car_mark' => 2,
                'name' => 'RL',
            ],
            14 => [
                'id_car_mark' => 2,
                'name' => 'RLX',
            ],
            15 => [
                'id_car_mark' => 2,
                'name' => 'RSX',
            ],
            16 => [
                'id_car_mark' => 2,
                'name' => 'SLX',
            ],
            17 => [
                'id_car_mark' => 2,
                'name' => 'TL',
            ],
            18 => [
                'id_car_mark' => 2,
                'name' => 'TSX',
            ],
            19 => [
                'id_car_mark' => 2,
                'name' => 'ZDX',
            ],
            20 => [
                'id_car_mark' => 3,
                'name' => '145',
            ],
            21 => [
                'id_car_mark' => 3,
                'name' => '146',
            ],
            22 => [
                'id_car_mark' => 3,
                'name' => '147',
            ],
            23 => [
                'id_car_mark' => 3,
                'name' => '155',
            ],
            24 => [
                'id_car_mark' => 3,
                'name' => '156',
            ],
            25 => [
                'id_car_mark' => 3,
                'name' => '159',
            ],
            26 => [
                'id_car_mark' => 3,
                'name' => '164',
            ],
            27 => [
                'id_car_mark' => 3,
                'name' => '166',
            ],
            28 => [
                'id_car_mark' => 3,
                'name' => '33',
            ],
            29 => [
                'id_car_mark' => 3,
                'name' => '4C',
            ],
            30 => [
                'id_car_mark' => 3,
                'name' => '6',
            ],
            31 => [
                'id_car_mark' => 3,
                'name' => '75',
            ],
            32 => [
                'id_car_mark' => 3,
                'name' => '8C Competizione',
            ],
            33 => [
                'id_car_mark' => 3,
                'name' => '90',
            ],
            34 => [
                'id_car_mark' => 3,
                'name' => 'Alfasud',
            ],
            35 => [
                'id_car_mark' => 3,
                'name' => 'Alfetta',
            ],
            36 => [
                'id_car_mark' => 3,
                'name' => 'Arna',
            ],
            37 => [
                'id_car_mark' => 3,
                'name' => 'Brera',
            ],
            38 => [
                'id_car_mark' => 3,
                'name' => 'Giulia',
            ],
            39 => [
                'id_car_mark' => 3,
                'name' => 'Giulietta',
            ],
            40 => [
                'id_car_mark' => 3,
                'name' => 'GT',
            ],
            41 => [
                'id_car_mark' => 3,
                'name' => 'GTA Coupe',
            ],
            42 => [
                'id_car_mark' => 3,
                'name' => 'GTV',
            ],
            43 => [
                'id_car_mark' => 3,
                'name' => 'MiTo',
            ],
            44 => [
                'id_car_mark' => 3,
                'name' => 'Montreal',
            ],
            45 => [
                'id_car_mark' => 3,
                'name' => 'RZ',
            ],
            46 => [
                'id_car_mark' => 3,
                'name' => 'Spider',
            ],
            47 => [
                'id_car_mark' => 3,
                'name' => 'Sprint',
            ],
            48 => [
                'id_car_mark' => 3,
                'name' => 'SZ',
            ],
            49 => [
                'id_car_mark' => 4,
                'name' => 'A110',
            ],
            50 => [
                'id_car_mark' => 4,
                'name' => 'A310',
            ],
            51 => [
                'id_car_mark' => 4,
                'name' => 'A610',
            ],
            52 => [
                'id_car_mark' => 4,
                'name' => 'GTA',
            ],
            53 => [
                'id_car_mark' => 5,
            'name' => 'HMMWV (Humvee)',
            ],
            54 => [
                'id_car_mark' => 6,
                'name' => 'Atom',
            ],
            55 => [
                'id_car_mark' => 7,
                'name' => '10',
            ],
            56 => [
                'id_car_mark' => 7,
                'name' => '24',
            ],
            57 => [
                'id_car_mark' => 8,
                'name' => 'Retona',
            ],
            58 => [
                'id_car_mark' => 8,
                'name' => 'Rocsta',
            ],
            59 => [
                'id_car_mark' => 9,
                'name' => 'Bulldog',
            ],
            60 => [
                'id_car_mark' => 9,
                'name' => 'Cygnet',
            ],
            61 => [
                'id_car_mark' => 9,
                'name' => 'DB7',
            ],
            62 => [
                'id_car_mark' => 9,
                'name' => 'DB9',
            ],
            63 => [
                'id_car_mark' => 9,
                'name' => 'DBS',
            ],
            64 => [
                'id_car_mark' => 9,
                'name' => 'Lagonda',
            ],
            65 => [
                'id_car_mark' => 9,
                'name' => 'One-77',
            ],
            66 => [
                'id_car_mark' => 9,
                'name' => 'Rapide',
            ],
            67 => [
                'id_car_mark' => 9,
                'name' => 'Tickford Capri',
            ],
            68 => [
                'id_car_mark' => 9,
                'name' => 'V12 Vanquish',
            ],
            69 => [
                'id_car_mark' => 9,
                'name' => 'V12 Vantage',
            ],
            70 => [
                'id_car_mark' => 9,
                'name' => 'V12 Zagato',
            ],
            71 => [
                'id_car_mark' => 9,
                'name' => 'V8 Vantage',
            ],
            72 => [
                'id_car_mark' => 9,
                'name' => 'V8 Zagato',
            ],
            73 => [
                'id_car_mark' => 9,
                'name' => 'Virage',
            ],
            74 => [
                'id_car_mark' => 10,
                'name' => '100',
            ],
            75 => [
                'id_car_mark' => 10,
                'name' => '200',
            ],
            76 => [
                'id_car_mark' => 10,
                'name' => '50',
            ],
            77 => [
                'id_car_mark' => 10,
                'name' => '80',
            ],
            78 => [
                'id_car_mark' => 10,
                'name' => '90',
            ],
            79 => [
                'id_car_mark' => 10,
                'name' => 'A1',
            ],
            80 => [
                'id_car_mark' => 10,
                'name' => 'A2',
            ],
            81 => [
                'id_car_mark' => 10,
                'name' => 'A3',
            ],
            82 => [
                'id_car_mark' => 10,
                'name' => 'A4 allroad',
            ],
            83 => [
                'id_car_mark' => 10,
                'name' => 'A4',
            ],
            84 => [
                'id_car_mark' => 10,
                'name' => 'A5',
            ],
            85 => [
                'id_car_mark' => 10,
                'name' => 'A6 allroad',
            ],
            86 => [
                'id_car_mark' => 10,
                'name' => 'A6',
            ],
            87 => [
                'id_car_mark' => 10,
                'name' => 'A7',
            ],
            88 => [
                'id_car_mark' => 10,
                'name' => 'A8',
            ],
            89 => [
                'id_car_mark' => 10,
                'name' => 'Cabriolet',
            ],
            90 => [
                'id_car_mark' => 10,
                'name' => 'Coupe',
            ],
            91 => [
                'id_car_mark' => 10,
                'name' => 'NSU RO 80',
            ],
            92 => [
                'id_car_mark' => 10,
                'name' => 'Q3',
            ],
            93 => [
                'id_car_mark' => 10,
                'name' => 'Q5',
            ],
            94 => [
                'id_car_mark' => 10,
                'name' => 'Q7',
            ],
            95 => [
                'id_car_mark' => 10,
                'name' => 'quattro',
            ],
            96 => [
                'id_car_mark' => 10,
                'name' => 'R8',
            ],
            97 => [
                'id_car_mark' => 10,
                'name' => 'RS Q3',
            ],
            98 => [
                'id_car_mark' => 10,
                'name' => 'RS2',
            ],
            99 => [
                'id_car_mark' => 10,
                'name' => 'RS3',
            ],
            100 => [
                'id_car_mark' => 10,
                'name' => 'RS4',
            ],
            101 => [
                'id_car_mark' => 10,
                'name' => 'RS5',
            ],
            102 => [
                'id_car_mark' => 10,
                'name' => 'RS6',
            ],
            103 => [
                'id_car_mark' => 10,
                'name' => 'RS7',
            ],
            104 => [
                'id_car_mark' => 10,
                'name' => 'S1',
            ],
            105 => [
                'id_car_mark' => 10,
                'name' => 'S2',
            ],
            106 => [
                'id_car_mark' => 10,
                'name' => 'S3',
            ],
            107 => [
                'id_car_mark' => 10,
                'name' => 'S4',
            ],
            108 => [
                'id_car_mark' => 10,
                'name' => 'S5',
            ],
            109 => [
                'id_car_mark' => 10,
                'name' => 'S6',
            ],
            110 => [
                'id_car_mark' => 10,
                'name' => 'S7',
            ],
            111 => [
                'id_car_mark' => 10,
                'name' => 'S8',
            ],
            112 => [
                'id_car_mark' => 10,
                'name' => 'SQ5',
            ],
            113 => [
                'id_car_mark' => 10,
                'name' => 'TT',
            ],
            114 => [
                'id_car_mark' => 10,
                'name' => 'V8',
            ],
            115 => [
                'id_car_mark' => 11,
                'name' => 'Allegro',
            ],
            116 => [
                'id_car_mark' => 11,
                'name' => 'Ambassador',
            ],
            117 => [
                'id_car_mark' => 11,
                'name' => 'Maestro',
            ],
            118 => [
                'id_car_mark' => 11,
                'name' => 'Maxi',
            ],
            119 => [
                'id_car_mark' => 11,
                'name' => 'Metro',
            ],
            120 => [
                'id_car_mark' => 11,
                'name' => 'Mini',
            ],
            121 => [
                'id_car_mark' => 11,
                'name' => 'Montego',
            ],
            122 => [
                'id_car_mark' => 11,
                'name' => 'Princess',
            ],
            123 => [
                'id_car_mark' => 12,
                'name' => 'A 112',
            ],
            124 => [
                'id_car_mark' => 13,
                'name' => 'BD-1322',
            ],
            125 => [
                'id_car_mark' => 14,
                'name' => 'BJ2020',
            ],
            126 => [
                'id_car_mark' => 14,
                'name' => 'BJ212',
            ],
            127 => [
                'id_car_mark' => 15,
                'name' => 'Arnage',
            ],
            128 => [
                'id_car_mark' => 15,
                'name' => 'Azure',
            ],
            129 => [
                'id_car_mark' => 15,
                'name' => 'Brooklands',
            ],
            130 => [
                'id_car_mark' => 15,
                'name' => 'Continental',
            ],
            131 => [
                'id_car_mark' => 15,
                'name' => 'Continental Flying Spur',
            ],
            132 => [
                'id_car_mark' => 15,
                'name' => 'Continental GT',
            ],
            133 => [
                'id_car_mark' => 15,
                'name' => 'Eight',
            ],
            134 => [
                'id_car_mark' => 15,
                'name' => 'Flying Spur',
            ],
            135 => [
                'id_car_mark' => 15,
                'name' => 'Mulsanne',
            ],
            136 => [
                'id_car_mark' => 15,
                'name' => 'Turbo R',
            ],
            137 => [
                'id_car_mark' => 16,
                'name' => 'Freeclimber',
            ],
            138 => [
                'id_car_mark' => 17,
                'name' => 'Type 3',
            ],
            139 => [
                'id_car_mark' => 18,
            'name' => '02 (E10)',
            ],
            140 => [
                'id_car_mark' => 18,
                'name' => '1er',
            ],
            141 => [
                'id_car_mark' => 18,
                'name' => '2er',
            ],
            142 => [
                'id_car_mark' => 18,
                'name' => '2er Active Tourer',
            ],
            143 => [
                'id_car_mark' => 18,
                'name' => '3er',
            ],
            144 => [
                'id_car_mark' => 18,
                'name' => '4er',
            ],
            145 => [
                'id_car_mark' => 18,
                'name' => '5er',
            ],
            146 => [
                'id_car_mark' => 18,
                'name' => '6er',
            ],
            147 => [
                'id_car_mark' => 18,
                'name' => '7er',
            ],
            148 => [
                'id_car_mark' => 18,
                'name' => '8er',
            ],
            149 => [
                'id_car_mark' => 18,
                'name' => 'i3',
            ],
            150 => [
                'id_car_mark' => 18,
                'name' => 'i8',
            ],
            151 => [
                'id_car_mark' => 18,
                'name' => 'X1',
            ],
            152 => [
                'id_car_mark' => 18,
                'name' => 'X3',
            ],
            153 => [
                'id_car_mark' => 18,
                'name' => 'X4',
            ],
            154 => [
                'id_car_mark' => 18,
                'name' => 'X5',
            ],
            155 => [
                'id_car_mark' => 18,
                'name' => 'X6',
            ],
            156 => [
                'id_car_mark' => 18,
                'name' => 'Z1',
            ],
            157 => [
                'id_car_mark' => 18,
                'name' => 'Z3',
            ],
            158 => [
                'id_car_mark' => 18,
                'name' => 'Z4',
            ],
            159 => [
                'id_car_mark' => 18,
                'name' => 'Z8',
            ],
            160 => [
                'id_car_mark' => 20,
                'name' => '7.3S',
            ],
            161 => [
                'id_car_mark' => 20,
                'name' => 'M V12',
            ],
            162 => [
                'id_car_mark' => 20,
                'name' => 'SV12',
            ],
            163 => [
                'id_car_mark' => 21,
            'name' => 'FRV (BS2)',
            ],
            164 => [
                'id_car_mark' => 21,
            'name' => 'M1 (BS6)',
            ],
            165 => [
                'id_car_mark' => 21,
            'name' => 'M2 (BS4)',
            ],
            166 => [
                'id_car_mark' => 21,
            'name' => 'M3 (BC3)',
            ],
            167 => [
                'id_car_mark' => 21,
                'name' => 'V5',
            ],
            168 => [
                'id_car_mark' => 22,
                'name' => 'Blenheim',
            ],
            169 => [
                'id_car_mark' => 22,
                'name' => 'Blenheim Speedster',
            ],
            170 => [
                'id_car_mark' => 22,
                'name' => 'Fighter',
            ],
            171 => [
                'id_car_mark' => 23,
                'name' => 'Geneva',
            ],
            172 => [
                'id_car_mark' => 23,
                'name' => 'La Joya',
            ],
            173 => [
                'id_car_mark' => 24,
                'name' => 'EB 110',
            ],
            174 => [
                'id_car_mark' => 24,
                'name' => 'EB 112',
            ],
            175 => [
                'id_car_mark' => 25,
                'name' => 'Century',
            ],
            176 => [
                'id_car_mark' => 25,
                'name' => 'Electra',
            ],
            177 => [
                'id_car_mark' => 25,
                'name' => 'Enclave',
            ],
            178 => [
                'id_car_mark' => 25,
                'name' => 'Excelle',
            ],
            179 => [
                'id_car_mark' => 25,
                'name' => 'GL8',
            ],
            180 => [
                'id_car_mark' => 25,
                'name' => 'LaCrosse',
            ],
            181 => [
                'id_car_mark' => 25,
                'name' => 'LeSabre',
            ],
            182 => [
                'id_car_mark' => 25,
                'name' => 'Lucerne',
            ],
            183 => [
                'id_car_mark' => 25,
                'name' => 'Park Avenue',
            ],
            184 => [
                'id_car_mark' => 25,
                'name' => 'Rainer',
            ],
            185 => [
                'id_car_mark' => 25,
                'name' => 'Reatta',
            ],
            186 => [
                'id_car_mark' => 25,
                'name' => 'Regal',
            ],
            187 => [
                'id_car_mark' => 25,
                'name' => 'Rendezvous',
            ],
            188 => [
                'id_car_mark' => 25,
                'name' => 'Riviera',
            ],
            189 => [
                'id_car_mark' => 25,
                'name' => 'Roadmaster',
            ],
            190 => [
                'id_car_mark' => 25,
                'name' => 'Skylark',
            ],
            191 => [
                'id_car_mark' => 25,
                'name' => 'Terraza',
            ],
            192 => [
                'id_car_mark' => 26,
                'name' => 'E6',
            ],
            193 => [
                'id_car_mark' => 26,
                'name' => 'F0',
            ],
            194 => [
                'id_car_mark' => 26,
                'name' => 'F3',
            ],
            195 => [
                'id_car_mark' => 26,
                'name' => 'F6',
            ],
            196 => [
                'id_car_mark' => 26,
                'name' => 'F8',
            ],
            197 => [
                'id_car_mark' => 26,
                'name' => 'Flyer',
            ],
            198 => [
                'id_car_mark' => 26,
                'name' => 'G3',
            ],
            199 => [
                'id_car_mark' => 26,
                'name' => 'G6',
            ],
            200 => [
                'id_car_mark' => 26,
                'name' => 'L3',
            ],
            201 => [
                'id_car_mark' => 26,
                'name' => 'M6',
            ],
            202 => [
                'id_car_mark' => 26,
                'name' => 'S6',
            ],
            203 => [
                'id_car_mark' => 27,
            'name' => 'BD132J (CoCo)',
            ],
            204 => [
                'id_car_mark' => 27,
            'name' => 'BD326J (Moca)',
            ],
            205 => [
                'id_car_mark' => 28,
                'name' => 'Allante',
            ],
            206 => [
                'id_car_mark' => 28,
                'name' => 'ATS',
            ],
            207 => [
                'id_car_mark' => 28,
                'name' => 'BLS',
            ],
            208 => [
                'id_car_mark' => 28,
                'name' => 'Brougham',
            ],
            209 => [
                'id_car_mark' => 28,
                'name' => 'Catera',
            ],
            210 => [
                'id_car_mark' => 28,
                'name' => 'CTS',
            ],
            211 => [
                'id_car_mark' => 28,
                'name' => 'De Ville',
            ],
            212 => [
                'id_car_mark' => 28,
                'name' => 'DTS',
            ],
            213 => [
                'id_car_mark' => 28,
                'name' => 'Eldorado',
            ],
            214 => [
                'id_car_mark' => 28,
                'name' => 'Escalade',
            ],
            215 => [
                'id_car_mark' => 28,
                'name' => 'Fleetwood',
            ],
            216 => [
                'id_car_mark' => 28,
                'name' => 'LSE',
            ],
            217 => [
                'id_car_mark' => 28,
                'name' => 'Seville',
            ],
            218 => [
                'id_car_mark' => 28,
                'name' => 'Sixty Special',
            ],
            219 => [
                'id_car_mark' => 28,
                'name' => 'SRX',
            ],
            220 => [
                'id_car_mark' => 28,
                'name' => 'STS',
            ],
            221 => [
                'id_car_mark' => 28,
                'name' => 'XLR',
            ],
            222 => [
                'id_car_mark' => 28,
                'name' => 'XTS',
            ],
            223 => [
                'id_car_mark' => 29,
                'name' => 'C12',
            ],
            224 => [
                'id_car_mark' => 30,
                'name' => 'FX4',
            ],
            225 => [
                'id_car_mark' => 31,
                'name' => '21',
            ],
            226 => [
                'id_car_mark' => 31,
                'name' => 'CSR',
            ],
            227 => [
                'id_car_mark' => 31,
                'name' => 'Seven',
            ],
            228 => [
                'id_car_mark' => 32,
                'name' => 'Benni',
            ],
            229 => [
                'id_car_mark' => 32,
                'name' => 'CS35',
            ],
            230 => [
                'id_car_mark' => 32,
                'name' => 'Eado',
            ],
            231 => [
                'id_car_mark' => 32,
                'name' => 'Raeton',
            ],
            232 => [
                'id_car_mark' => 32,
                'name' => 'Z-Shine',
            ],
            233 => [
                'id_car_mark' => 33,
                'name' => 'Flying',
            ],
            234 => [
                'id_car_mark' => 33,
            'name' => 'SUV (CS6)',
            ],
            235 => [
                'id_car_mark' => 34,
            'name' => 'Amulet (A15)',
            ],
            236 => [
                'id_car_mark' => 34,
            'name' => 'Bonus (A13)',
            ],
            237 => [
                'id_car_mark' => 34,
            'name' => 'CrossEastar (B14)',
            ],
            238 => [
                'id_car_mark' => 34,
            'name' => 'Fora (A21)',
            ],
            239 => [
                'id_car_mark' => 34,
            'name' => 'IndiS (S18D)',
            ],
            240 => [
                'id_car_mark' => 34,
            'name' => 'Kimo (A1)',
            ],
            241 => [
                'id_car_mark' => 34,
            'name' => 'Oriental Son (B11)',
            ],
            242 => [
                'id_car_mark' => 34,
            'name' => 'QQ6 (S21)',
            ],
            243 => [
                'id_car_mark' => 34,
            'name' => 'Sweet (QQ)',
            ],
            244 => [
                'id_car_mark' => 34,
            'name' => 'Tiggo (T11)',
            ],
            245 => [
                'id_car_mark' => 34,
                'name' => 'Very',
            ],
            246 => [
                'id_car_mark' => 35,
                'name' => 'Alero',
            ],
            247 => [
                'id_car_mark' => 35,
                'name' => 'Astra',
            ],
            248 => [
                'id_car_mark' => 35,
                'name' => 'Astro',
            ],
            249 => [
                'id_car_mark' => 35,
                'name' => 'Avalanche',
            ],
            250 => [
                'id_car_mark' => 35,
                'name' => 'Aveo',
            ],
            251 => [
                'id_car_mark' => 35,
                'name' => 'Beretta',
            ],
            252 => [
                'id_car_mark' => 35,
                'name' => 'Blazer',
            ],
            253 => [
                'id_car_mark' => 35,
                'name' => 'Blazer K5',
            ],
            254 => [
                'id_car_mark' => 35,
                'name' => 'C-10',
            ],
            255 => [
                'id_car_mark' => 35,
                'name' => 'Camaro',
            ],
            256 => [
                'id_car_mark' => 35,
                'name' => 'Caprice',
            ],
            257 => [
                'id_car_mark' => 35,
                'name' => 'Captiva',
            ],
            258 => [
                'id_car_mark' => 35,
                'name' => 'Cavalier',
            ],
            259 => [
                'id_car_mark' => 35,
                'name' => 'Celebrity',
            ],
            260 => [
                'id_car_mark' => 35,
                'name' => 'Celta',
            ],
            261 => [
                'id_car_mark' => 35,
                'name' => 'Chevette',
            ],
            262 => [
                'id_car_mark' => 35,
                'name' => 'Citation',
            ],
            263 => [
                'id_car_mark' => 35,
                'name' => 'Classic',
            ],
            264 => [
                'id_car_mark' => 35,
                'name' => 'Cobalt',
            ],
            265 => [
                'id_car_mark' => 35,
                'name' => 'Colorado',
            ],
            266 => [
                'id_car_mark' => 35,
                'name' => 'Corsa',
            ],
            267 => [
                'id_car_mark' => 35,
                'name' => 'Corsica',
            ],
            268 => [
                'id_car_mark' => 35,
                'name' => 'Corvette',
            ],
            269 => [
                'id_car_mark' => 35,
            'name' => 'Cruze (HR)',
            ],
            270 => [
                'id_car_mark' => 35,
                'name' => 'Cruze',
            ],
            271 => [
                'id_car_mark' => 35,
                'name' => 'Epica',
            ],
            272 => [
                'id_car_mark' => 35,
                'name' => 'Equinox',
            ],
            273 => [
                'id_car_mark' => 35,
                'name' => 'Evanda',
            ],
            274 => [
                'id_car_mark' => 35,
                'name' => 'Express',
            ],
            275 => [
                'id_car_mark' => 35,
                'name' => 'HHR',
            ],
            276 => [
                'id_car_mark' => 35,
                'name' => 'Impala',
            ],
            277 => [
                'id_car_mark' => 35,
                'name' => 'Kalos',
            ],
            278 => [
                'id_car_mark' => 35,
                'name' => 'Lacetti',
            ],
            279 => [
                'id_car_mark' => 35,
                'name' => 'Lanos',
            ],
            280 => [
                'id_car_mark' => 35,
                'name' => 'Lumina',
            ],
            281 => [
                'id_car_mark' => 35,
                'name' => 'Lumina APV',
            ],
            282 => [
                'id_car_mark' => 35,
                'name' => 'LUV D-MAX',
            ],
            283 => [
                'id_car_mark' => 35,
                'name' => 'Malibu',
            ],
            284 => [
                'id_car_mark' => 35,
                'name' => 'Metro',
            ],
            285 => [
                'id_car_mark' => 35,
                'name' => 'Monte Carlo',
            ],
            286 => [
                'id_car_mark' => 35,
                'name' => 'Monza',
            ],
            287 => [
                'id_car_mark' => 35,
                'name' => 'MW',
            ],
            288 => [
                'id_car_mark' => 35,
                'name' => 'Niva',
            ],
            289 => [
                'id_car_mark' => 35,
                'name' => 'Nubira',
            ],
            290 => [
                'id_car_mark' => 35,
                'name' => 'Omega',
            ],
            291 => [
                'id_car_mark' => 35,
                'name' => 'Orlando',
            ],
            292 => [
                'id_car_mark' => 35,
                'name' => 'Prizm',
            ],
            293 => [
                'id_car_mark' => 35,
                'name' => 'Rezzo',
            ],
            294 => [
                'id_car_mark' => 35,
                'name' => 'S-10 Pickup',
            ],
            295 => [
                'id_car_mark' => 35,
                'name' => 'Sail',
            ],
            296 => [
                'id_car_mark' => 35,
                'name' => 'Sonic',
            ],
            297 => [
                'id_car_mark' => 35,
                'name' => 'Spark',
            ],
            298 => [
                'id_car_mark' => 35,
                'name' => 'SSR',
            ],
            299 => [
                'id_car_mark' => 35,
                'name' => 'Starcraft',
            ],
            300 => [
                'id_car_mark' => 35,
                'name' => 'Suburban',
            ],
            301 => [
                'id_car_mark' => 35,
                'name' => 'Tahoe',
            ],
            302 => [
                'id_car_mark' => 35,
                'name' => 'Tavera',
            ],
            303 => [
                'id_car_mark' => 35,
                'name' => 'Tracker',
            ],
            304 => [
                'id_car_mark' => 35,
                'name' => 'TrailBlazer',
            ],
            305 => [
                'id_car_mark' => 35,
                'name' => 'Trans Sport',
            ],
            306 => [
                'id_car_mark' => 36,
                'name' => '200',
            ],
            307 => [
                'id_car_mark' => 36,
                'name' => '300C',
            ],
            308 => [
                'id_car_mark' => 36,
                'name' => '300M',
            ],
            309 => [
                'id_car_mark' => 36,
                'name' => 'Aspen',
            ],
            310 => [
                'id_car_mark' => 36,
                'name' => 'Cirrus',
            ],
            311 => [
                'id_car_mark' => 36,
                'name' => 'Concorde',
            ],
            312 => [
                'id_car_mark' => 36,
                'name' => 'Crossfire',
            ],
            313 => [
                'id_car_mark' => 36,
                'name' => 'Dynasty',
            ],
            314 => [
                'id_car_mark' => 36,
                'name' => 'Fifth Avenue',
            ],
            315 => [
                'id_car_mark' => 36,
                'name' => 'Imperial',
            ],
            316 => [
                'id_car_mark' => 36,
                'name' => 'Intrepid',
            ],
            317 => [
                'id_car_mark' => 36,
                'name' => 'Le Baron',
            ],
            318 => [
                'id_car_mark' => 36,
                'name' => 'LHS',
            ],
            319 => [
                'id_car_mark' => 36,
                'name' => 'Nassau',
            ],
            320 => [
                'id_car_mark' => 36,
                'name' => 'Neon',
            ],
            321 => [
                'id_car_mark' => 36,
                'name' => 'NEW Yorker',
            ],
            322 => [
                'id_car_mark' => 36,
                'name' => 'Pacifica',
            ],
            323 => [
                'id_car_mark' => 36,
                'name' => 'Prowler',
            ],
            324 => [
                'id_car_mark' => 36,
                'name' => 'PT Cruiser',
            ],
            325 => [
                'id_car_mark' => 36,
                'name' => 'Saratoga',
            ],
            326 => [
                'id_car_mark' => 36,
                'name' => 'Sebring',
            ],
            327 => [
                'id_car_mark' => 36,
                'name' => 'Stratus',
            ],
            328 => [
                'id_car_mark' => 36,
                'name' => 'TC by Maserati',
            ],
            329 => [
                'id_car_mark' => 36,
                'name' => 'Town & Country',
            ],
            330 => [
                'id_car_mark' => 36,
                'name' => 'Viper',
            ],
            331 => [
                'id_car_mark' => 36,
                'name' => 'Vision',
            ],
            332 => [
                'id_car_mark' => 36,
                'name' => 'Voyager',
            ],
            333 => [
                'id_car_mark' => 37,
                'name' => '2 CV',
            ],
            334 => [
                'id_car_mark' => 37,
                'name' => 'AMI',
            ],
            335 => [
                'id_car_mark' => 37,
                'name' => 'Ax',
            ],
            336 => [
                'id_car_mark' => 37,
                'name' => 'Berlingo',
            ],
            337 => [
                'id_car_mark' => 37,
                'name' => 'BX',
            ],
            338 => [
                'id_car_mark' => 37,
                'name' => 'C-Crosser',
            ],
            339 => [
                'id_car_mark' => 37,
                'name' => 'C-Elysee',
            ],
            340 => [
                'id_car_mark' => 37,
                'name' => 'C1',
            ],
            341 => [
                'id_car_mark' => 37,
                'name' => 'C2',
            ],
            342 => [
                'id_car_mark' => 37,
                'name' => 'C3',
            ],
            343 => [
                'id_car_mark' => 37,
                'name' => 'C3 Picasso',
            ],
            344 => [
                'id_car_mark' => 37,
                'name' => 'C4 Aircross',
            ],
            345 => [
                'id_car_mark' => 37,
                'name' => 'C4 Cactus',
            ],
            346 => [
                'id_car_mark' => 37,
                'name' => 'C4',
            ],
            347 => [
                'id_car_mark' => 37,
                'name' => 'C4 Picasso',
            ],
            348 => [
                'id_car_mark' => 37,
                'name' => 'C5',
            ],
            349 => [
                'id_car_mark' => 37,
                'name' => 'C6',
            ],
            350 => [
                'id_car_mark' => 37,
                'name' => 'C8',
            ],
            351 => [
                'id_car_mark' => 37,
                'name' => 'CX',
            ],
            352 => [
                'id_car_mark' => 37,
                'name' => 'DS3',
            ],
            353 => [
                'id_car_mark' => 37,
                'name' => 'DS4',
            ],
            354 => [
                'id_car_mark' => 37,
                'name' => 'DS5',
            ],
            355 => [
                'id_car_mark' => 37,
                'name' => 'Dyane',
            ],
            356 => [
                'id_car_mark' => 37,
                'name' => 'Evasion',
            ],
            357 => [
                'id_car_mark' => 37,
                'name' => 'GS',
            ],
            358 => [
                'id_car_mark' => 37,
                'name' => 'Saxo',
            ],
            359 => [
                'id_car_mark' => 37,
                'name' => 'Visa',
            ],
            360 => [
                'id_car_mark' => 37,
                'name' => 'Xantia',
            ],
            361 => [
                'id_car_mark' => 37,
                'name' => 'XM',
            ],
            362 => [
                'id_car_mark' => 37,
                'name' => 'Xsara',
            ],
            363 => [
                'id_car_mark' => 37,
                'name' => 'Xsara Picasso',
            ],
            364 => [
                'id_car_mark' => 37,
                'name' => 'ZX',
            ],
            365 => [
                'id_car_mark' => 38,
                'name' => 'V16t',
            ],
            366 => [
                'id_car_mark' => 39,
                'name' => 'T Rex',
            ],
            367 => [
                'id_car_mark' => 40,
                'name' => '1300',
            ],
            368 => [
                'id_car_mark' => 40,
                'name' => '1310',
            ],
            369 => [
                'id_car_mark' => 40,
                'name' => '1410',
            ],
            370 => [
                'id_car_mark' => 40,
                'name' => 'Dokker',
            ],
            371 => [
                'id_car_mark' => 40,
                'name' => 'Duster',
            ],
            372 => [
                'id_car_mark' => 40,
                'name' => 'Lodgy',
            ],
            373 => [
                'id_car_mark' => 40,
                'name' => 'Logan',
            ],
            374 => [
                'id_car_mark' => 40,
                'name' => 'Nova',
            ],
            375 => [
                'id_car_mark' => 40,
                'name' => 'Sandero',
            ],
            376 => [
                'id_car_mark' => 40,
                'name' => 'Solenza',
            ],
            377 => [
                'id_car_mark' => 41,
                'name' => 'City Leading',
            ],
            378 => [
                'id_car_mark' => 41,
                'name' => 'Shuttle',
            ],
            379 => [
                'id_car_mark' => 41,
                'name' => 'Smoothing',
            ],
            380 => [
                'id_car_mark' => 42,
                'name' => 'Arcadia',
            ],
            381 => [
                'id_car_mark' => 42,
                'name' => 'Chairman',
            ],
            382 => [
                'id_car_mark' => 42,
                'name' => 'Damas',
            ],
            383 => [
                'id_car_mark' => 42,
                'name' => 'Espero',
            ],
            384 => [
                'id_car_mark' => 42,
                'name' => 'Evanda',
            ],
            385 => [
                'id_car_mark' => 42,
                'name' => 'G2X',
            ],
            386 => [
                'id_car_mark' => 42,
                'name' => 'Gentra',
            ],
            387 => [
                'id_car_mark' => 42,
                'name' => 'Kalos',
            ],
            388 => [
                'id_car_mark' => 42,
                'name' => 'Korando',
            ],
            389 => [
                'id_car_mark' => 42,
                'name' => 'Lacetti',
            ],
            390 => [
                'id_car_mark' => 42,
            'name' => 'Lanos (Sens)',
            ],
            391 => [
                'id_car_mark' => 42,
                'name' => 'LE Mans',
            ],
            392 => [
                'id_car_mark' => 42,
                'name' => 'Leganza',
            ],
            393 => [
                'id_car_mark' => 42,
                'name' => 'Magnus',
            ],
            394 => [
                'id_car_mark' => 42,
                'name' => 'Matiz',
            ],
            395 => [
                'id_car_mark' => 42,
                'name' => 'Musso',
            ],
            396 => [
                'id_car_mark' => 42,
                'name' => 'Nexia',
            ],
            397 => [
                'id_car_mark' => 42,
                'name' => 'Nubira',
            ],
            398 => [
                'id_car_mark' => 42,
                'name' => 'Prince',
            ],
            399 => [
                'id_car_mark' => 42,
                'name' => 'Racer',
            ],
            400 => [
                'id_car_mark' => 42,
                'name' => 'Rezzo',
            ],
            401 => [
                'id_car_mark' => 42,
                'name' => 'Tacuma',
            ],
            402 => [
                'id_car_mark' => 42,
                'name' => 'Tico',
            ],
            403 => [
                'id_car_mark' => 42,
                'name' => 'Tosca',
            ],
            404 => [
                'id_car_mark' => 42,
                'name' => 'Winstorm',
            ],
            405 => [
                'id_car_mark' => 43,
                'name' => '46',
            ],
            406 => [
                'id_car_mark' => 43,
                'name' => '66',
            ],
            407 => [
                'id_car_mark' => 44,
                'name' => 'Altis',
            ],
            408 => [
                'id_car_mark' => 44,
                'name' => 'Applause',
            ],
            409 => [
                'id_car_mark' => 44,
                'name' => 'Atrai',
            ],
            410 => [
                'id_car_mark' => 44,
                'name' => 'Be-go',
            ],
            411 => [
                'id_car_mark' => 44,
                'name' => 'Boon',
            ],
            412 => [
                'id_car_mark' => 44,
                'name' => 'Ceria',
            ],
            413 => [
                'id_car_mark' => 44,
                'name' => 'Charade',
            ],
            414 => [
                'id_car_mark' => 44,
                'name' => 'Charmant',
            ],
            415 => [
                'id_car_mark' => 44,
                'name' => 'Coo',
            ],
            416 => [
                'id_car_mark' => 44,
                'name' => 'Copen',
            ],
            417 => [
                'id_car_mark' => 44,
                'name' => 'Cuore',
            ],
            418 => [
                'id_car_mark' => 44,
                'name' => 'Delta Wagon',
            ],
            419 => [
                'id_car_mark' => 44,
                'name' => 'Esse',
            ],
            420 => [
                'id_car_mark' => 44,
                'name' => 'Feroza',
            ],
            421 => [
                'id_car_mark' => 44,
                'name' => 'Gran Move',
            ],
            422 => [
                'id_car_mark' => 44,
                'name' => 'Leeza',
            ],
            423 => [
                'id_car_mark' => 44,
                'name' => 'Materia',
            ],
            424 => [
                'id_car_mark' => 44,
                'name' => 'MAX',
            ],
            425 => [
                'id_car_mark' => 44,
                'name' => 'Mira Gino',
            ],
            426 => [
                'id_car_mark' => 44,
                'name' => 'Mira',
            ],
            427 => [
                'id_car_mark' => 44,
                'name' => 'Move',
            ],
            428 => [
                'id_car_mark' => 44,
                'name' => 'Naked',
            ],
            429 => [
                'id_car_mark' => 44,
                'name' => 'Opti',
            ],
            430 => [
                'id_car_mark' => 44,
                'name' => 'Pyzar',
            ],
            431 => [
                'id_car_mark' => 44,
                'name' => 'Rocky',
            ],
            432 => [
                'id_car_mark' => 44,
                'name' => 'Sirion',
            ],
            433 => [
                'id_car_mark' => 44,
                'name' => 'Sonica',
            ],
            434 => [
                'id_car_mark' => 44,
                'name' => 'Storia',
            ],
            435 => [
                'id_car_mark' => 44,
                'name' => 'Taft',
            ],
            436 => [
                'id_car_mark' => 44,
                'name' => 'Tanto',
            ],
            437 => [
                'id_car_mark' => 44,
                'name' => 'Terios',
            ],
            438 => [
                'id_car_mark' => 44,
                'name' => 'Trevis',
            ],
            439 => [
                'id_car_mark' => 44,
                'name' => 'Wildcat',
            ],
            440 => [
                'id_car_mark' => 44,
                'name' => 'Xenia',
            ],
            441 => [
                'id_car_mark' => 44,
                'name' => 'YRV',
            ],
            442 => [
                'id_car_mark' => 45,
                'name' => 'DS420',
            ],
            443 => [
                'id_car_mark' => 45,
            'name' => 'Sovereign (XJ6)',
            ],
            444 => [
                'id_car_mark' => 45,
                'name' => 'X300',
            ],
            445 => [
                'id_car_mark' => 45,
                'name' => 'X308',
            ],
            446 => [
                'id_car_mark' => 45,
                'name' => 'X350',
            ],
            447 => [
                'id_car_mark' => 45,
                'name' => 'XJ40',
            ],
            448 => [
                'id_car_mark' => 45,
                'name' => 'XJS',
            ],
            449 => [
                'id_car_mark' => 47,
                'name' => '280ZX',
            ],
            450 => [
                'id_car_mark' => 47,
                'name' => '720',
            ],
            451 => [
                'id_car_mark' => 47,
                'name' => 'Bluebird',
            ],
            452 => [
                'id_car_mark' => 47,
                'name' => 'Cherry',
            ],
            453 => [
                'id_car_mark' => 47,
                'name' => 'GO',
            ],
            454 => [
                'id_car_mark' => 47,
                'name' => 'GO+',
            ],
            455 => [
                'id_car_mark' => 47,
                'name' => 'on-DO',
            ],
            456 => [
                'id_car_mark' => 47,
                'name' => 'Stanza',
            ],
            457 => [
                'id_car_mark' => 47,
                'name' => 'Sunny',
            ],
            458 => [
                'id_car_mark' => 47,
                'name' => 'Violet',
            ],
            459 => [
                'id_car_mark' => 48,
                'name' => 'Bigua',
            ],
            460 => [
                'id_car_mark' => 48,
                'name' => 'Guara',
            ],
            461 => [
                'id_car_mark' => 48,
                'name' => 'Mangusta',
            ],
            462 => [
                'id_car_mark' => 48,
                'name' => 'Pantera',
            ],
            463 => [
                'id_car_mark' => 48,
                'name' => 'Vallelunga',
            ],
            464 => [
                'id_car_mark' => 49,
                'name' => 'DMC-12',
            ],
            465 => [
                'id_car_mark' => 50,
                'name' => 'Antelope',
            ],
            466 => [
                'id_car_mark' => 50,
                'name' => 'Aurora',
            ],
            467 => [
                'id_car_mark' => 50,
                'name' => 'Cowboy',
            ],
            468 => [
                'id_car_mark' => 50,
                'name' => 'Land Crown',
            ],
            469 => [
                'id_car_mark' => 50,
                'name' => 'Plutus',
            ],
            470 => [
                'id_car_mark' => 50,
                'name' => 'Saladin',
            ],
            471 => [
                'id_car_mark' => 50,
                'name' => 'Shuttle',
            ],
            472 => [
                'id_car_mark' => 51,
                'name' => '600',
            ],
            473 => [
                'id_car_mark' => 51,
                'name' => 'Aries',
            ],
            474 => [
                'id_car_mark' => 51,
                'name' => 'Avenger',
            ],
            475 => [
                'id_car_mark' => 51,
                'name' => 'Caliber',
            ],
            476 => [
                'id_car_mark' => 51,
                'name' => 'Caravan',
            ],
            477 => [
                'id_car_mark' => 51,
                'name' => 'Challenger',
            ],
            478 => [
                'id_car_mark' => 51,
                'name' => 'Charger',
            ],
            479 => [
                'id_car_mark' => 51,
                'name' => 'Dakota',
            ],
            480 => [
                'id_car_mark' => 51,
                'name' => 'Dart',
            ],
            481 => [
                'id_car_mark' => 51,
                'name' => 'Daytona',
            ],
            482 => [
                'id_car_mark' => 51,
                'name' => 'Durango',
            ],
            483 => [
                'id_car_mark' => 51,
                'name' => 'Dynasty',
            ],
            484 => [
                'id_car_mark' => 51,
                'name' => 'Intrepid',
            ],
            485 => [
                'id_car_mark' => 51,
                'name' => 'Journey',
            ],
            486 => [
                'id_car_mark' => 51,
                'name' => 'Magnum',
            ],
            487 => [
                'id_car_mark' => 51,
                'name' => 'Monaco',
            ],
            488 => [
                'id_car_mark' => 51,
                'name' => 'Neon',
            ],
            489 => [
                'id_car_mark' => 51,
                'name' => 'Nitro',
            ],
            490 => [
                'id_car_mark' => 51,
                'name' => 'Omni',
            ],
            491 => [
                'id_car_mark' => 51,
                'name' => 'RAM',
            ],
            492 => [
                'id_car_mark' => 51,
                'name' => 'Ramcharger',
            ],
            493 => [
                'id_car_mark' => 51,
                'name' => 'Shadow',
            ],
            494 => [
                'id_car_mark' => 51,
                'name' => 'Spirit',
            ],
            495 => [
                'id_car_mark' => 51,
                'name' => 'Stealth',
            ],
            496 => [
                'id_car_mark' => 51,
                'name' => 'Stratus',
            ],
            497 => [
                'id_car_mark' => 51,
                'name' => 'Viper',
            ],
            498 => [
                'id_car_mark' => 52,
                'name' => 'H30 Cross',
            ],
            499 => [
                'id_car_mark' => 52,
                'name' => 'MPV',
            ],
        ]);
        \DB::table('car_models')->insert([
            0 => [
                'id_car_mark' => 52,
                'name' => 'Oting',
            ],
            1 => [
                'id_car_mark' => 52,
                'name' => 'Rich',
            ],
            2 => [
                'id_car_mark' => 53,
                'name' => 'Assol',
            ],
            3 => [
                'id_car_mark' => 53,
                'name' => 'Kondor',
            ],
            4 => [
                'id_car_mark' => 53,
                'name' => 'Orion',
            ],
            5 => [
                'id_car_mark' => 54,
                'name' => 'D8',
            ],
            6 => [
                'id_car_mark' => 55,
                'name' => 'GD04B',
            ],
            7 => [
                'id_car_mark' => 56,
                'name' => 'Premier',
            ],
            8 => [
                'id_car_mark' => 56,
                'name' => 'Summit',
            ],
            9 => [
                'id_car_mark' => 56,
                'name' => 'Talon',
            ],
            10 => [
                'id_car_mark' => 56,
                'name' => 'Vision',
            ],
            11 => [
                'id_car_mark' => 57,
                'name' => 'SS',
            ],
            12 => [
                'id_car_mark' => 58,
                'name' => 'Estrima Biro',
            ],
            13 => [
                'id_car_mark' => 59,
                'name' => 'Besturn B50',
            ],
            14 => [
                'id_car_mark' => 59,
                'name' => 'Besturn B70',
            ],
            15 => [
                'id_car_mark' => 59,
                'name' => 'City Golf',
            ],
            16 => [
                'id_car_mark' => 59,
                'name' => 'Jinn',
            ],
            17 => [
                'id_car_mark' => 59,
                'name' => 'Oley',
            ],
            18 => [
                'id_car_mark' => 59,
                'name' => 'V2',
            ],
            19 => [
                'id_car_mark' => 59,
                'name' => 'V5',
            ],
            20 => [
                'id_car_mark' => 59,
                'name' => 'Vita',
            ],
            21 => [
                'id_car_mark' => 60,
                'name' => '208/308',
            ],
            22 => [
                'id_car_mark' => 60,
                'name' => '328',
            ],
            23 => [
                'id_car_mark' => 60,
                'name' => '348',
            ],
            24 => [
                'id_car_mark' => 60,
                'name' => '360',
            ],
            25 => [
                'id_car_mark' => 60,
                'name' => '400',
            ],
            26 => [
                'id_car_mark' => 60,
                'name' => '412',
            ],
            27 => [
                'id_car_mark' => 60,
                'name' => '456',
            ],
            28 => [
                'id_car_mark' => 60,
                'name' => '458',
            ],
            29 => [
                'id_car_mark' => 60,
                'name' => '512 BB',
            ],
            30 => [
                'id_car_mark' => 60,
                'name' => '512 M',
            ],
            31 => [
                'id_car_mark' => 60,
                'name' => '512 TR',
            ],
            32 => [
                'id_car_mark' => 60,
                'name' => '550',
            ],
            33 => [
                'id_car_mark' => 60,
                'name' => '575M',
            ],
            34 => [
                'id_car_mark' => 60,
                'name' => '599',
            ],
            35 => [
                'id_car_mark' => 60,
                'name' => '612',
            ],
            36 => [
                'id_car_mark' => 60,
                'name' => 'California',
            ],
            37 => [
                'id_car_mark' => 60,
                'name' => 'Enzo',
            ],
            38 => [
                'id_car_mark' => 60,
                'name' => 'F12berlinetta',
            ],
            39 => [
                'id_car_mark' => 60,
                'name' => 'F355',
            ],
            40 => [
                'id_car_mark' => 60,
                'name' => 'F40',
            ],
            41 => [
                'id_car_mark' => 60,
                'name' => 'F430',
            ],
            42 => [
                'id_car_mark' => 60,
                'name' => 'F50',
            ],
            43 => [
                'id_car_mark' => 60,
                'name' => 'FF',
            ],
            44 => [
                'id_car_mark' => 60,
                'name' => 'LaFerrari',
            ],
            45 => [
                'id_car_mark' => 60,
                'name' => 'Mondial',
            ],
            46 => [
                'id_car_mark' => 60,
                'name' => 'Testarossa',
            ],
            47 => [
                'id_car_mark' => 61,
                'name' => '124',
            ],
            48 => [
                'id_car_mark' => 61,
                'name' => '126',
            ],
            49 => [
                'id_car_mark' => 61,
                'name' => '127',
            ],
            50 => [
                'id_car_mark' => 61,
                'name' => '128',
            ],
            51 => [
                'id_car_mark' => 61,
                'name' => '130',
            ],
            52 => [
                'id_car_mark' => 61,
                'name' => '131',
            ],
            53 => [
                'id_car_mark' => 61,
                'name' => '132',
            ],
            54 => [
                'id_car_mark' => 61,
                'name' => '238',
            ],
            55 => [
                'id_car_mark' => 61,
                'name' => '500',
            ],
            56 => [
                'id_car_mark' => 61,
                'name' => '500L',
            ],
            57 => [
                'id_car_mark' => 61,
                'name' => '600',
            ],
            58 => [
                'id_car_mark' => 61,
                'name' => '900T',
            ],
            59 => [
                'id_car_mark' => 61,
                'name' => 'Albea',
            ],
            60 => [
                'id_car_mark' => 61,
                'name' => 'Argenta',
            ],
            61 => [
                'id_car_mark' => 61,
                'name' => 'Barchetta',
            ],
            62 => [
                'id_car_mark' => 61,
                'name' => 'Brava',
            ],
            63 => [
                'id_car_mark' => 61,
                'name' => 'Bravo',
            ],
            64 => [
                'id_car_mark' => 61,
                'name' => 'Cinquecento',
            ],
            65 => [
                'id_car_mark' => 61,
                'name' => 'Coupe',
            ],
            66 => [
                'id_car_mark' => 61,
                'name' => 'Croma',
            ],
            67 => [
                'id_car_mark' => 61,
                'name' => 'Doblo',
            ],
            68 => [
                'id_car_mark' => 61,
                'name' => 'Duna',
            ],
            69 => [
                'id_car_mark' => 61,
                'name' => 'Fiorino',
            ],
            70 => [
                'id_car_mark' => 61,
                'name' => 'Freemont',
            ],
            71 => [
                'id_car_mark' => 61,
                'name' => 'Idea',
            ],
            72 => [
                'id_car_mark' => 61,
                'name' => 'Linea',
            ],
            73 => [
                'id_car_mark' => 61,
                'name' => 'Marea',
            ],
            74 => [
                'id_car_mark' => 61,
                'name' => 'Multipla',
            ],
            75 => [
                'id_car_mark' => 61,
                'name' => 'Palio',
            ],
            76 => [
                'id_car_mark' => 61,
                'name' => 'Panda',
            ],
            77 => [
                'id_car_mark' => 61,
                'name' => 'Punto',
            ],
            78 => [
                'id_car_mark' => 61,
                'name' => 'Qubo',
            ],
            79 => [
                'id_car_mark' => 61,
                'name' => 'Regata',
            ],
            80 => [
                'id_car_mark' => 61,
                'name' => 'Ritmo',
            ],
            81 => [
                'id_car_mark' => 61,
                'name' => 'Sedici',
            ],
            82 => [
                'id_car_mark' => 61,
                'name' => 'Seicento',
            ],
            83 => [
                'id_car_mark' => 61,
                'name' => 'Siena',
            ],
            84 => [
                'id_car_mark' => 61,
                'name' => 'Stilo',
            ],
            85 => [
                'id_car_mark' => 61,
                'name' => 'Strada',
            ],
            86 => [
                'id_car_mark' => 61,
                'name' => 'Tempra',
            ],
            87 => [
                'id_car_mark' => 61,
                'name' => 'Tipo',
            ],
            88 => [
                'id_car_mark' => 61,
                'name' => 'Ulysse',
            ],
            89 => [
                'id_car_mark' => 61,
                'name' => 'UNO',
            ],
            90 => [
                'id_car_mark' => 61,
                'name' => 'X 1/9',
            ],
            91 => [
                'id_car_mark' => 62,
                'name' => 'Karma',
            ],
            92 => [
                'id_car_mark' => 63,
                'name' => 'Aerostar',
            ],
            93 => [
                'id_car_mark' => 63,
                'name' => 'Aspire',
            ],
            94 => [
                'id_car_mark' => 63,
                'name' => 'B-MAX',
            ],
            95 => [
                'id_car_mark' => 63,
                'name' => 'Bronco',
            ],
            96 => [
                'id_car_mark' => 63,
                'name' => 'C-MAX',
            ],
            97 => [
                'id_car_mark' => 63,
                'name' => 'Capri',
            ],
            98 => [
                'id_car_mark' => 63,
                'name' => 'Consul',
            ],
            99 => [
                'id_car_mark' => 63,
                'name' => 'Contour',
            ],
            100 => [
                'id_car_mark' => 63,
                'name' => 'Cougar',
            ],
            101 => [
                'id_car_mark' => 63,
                'name' => 'Crown Victoria',
            ],
            102 => [
                'id_car_mark' => 63,
                'name' => 'Econoline',
            ],
            103 => [
                'id_car_mark' => 63,
                'name' => 'EcoSport',
            ],
            104 => [
                'id_car_mark' => 63,
                'name' => 'Edge',
            ],
            105 => [
                'id_car_mark' => 63,
                'name' => 'Escape',
            ],
            106 => [
                'id_car_mark' => 63,
            'name' => 'Escort (North America)',
            ],
            107 => [
                'id_car_mark' => 63,
                'name' => 'Escort',
            ],
            108 => [
                'id_car_mark' => 63,
                'name' => 'Everest',
            ],
            109 => [
                'id_car_mark' => 63,
                'name' => 'Excursion',
            ],
            110 => [
                'id_car_mark' => 63,
                'name' => 'Expedition',
            ],
            111 => [
                'id_car_mark' => 63,
                'name' => 'Explorer',
            ],
            112 => [
                'id_car_mark' => 63,
                'name' => 'F-150',
            ],
            113 => [
                'id_car_mark' => 63,
                'name' => 'Fairmont',
            ],
            114 => [
                'id_car_mark' => 63,
                'name' => 'Festiva',
            ],
            115 => [
                'id_car_mark' => 63,
                'name' => 'Fiesta',
            ],
            116 => [
                'id_car_mark' => 63,
                'name' => 'Five Hundred',
            ],
            117 => [
                'id_car_mark' => 63,
                'name' => 'Flex',
            ],
            118 => [
                'id_car_mark' => 63,
                'name' => 'Focus',
            ],
            119 => [
                'id_car_mark' => 63,
                'name' => 'Freestar',
            ],
            120 => [
                'id_car_mark' => 63,
                'name' => 'Freestyle',
            ],
            121 => [
                'id_car_mark' => 63,
            'name' => 'Fusion (North America)',
            ],
            122 => [
                'id_car_mark' => 63,
                'name' => 'Fusion',
            ],
            123 => [
                'id_car_mark' => 63,
                'name' => 'Galaxy',
            ],
            124 => [
                'id_car_mark' => 63,
            'name' => 'Granada (North America)',
            ],
            125 => [
                'id_car_mark' => 63,
                'name' => 'Granada',
            ],
            126 => [
                'id_car_mark' => 63,
                'name' => 'GT',
            ],
            127 => [
                'id_car_mark' => 63,
                'name' => 'Ixion',
            ],
            128 => [
                'id_car_mark' => 63,
                'name' => 'KA',
            ],
            129 => [
                'id_car_mark' => 63,
                'name' => 'Kuga',
            ],
            130 => [
                'id_car_mark' => 63,
                'name' => 'Laser',
            ],
            131 => [
                'id_car_mark' => 63,
                'name' => 'LTD Crown Victoria',
            ],
            132 => [
                'id_car_mark' => 63,
                'name' => 'Maverick',
            ],
            133 => [
                'id_car_mark' => 63,
                'name' => 'Mondeo',
            ],
            134 => [
                'id_car_mark' => 63,
                'name' => 'Mustang',
            ],
            135 => [
                'id_car_mark' => 63,
                'name' => 'Orion',
            ],
            136 => [
                'id_car_mark' => 63,
                'name' => 'Probe',
            ],
            137 => [
                'id_car_mark' => 63,
                'name' => 'Puma',
            ],
            138 => [
                'id_car_mark' => 63,
            'name' => 'Ranger (North America)',
            ],
            139 => [
                'id_car_mark' => 63,
                'name' => 'Ranger',
            ],
            140 => [
                'id_car_mark' => 63,
                'name' => 'S-MAX',
            ],
            141 => [
                'id_car_mark' => 63,
                'name' => 'Scorpio',
            ],
            142 => [
                'id_car_mark' => 63,
                'name' => 'Sierra',
            ],
            143 => [
                'id_car_mark' => 63,
                'name' => 'Taunus',
            ],
            144 => [
                'id_car_mark' => 63,
                'name' => 'Taurus',
            ],
            145 => [
                'id_car_mark' => 63,
                'name' => 'Taurus X',
            ],
            146 => [
                'id_car_mark' => 63,
                'name' => 'Tempo',
            ],
            147 => [
                'id_car_mark' => 63,
                'name' => 'Thunderbird',
            ],
            148 => [
                'id_car_mark' => 63,
                'name' => 'Tourneo Connect',
            ],
            149 => [
                'id_car_mark' => 63,
                'name' => 'Windstar',
            ],
            150 => [
                'id_car_mark' => 64,
                'name' => 'Midi',
            ],
            151 => [
                'id_car_mark' => 64,
                'name' => 'Tunland',
            ],
            152 => [
                'id_car_mark' => 65,
                'name' => '125p',
            ],
            153 => [
                'id_car_mark' => 65,
                'name' => '126p',
            ],
            154 => [
                'id_car_mark' => 65,
                'name' => '127p',
            ],
            155 => [
                'id_car_mark' => 65,
                'name' => '132p',
            ],
            156 => [
                'id_car_mark' => 65,
                'name' => 'Polonez',
            ],
            157 => [
                'id_car_mark' => 66,
            'name' => '6500 (Land King)',
            ],
            158 => [
                'id_car_mark' => 67,
                'name' => 'Beauty Leopard',
            ],
            159 => [
                'id_car_mark' => 67,
            'name' => 'CK (Otaka)',
            ],
            160 => [
                'id_car_mark' => 67,
                'name' => 'Emgrand EC7',
            ],
            161 => [
                'id_car_mark' => 67,
                'name' => 'Emgrand EC8',
            ],
            162 => [
                'id_car_mark' => 67,
                'name' => 'Emgrand X7',
            ],
            163 => [
                'id_car_mark' => 67,
            'name' => 'FC (Vision)',
            ],
            164 => [
                'id_car_mark' => 67,
                'name' => 'Haoqing',
            ],
            165 => [
                'id_car_mark' => 67,
            'name' => 'LC (Panda)',
            ],
            166 => [
                'id_car_mark' => 67,
            'name' => 'LC (Panda) Cross',
            ],
            167 => [
                'id_car_mark' => 67,
                'name' => 'MK Cross',
            ],
            168 => [
                'id_car_mark' => 67,
                'name' => 'MK',
            ],
            169 => [
                'id_car_mark' => 67,
                'name' => 'MR',
            ],
            170 => [
                'id_car_mark' => 68,
                'name' => 'Metro',
            ],
            171 => [
                'id_car_mark' => 68,
                'name' => 'Prizm',
            ],
            172 => [
                'id_car_mark' => 68,
                'name' => 'Spectrum',
            ],
            173 => [
                'id_car_mark' => 68,
                'name' => 'Storm',
            ],
            174 => [
                'id_car_mark' => 68,
                'name' => 'Tracker',
            ],
            175 => [
                'id_car_mark' => 69,
                'name' => 'Acadia',
            ],
            176 => [
                'id_car_mark' => 69,
                'name' => 'Canyon',
            ],
            177 => [
                'id_car_mark' => 69,
                'name' => 'Envoy',
            ],
            178 => [
                'id_car_mark' => 69,
                'name' => 'Jimmy',
            ],
            179 => [
                'id_car_mark' => 69,
                'name' => 'Safari',
            ],
            180 => [
                'id_car_mark' => 69,
                'name' => 'Savana',
            ],
            181 => [
                'id_car_mark' => 69,
                'name' => 'Sierra',
            ],
            182 => [
                'id_car_mark' => 69,
                'name' => 'Sonoma',
            ],
            183 => [
                'id_car_mark' => 69,
                'name' => 'Suburban',
            ],
            184 => [
                'id_car_mark' => 69,
                'name' => 'Syclone',
            ],
            185 => [
                'id_car_mark' => 69,
                'name' => 'Terrain',
            ],
            186 => [
                'id_car_mark' => 69,
                'name' => 'Typhoon',
            ],
            187 => [
                'id_car_mark' => 69,
                'name' => 'Vandura',
            ],
            188 => [
                'id_car_mark' => 69,
                'name' => 'Yukon',
            ],
            189 => [
                'id_car_mark' => 70,
                'name' => 'Troy',
            ],
            190 => [
                'id_car_mark' => 71,
                'name' => 'Coolbear',
            ],
            191 => [
                'id_car_mark' => 71,
            'name' => 'Cowry (V80)',
            ],
            192 => [
                'id_car_mark' => 71,
                'name' => 'Deer',
            ],
            193 => [
                'id_car_mark' => 71,
                'name' => 'Florid',
            ],
            194 => [
                'id_car_mark' => 71,
                'name' => 'Hover',
            ],
            195 => [
                'id_car_mark' => 71,
            'name' => 'Hover M1 (Peri 4x4)',
            ],
            196 => [
                'id_car_mark' => 71,
                'name' => 'Hover M2',
            ],
            197 => [
                'id_car_mark' => 71,
                'name' => 'Hover M4',
            ],
            198 => [
                'id_car_mark' => 71,
                'name' => 'Pegasus',
            ],
            199 => [
                'id_car_mark' => 71,
                'name' => 'Peri',
            ],
            200 => [
                'id_car_mark' => 71,
                'name' => 'Safe',
            ],
            201 => [
                'id_car_mark' => 71,
                'name' => 'Sailor',
            ],
            202 => [
                'id_car_mark' => 71,
                'name' => 'Sing RUV',
            ],
            203 => [
                'id_car_mark' => 71,
                'name' => 'Socool',
            ],
            204 => [
                'id_car_mark' => 71,
            'name' => 'Voleex C10 (Phenom)',
            ],
            205 => [
                'id_car_mark' => 71,
                'name' => 'Wingle',
            ],
            206 => [
                'id_car_mark' => 72,
                'name' => 'Brio',
            ],
            207 => [
                'id_car_mark' => 72,
                'name' => 'Princip',
            ],
            208 => [
                'id_car_mark' => 72,
                'name' => 'Saibao',
            ],
            209 => [
                'id_car_mark' => 72,
                'name' => 'Sigma',
            ],
            210 => [
                'id_car_mark' => 72,
                'name' => 'Simbo',
            ],
            211 => [
                'id_car_mark' => 73,
                'name' => '3',
            ],
            212 => [
                'id_car_mark' => 73,
                'name' => '7',
            ],
            213 => [
                'id_car_mark' => 73,
                'name' => 'M3',
            ],
            214 => [
                'id_car_mark' => 74,
                'name' => 'Ambassador',
            ],
            215 => [
                'id_car_mark' => 74,
                'name' => 'Contessa',
            ],
            216 => [
                'id_car_mark' => 75,
                'name' => 'Apollo',
            ],
            217 => [
                'id_car_mark' => 75,
                'name' => 'Astra',
            ],
            218 => [
                'id_car_mark' => 75,
                'name' => 'Barina',
            ],
            219 => [
                'id_car_mark' => 75,
                'name' => 'Calais',
            ],
            220 => [
                'id_car_mark' => 75,
                'name' => 'Caprice',
            ],
            221 => [
                'id_car_mark' => 75,
                'name' => 'Commodore',
            ],
            222 => [
                'id_car_mark' => 75,
                'name' => 'Cruze',
            ],
            223 => [
                'id_car_mark' => 75,
                'name' => 'Frontera',
            ],
            224 => [
                'id_car_mark' => 75,
                'name' => 'Jackaroo',
            ],
            225 => [
                'id_car_mark' => 75,
                'name' => 'Monaro',
            ],
            226 => [
                'id_car_mark' => 75,
                'name' => 'Rodeo',
            ],
            227 => [
                'id_car_mark' => 75,
                'name' => 'UTE',
            ],
            228 => [
                'id_car_mark' => 75,
                'name' => 'Vectra',
            ],
            229 => [
                'id_car_mark' => 75,
                'name' => 'Zafira',
            ],
            230 => [
                'id_car_mark' => 76,
                'name' => 'Accord',
            ],
            231 => [
                'id_car_mark' => 76,
                'name' => 'Airwave',
            ],
            232 => [
                'id_car_mark' => 76,
                'name' => 'Ascot',
            ],
            233 => [
                'id_car_mark' => 76,
                'name' => 'Avancier',
            ],
            234 => [
                'id_car_mark' => 76,
                'name' => 'Beat',
            ],
            235 => [
                'id_car_mark' => 76,
                'name' => 'Capa',
            ],
            236 => [
                'id_car_mark' => 76,
                'name' => 'City',
            ],
            237 => [
                'id_car_mark' => 76,
                'name' => 'Civic Ferio',
            ],
            238 => [
                'id_car_mark' => 76,
                'name' => 'Civic',
            ],
            239 => [
                'id_car_mark' => 76,
                'name' => 'Concerto',
            ],
            240 => [
                'id_car_mark' => 76,
                'name' => 'CR-V',
            ],
            241 => [
                'id_car_mark' => 76,
                'name' => 'CR-X',
            ],
            242 => [
                'id_car_mark' => 76,
                'name' => 'CR-Z',
            ],
            243 => [
                'id_car_mark' => 76,
                'name' => 'Crossroad',
            ],
            244 => [
                'id_car_mark' => 76,
                'name' => 'Crosstour',
            ],
            245 => [
                'id_car_mark' => 76,
                'name' => 'Domani',
            ],
            246 => [
                'id_car_mark' => 76,
                'name' => 'Edix',
            ],
            247 => [
                'id_car_mark' => 76,
                'name' => 'Element',
            ],
            248 => [
                'id_car_mark' => 76,
                'name' => 'Elysion',
            ],
            249 => [
                'id_car_mark' => 76,
                'name' => 'FCX Clarity',
            ],
            250 => [
                'id_car_mark' => 76,
                'name' => 'Fit Aria',
            ],
            251 => [
                'id_car_mark' => 76,
                'name' => 'Fit',
            ],
            252 => [
                'id_car_mark' => 76,
                'name' => 'FR-V',
            ],
            253 => [
                'id_car_mark' => 76,
                'name' => 'Freed',
            ],
            254 => [
                'id_car_mark' => 76,
                'name' => 'HR-V',
            ],
            255 => [
                'id_car_mark' => 76,
                'name' => 'Insight',
            ],
            256 => [
                'id_car_mark' => 76,
                'name' => 'Inspire',
            ],
            257 => [
                'id_car_mark' => 76,
                'name' => 'Integra',
            ],
            258 => [
                'id_car_mark' => 76,
                'name' => 'Integra SJ',
            ],
            259 => [
                'id_car_mark' => 76,
                'name' => 'Jazz',
            ],
            260 => [
                'id_car_mark' => 76,
                'name' => 'Legend',
            ],
            261 => [
                'id_car_mark' => 76,
                'name' => 'Life',
            ],
            262 => [
                'id_car_mark' => 76,
                'name' => 'Logo',
            ],
            263 => [
                'id_car_mark' => 76,
                'name' => 'MDX',
            ],
            264 => [
                'id_car_mark' => 76,
                'name' => 'Mobilio',
            ],
            265 => [
                'id_car_mark' => 76,
                'name' => 'NSX',
            ],
            266 => [
                'id_car_mark' => 76,
            'name' => 'Odyssey (North America)',
            ],
            267 => [
                'id_car_mark' => 76,
                'name' => 'Odyssey',
            ],
            268 => [
                'id_car_mark' => 76,
                'name' => 'Orthia',
            ],
            269 => [
                'id_car_mark' => 76,
                'name' => 'Partner',
            ],
            270 => [
                'id_car_mark' => 76,
                'name' => 'Passport',
            ],
            271 => [
                'id_car_mark' => 76,
                'name' => 'Pilot',
            ],
            272 => [
                'id_car_mark' => 76,
                'name' => 'Prelude',
            ],
            273 => [
                'id_car_mark' => 76,
                'name' => 'Quint',
            ],
            274 => [
                'id_car_mark' => 76,
                'name' => 'Rafaga',
            ],
            275 => [
                'id_car_mark' => 76,
                'name' => 'Ridgeline',
            ],
            276 => [
                'id_car_mark' => 76,
                'name' => 'S-MX',
            ],
            277 => [
                'id_car_mark' => 76,
                'name' => 'S2000',
            ],
            278 => [
                'id_car_mark' => 76,
                'name' => 'Saber',
            ],
            279 => [
                'id_car_mark' => 76,
                'name' => 'Shuttle',
            ],
            280 => [
                'id_car_mark' => 76,
                'name' => 'Stepwgn',
            ],
            281 => [
                'id_car_mark' => 76,
                'name' => 'Stream',
            ],
            282 => [
                'id_car_mark' => 76,
                'name' => 'That\'S',
            ],
            283 => [
                'id_car_mark' => 76,
                'name' => 'Today',
            ],
            284 => [
                'id_car_mark' => 76,
                'name' => 'Torneo',
            ],
            285 => [
                'id_car_mark' => 76,
                'name' => 'Vamos',
            ],
            286 => [
                'id_car_mark' => 76,
                'name' => 'Vigor',
            ],
            287 => [
                'id_car_mark' => 76,
                'name' => 'Z',
            ],
            288 => [
                'id_car_mark' => 76,
                'name' => 'Zest',
            ],
            289 => [
                'id_car_mark' => 77,
                'name' => 'Antelope',
            ],
            290 => [
                'id_car_mark' => 77,
                'name' => 'Landscape',
            ],
            291 => [
                'id_car_mark' => 77,
                'name' => 'Plutus',
            ],
            292 => [
                'id_car_mark' => 78,
                'name' => 'H1',
            ],
            293 => [
                'id_car_mark' => 78,
                'name' => 'H2',
            ],
            294 => [
                'id_car_mark' => 78,
                'name' => 'H3',
            ],
            295 => [
                'id_car_mark' => 79,
                'name' => 'Accent',
            ],
            296 => [
                'id_car_mark' => 79,
                'name' => 'Atos',
            ],
            297 => [
                'id_car_mark' => 79,
                'name' => 'Avante',
            ],
            298 => [
                'id_car_mark' => 79,
                'name' => 'Centennial',
            ],
            299 => [
                'id_car_mark' => 79,
                'name' => 'Coupe',
            ],
            300 => [
                'id_car_mark' => 79,
                'name' => 'Dynasty',
            ],
            301 => [
                'id_car_mark' => 79,
                'name' => 'Elantra',
            ],
            302 => [
                'id_car_mark' => 79,
                'name' => 'Equus',
            ],
            303 => [
                'id_car_mark' => 79,
                'name' => 'Excel',
            ],
            304 => [
                'id_car_mark' => 79,
                'name' => 'Galloper',
            ],
            305 => [
                'id_car_mark' => 79,
                'name' => 'Genesis',
            ],
            306 => [
                'id_car_mark' => 79,
                'name' => 'Genesis Coupe',
            ],
            307 => [
                'id_car_mark' => 79,
                'name' => 'Getz',
            ],
            308 => [
                'id_car_mark' => 79,
                'name' => 'Grandeur',
            ],
            309 => [
                'id_car_mark' => 79,
                'name' => 'i10',
            ],
            310 => [
                'id_car_mark' => 79,
                'name' => 'i20',
            ],
            311 => [
                'id_car_mark' => 79,
                'name' => 'i30',
            ],
            312 => [
                'id_car_mark' => 79,
                'name' => 'i40',
            ],
            313 => [
                'id_car_mark' => 79,
                'name' => 'ix20',
            ],
            314 => [
                'id_car_mark' => 79,
                'name' => 'ix35',
            ],
            315 => [
                'id_car_mark' => 79,
                'name' => 'ix55',
            ],
            316 => [
                'id_car_mark' => 79,
                'name' => 'Lantra',
            ],
            317 => [
                'id_car_mark' => 79,
                'name' => 'Lavita',
            ],
            318 => [
                'id_car_mark' => 79,
                'name' => 'Marcia',
            ],
            319 => [
                'id_car_mark' => 79,
                'name' => 'Matrix',
            ],
            320 => [
                'id_car_mark' => 79,
                'name' => 'Maxcruz',
            ],
            321 => [
                'id_car_mark' => 79,
                'name' => 'Pony',
            ],
            322 => [
                'id_car_mark' => 79,
                'name' => 'Santa Fe',
            ],
            323 => [
                'id_car_mark' => 79,
                'name' => 'Santamo',
            ],
            324 => [
                'id_car_mark' => 79,
                'name' => 'Scoupe',
            ],
            325 => [
                'id_car_mark' => 79,
                'name' => 'Solaris',
            ],
            326 => [
                'id_car_mark' => 79,
                'name' => 'Sonata',
            ],
            327 => [
                'id_car_mark' => 79,
            'name' => 'Starex (H-1)',
            ],
            328 => [
                'id_car_mark' => 79,
                'name' => 'Stellar',
            ],
            329 => [
                'id_car_mark' => 79,
                'name' => 'Terracan',
            ],
            330 => [
                'id_car_mark' => 79,
                'name' => 'Tiburon',
            ],
            331 => [
                'id_car_mark' => 79,
                'name' => 'Trajet',
            ],
            332 => [
                'id_car_mark' => 79,
                'name' => 'Tucson',
            ],
            333 => [
                'id_car_mark' => 79,
                'name' => 'Tuscani',
            ],
            334 => [
                'id_car_mark' => 79,
                'name' => 'Veloster',
            ],
            335 => [
                'id_car_mark' => 79,
                'name' => 'Veracruz',
            ],
            336 => [
                'id_car_mark' => 79,
                'name' => 'Verna',
            ],
            337 => [
                'id_car_mark' => 79,
                'name' => 'XG',
            ],
            338 => [
                'id_car_mark' => 80,
                'name' => 'EX',
            ],
            339 => [
                'id_car_mark' => 80,
                'name' => 'FX',
            ],
            340 => [
                'id_car_mark' => 80,
                'name' => 'G',
            ],
            341 => [
                'id_car_mark' => 80,
                'name' => 'I',
            ],
            342 => [
                'id_car_mark' => 80,
                'name' => 'J',
            ],
            343 => [
                'id_car_mark' => 80,
                'name' => 'JX',
            ],
            344 => [
                'id_car_mark' => 80,
                'name' => 'M',
            ],
            345 => [
                'id_car_mark' => 80,
                'name' => 'Q',
            ],
            346 => [
                'id_car_mark' => 80,
                'name' => 'Q50',
            ],
            347 => [
                'id_car_mark' => 80,
                'name' => 'Q60',
            ],
            348 => [
                'id_car_mark' => 80,
                'name' => 'QX',
            ],
            349 => [
                'id_car_mark' => 80,
                'name' => 'QX50',
            ],
            350 => [
                'id_car_mark' => 80,
                'name' => 'QX60',
            ],
            351 => [
                'id_car_mark' => 80,
                'name' => 'QX70',
            ],
            352 => [
                'id_car_mark' => 80,
                'name' => 'QX80',
            ],
            353 => [
                'id_car_mark' => 81,
                'name' => 'Elba',
            ],
            354 => [
                'id_car_mark' => 81,
                'name' => 'Mille',
            ],
            355 => [
                'id_car_mark' => 81,
                'name' => 'Mini',
            ],
            356 => [
                'id_car_mark' => 82,
                'name' => 'S1',
            ],
            357 => [
                'id_car_mark' => 83,
                'name' => 'Paykan',
            ],
            358 => [
                'id_car_mark' => 83,
                'name' => 'Samand',
            ],
            359 => [
                'id_car_mark' => 83,
                'name' => 'Soren',
            ],
            360 => [
                'id_car_mark' => 84,
                'name' => 'Commendatore 112i',
            ],
            361 => [
                'id_car_mark' => 84,
                'name' => 'Imperator 108i',
            ],
            362 => [
                'id_car_mark' => 84,
                'name' => 'Spyder',
            ],
            363 => [
                'id_car_mark' => 85,
                'name' => 'Amigo',
            ],
            364 => [
                'id_car_mark' => 85,
                'name' => 'Ascender',
            ],
            365 => [
                'id_car_mark' => 85,
                'name' => 'Aska',
            ],
            366 => [
                'id_car_mark' => 85,
                'name' => 'Axiom',
            ],
            367 => [
                'id_car_mark' => 85,
                'name' => 'Bighorn',
            ],
            368 => [
                'id_car_mark' => 85,
                'name' => 'D-Max',
            ],
            369 => [
                'id_car_mark' => 85,
                'name' => 'Gemini',
            ],
            370 => [
                'id_car_mark' => 85,
                'name' => 'Impulse',
            ],
            371 => [
                'id_car_mark' => 85,
                'name' => 'KB',
            ],
            372 => [
                'id_car_mark' => 85,
                'name' => 'MU',
            ],
            373 => [
                'id_car_mark' => 85,
                'name' => 'MU-7',
            ],
            374 => [
                'id_car_mark' => 85,
                'name' => 'Piazza',
            ],
            375 => [
                'id_car_mark' => 85,
                'name' => 'Rodeo',
            ],
            376 => [
                'id_car_mark' => 85,
                'name' => 'Stylus',
            ],
            377 => [
                'id_car_mark' => 85,
            'name' => 'TF (Pickup)',
            ],
            378 => [
                'id_car_mark' => 85,
                'name' => 'Trooper',
            ],
            379 => [
                'id_car_mark' => 85,
                'name' => 'VehiCross',
            ],
            380 => [
                'id_car_mark' => 85,
                'name' => 'Wizard',
            ],
            381 => [
                'id_car_mark' => 86,
                'name' => 'Massif',
            ],
            382 => [
                'id_car_mark' => 87,
            'name' => 'J2 (Yueyue)',
            ],
            383 => [
                'id_car_mark' => 87,
            'name' => 'J3 (Tongyue,Tojoy)',
            ],
            384 => [
                'id_car_mark' => 87,
            'name' => 'J5 (Heyue)',
            ],
            385 => [
                'id_car_mark' => 87,
            'name' => 'J6 (Heyue RS)',
            ],
            386 => [
                'id_car_mark' => 87,
            'name' => 'J7 (Binyue)',
            ],
            387 => [
                'id_car_mark' => 87,
            'name' => 'M1 (Refine)',
            ],
            388 => [
                'id_car_mark' => 87,
            'name' => 'S1 (Rein)',
            ],
            389 => [
                'id_car_mark' => 87,
            'name' => 'S5 (Eagle)',
            ],
            390 => [
                'id_car_mark' => 88,
                'name' => 'E-type',
            ],
            391 => [
                'id_car_mark' => 88,
                'name' => 'F-Type',
            ],
            392 => [
                'id_car_mark' => 88,
                'name' => 'S-Type',
            ],
            393 => [
                'id_car_mark' => 88,
                'name' => 'X-Type',
            ],
            394 => [
                'id_car_mark' => 88,
                'name' => 'XF',
            ],
            395 => [
                'id_car_mark' => 88,
                'name' => 'XJ',
            ],
            396 => [
                'id_car_mark' => 88,
                'name' => 'XJ220',
            ],
            397 => [
                'id_car_mark' => 88,
                'name' => 'XJS',
            ],
            398 => [
                'id_car_mark' => 88,
                'name' => 'XK',
            ],
            399 => [
                'id_car_mark' => 89,
                'name' => 'Cherokee',
            ],
            400 => [
                'id_car_mark' => 89,
                'name' => 'CJ',
            ],
            401 => [
                'id_car_mark' => 89,
                'name' => 'Commander',
            ],
            402 => [
                'id_car_mark' => 89,
                'name' => 'Compass',
            ],
            403 => [
                'id_car_mark' => 89,
                'name' => 'Grand Cherokee',
            ],
            404 => [
                'id_car_mark' => 89,
                'name' => 'Grand Wagoneer',
            ],
            405 => [
                'id_car_mark' => 89,
            'name' => 'Liberty (North America)',
            ],
            406 => [
                'id_car_mark' => 89,
            'name' => 'Liberty (Patriot)',
            ],
            407 => [
                'id_car_mark' => 89,
                'name' => 'Wrangler',
            ],
            408 => [
                'id_car_mark' => 90,
                'name' => 'S-V8',
            ],
            409 => [
                'id_car_mark' => 91,
                'name' => 'Baodian',
            ],
            410 => [
                'id_car_mark' => 92,
                'name' => 'Avella',
            ],
            411 => [
                'id_car_mark' => 92,
                'name' => 'Cadenza',
            ],
            412 => [
                'id_car_mark' => 92,
                'name' => 'Capital',
            ],
            413 => [
                'id_car_mark' => 92,
                'name' => 'Carens',
            ],
            414 => [
                'id_car_mark' => 92,
                'name' => 'Carnival',
            ],
            415 => [
                'id_car_mark' => 92,
                'name' => 'Cee\'d',
            ],
            416 => [
                'id_car_mark' => 92,
                'name' => 'Cerato',
            ],
            417 => [
                'id_car_mark' => 92,
                'name' => 'Clarus',
            ],
            418 => [
                'id_car_mark' => 92,
                'name' => 'Concord',
            ],
            419 => [
                'id_car_mark' => 92,
                'name' => 'Elan',
            ],
            420 => [
                'id_car_mark' => 92,
                'name' => 'Enterprise',
            ],
            421 => [
                'id_car_mark' => 92,
                'name' => 'Joice',
            ],
            422 => [
                'id_car_mark' => 92,
                'name' => 'Magentis',
            ],
            423 => [
                'id_car_mark' => 92,
            'name' => 'Mohave (Borrego)',
            ],
            424 => [
                'id_car_mark' => 92,
                'name' => 'Opirus',
            ],
            425 => [
                'id_car_mark' => 92,
                'name' => 'Optima',
            ],
            426 => [
                'id_car_mark' => 92,
                'name' => 'Picanto',
            ],
            427 => [
                'id_car_mark' => 92,
                'name' => 'Potentia',
            ],
            428 => [
                'id_car_mark' => 92,
                'name' => 'Pride',
            ],
            429 => [
                'id_car_mark' => 92,
                'name' => 'Quoris',
            ],
            430 => [
                'id_car_mark' => 92,
                'name' => 'Ray',
            ],
            431 => [
                'id_car_mark' => 92,
                'name' => 'Retona',
            ],
            432 => [
                'id_car_mark' => 92,
                'name' => 'Rio',
            ],
            433 => [
                'id_car_mark' => 92,
                'name' => 'Sedona',
            ],
            434 => [
                'id_car_mark' => 92,
                'name' => 'Sephia',
            ],
            435 => [
                'id_car_mark' => 92,
                'name' => 'Shuma',
            ],
            436 => [
                'id_car_mark' => 92,
                'name' => 'Sorento',
            ],
            437 => [
                'id_car_mark' => 92,
                'name' => 'Soul',
            ],
            438 => [
                'id_car_mark' => 92,
                'name' => 'Spectra',
            ],
            439 => [
                'id_car_mark' => 92,
                'name' => 'Sportage',
            ],
            440 => [
                'id_car_mark' => 92,
                'name' => 'Venga',
            ],
            441 => [
                'id_car_mark' => 92,
                'name' => 'Visto',
            ],
            442 => [
                'id_car_mark' => 92,
                'name' => 'X-Trek',
            ],
            443 => [
                'id_car_mark' => 93,
                'name' => 'Agera',
            ],
            444 => [
                'id_car_mark' => 93,
                'name' => 'CC8S',
            ],
            445 => [
                'id_car_mark' => 93,
                'name' => 'CCR',
            ],
            446 => [
                'id_car_mark' => 93,
                'name' => 'CCX',
            ],
            447 => [
                'id_car_mark' => 93,
                'name' => 'One:1',
            ],
            448 => [
                'id_car_mark' => 94,
                'name' => 'X-Bow',
            ],
            449 => [
                'id_car_mark' => 95,
                'name' => 'Aventador',
            ],
            450 => [
                'id_car_mark' => 95,
                'name' => 'Countach',
            ],
            451 => [
                'id_car_mark' => 95,
                'name' => 'Diablo',
            ],
            452 => [
                'id_car_mark' => 95,
                'name' => 'Espada',
            ],
            453 => [
                'id_car_mark' => 95,
                'name' => 'Gallardo',
            ],
            454 => [
                'id_car_mark' => 95,
                'name' => 'Huracán',
            ],
            455 => [
                'id_car_mark' => 95,
                'name' => 'Jalpa',
            ],
            456 => [
                'id_car_mark' => 95,
                'name' => 'Jarama',
            ],
            457 => [
                'id_car_mark' => 95,
                'name' => 'LM001',
            ],
            458 => [
                'id_car_mark' => 95,
                'name' => 'LM002',
            ],
            459 => [
                'id_car_mark' => 95,
                'name' => 'Murcielago',
            ],
            460 => [
                'id_car_mark' => 95,
                'name' => 'Reventon',
            ],
            461 => [
                'id_car_mark' => 95,
                'name' => 'Urraco',
            ],
            462 => [
                'id_car_mark' => 95,
                'name' => 'Veneno',
            ],
            463 => [
                'id_car_mark' => 96,
                'name' => 'A 112',
            ],
            464 => [
                'id_car_mark' => 96,
                'name' => 'Beta',
            ],
            465 => [
                'id_car_mark' => 96,
                'name' => 'Dedra',
            ],
            466 => [
                'id_car_mark' => 96,
                'name' => 'Delta',
            ],
            467 => [
                'id_car_mark' => 96,
                'name' => 'Fulvia',
            ],
            468 => [
                'id_car_mark' => 96,
                'name' => 'Gamma',
            ],
            469 => [
                'id_car_mark' => 96,
                'name' => 'Hyena',
            ],
            470 => [
                'id_car_mark' => 96,
                'name' => 'Kappa',
            ],
            471 => [
                'id_car_mark' => 96,
                'name' => 'Lybra',
            ],
            472 => [
                'id_car_mark' => 96,
                'name' => 'Monte Carlo',
            ],
            473 => [
                'id_car_mark' => 96,
                'name' => 'Musa',
            ],
            474 => [
                'id_car_mark' => 96,
                'name' => 'Phedra',
            ],
            475 => [
                'id_car_mark' => 96,
                'name' => 'Prisma',
            ],
            476 => [
                'id_car_mark' => 96,
                'name' => 'Thema',
            ],
            477 => [
                'id_car_mark' => 96,
                'name' => 'Thesis',
            ],
            478 => [
                'id_car_mark' => 96,
                'name' => 'Trevi',
            ],
            479 => [
                'id_car_mark' => 96,
                'name' => 'Y10',
            ],
            480 => [
                'id_car_mark' => 96,
                'name' => 'Ypsilon',
            ],
            481 => [
                'id_car_mark' => 96,
                'name' => 'Zeta',
            ],
            482 => [
                'id_car_mark' => 97,
                'name' => 'Defender',
            ],
            483 => [
                'id_car_mark' => 97,
                'name' => 'Discovery',
            ],
            484 => [
                'id_car_mark' => 97,
                'name' => 'Freelander',
            ],
            485 => [
                'id_car_mark' => 97,
                'name' => 'Range Rover Evoque',
            ],
            486 => [
                'id_car_mark' => 97,
                'name' => 'Range Rover',
            ],
            487 => [
                'id_car_mark' => 97,
                'name' => 'Range Rover Sport',
            ],
            488 => [
                'id_car_mark' => 97,
                'name' => 'Series I',
            ],
            489 => [
                'id_car_mark' => 97,
                'name' => 'Series II',
            ],
            490 => [
                'id_car_mark' => 97,
                'name' => 'Series III',
            ],
            491 => [
                'id_car_mark' => 98,
            'name' => 'Fashion (CV9)',
            ],
            492 => [
                'id_car_mark' => 98,
                'name' => 'Forward',
            ],
            493 => [
                'id_car_mark' => 98,
                'name' => 'X5',
            ],
            494 => [
                'id_car_mark' => 98,
                'name' => 'X6',
            ],
            495 => [
                'id_car_mark' => 99,
                'name' => 'CT',
            ],
            496 => [
                'id_car_mark' => 99,
                'name' => 'ES',
            ],
            497 => [
                'id_car_mark' => 99,
                'name' => 'GS',
            ],
            498 => [
                'id_car_mark' => 99,
                'name' => 'GX',
            ],
            499 => [
                'id_car_mark' => 99,
                'name' => 'HS',
            ],
        ]);
        \DB::table('car_models')->insert([
            0 => [
                'id_car_mark' => 99,
                'name' => 'IS',
            ],
            1 => [
                'id_car_mark' => 99,
                'name' => 'LFA',
            ],
            2 => [
                'id_car_mark' => 99,
                'name' => 'LS',
            ],
            3 => [
                'id_car_mark' => 99,
                'name' => 'LX',
            ],
            4 => [
                'id_car_mark' => 99,
                'name' => 'RC',
            ],
            5 => [
                'id_car_mark' => 99,
                'name' => 'RX',
            ],
            6 => [
                'id_car_mark' => 99,
                'name' => 'SC',
            ],
            7 => [
                'id_car_mark' => 100,
                'name' => 'Leopard',
            ],
            8 => [
                'id_car_mark' => 101,
            'name' => 'Breez (520)',
            ],
            9 => [
                'id_car_mark' => 101,
            'name' => 'Cebrium (720)',
            ],
            10 => [
                'id_car_mark' => 101,
                'name' => 'X60',
            ],
            11 => [
                'id_car_mark' => 102,
                'name' => 'Aviator',
            ],
            12 => [
                'id_car_mark' => 102,
                'name' => 'Continental',
            ],
            13 => [
                'id_car_mark' => 102,
                'name' => 'LS',
            ],
            14 => [
                'id_car_mark' => 102,
                'name' => 'Mark LT',
            ],
            15 => [
                'id_car_mark' => 102,
                'name' => 'Mark VII',
            ],
            16 => [
                'id_car_mark' => 102,
                'name' => 'Mark VIII',
            ],
            17 => [
                'id_car_mark' => 102,
                'name' => 'MKC',
            ],
            18 => [
                'id_car_mark' => 102,
                'name' => 'MKS',
            ],
            19 => [
                'id_car_mark' => 102,
                'name' => 'MKT',
            ],
            20 => [
                'id_car_mark' => 102,
                'name' => 'MKX',
            ],
            21 => [
                'id_car_mark' => 102,
                'name' => 'MKZ',
            ],
            22 => [
                'id_car_mark' => 102,
                'name' => 'Navigator',
            ],
            23 => [
                'id_car_mark' => 102,
                'name' => 'Town Car',
            ],
            24 => [
                'id_car_mark' => 103,
                'name' => '340R',
            ],
            25 => [
                'id_car_mark' => 103,
                'name' => 'Eclat',
            ],
            26 => [
                'id_car_mark' => 103,
                'name' => 'Elan',
            ],
            27 => [
                'id_car_mark' => 103,
                'name' => 'Elise',
            ],
            28 => [
                'id_car_mark' => 103,
                'name' => 'Elite',
            ],
            29 => [
                'id_car_mark' => 103,
                'name' => 'Esprit',
            ],
            30 => [
                'id_car_mark' => 103,
                'name' => 'Europa',
            ],
            31 => [
                'id_car_mark' => 103,
                'name' => 'Europa S',
            ],
            32 => [
                'id_car_mark' => 103,
                'name' => 'Evora',
            ],
            33 => [
                'id_car_mark' => 103,
                'name' => 'Excel',
            ],
            34 => [
                'id_car_mark' => 103,
                'name' => 'Exige',
            ],
            35 => [
                'id_car_mark' => 104,
                'name' => 'TX',
            ],
            36 => [
                'id_car_mark' => 105,
                'name' => 'Luxgen5',
            ],
            37 => [
                'id_car_mark' => 105,
                'name' => 'Luxgen7 MPV',
            ],
            38 => [
                'id_car_mark' => 105,
                'name' => 'Luxgen7 SUV',
            ],
            39 => [
                'id_car_mark' => 105,
                'name' => 'U6 Turbo',
            ],
            40 => [
                'id_car_mark' => 105,
                'name' => 'U7 Turbo',
            ],
            41 => [
                'id_car_mark' => 106,
                'name' => 'Armada',
            ],
            42 => [
                'id_car_mark' => 106,
                'name' => 'Bolero',
            ],
            43 => [
                'id_car_mark' => 106,
                'name' => 'CJ-3',
            ],
            44 => [
                'id_car_mark' => 106,
                'name' => 'CL',
            ],
            45 => [
                'id_car_mark' => 106,
                'name' => 'Commander',
            ],
            46 => [
                'id_car_mark' => 106,
                'name' => 'Marshal',
            ],
            47 => [
                'id_car_mark' => 106,
                'name' => 'MM',
            ],
            48 => [
                'id_car_mark' => 106,
                'name' => 'NC 640 DP',
            ],
            49 => [
                'id_car_mark' => 106,
                'name' => 'Scorpio',
            ],
            50 => [
                'id_car_mark' => 106,
                'name' => 'Verito',
            ],
            51 => [
                'id_car_mark' => 106,
                'name' => 'Voyager',
            ],
            52 => [
                'id_car_mark' => 106,
                'name' => 'Xylo',
            ],
            53 => [
                'id_car_mark' => 107,
                'name' => 'GTS',
            ],
            54 => [
                'id_car_mark' => 107,
                'name' => 'LM 400',
            ],
            55 => [
                'id_car_mark' => 107,
                'name' => 'LM 500',
            ],
            56 => [
                'id_car_mark' => 107,
                'name' => 'Mantis',
            ],
            57 => [
                'id_car_mark' => 107,
                'name' => 'Marcasite',
            ],
            58 => [
                'id_car_mark' => 108,
                'name' => '5EXi',
            ],
            59 => [
                'id_car_mark' => 108,
                'name' => 'Sportster',
            ],
            60 => [
                'id_car_mark' => 109,
                'name' => 'B1',
            ],
            61 => [
                'id_car_mark' => 109,
                'name' => 'B2',
            ],
            62 => [
                'id_car_mark' => 110,
                'name' => '1000',
            ],
            63 => [
                'id_car_mark' => 110,
                'name' => '800',
            ],
            64 => [
                'id_car_mark' => 110,
                'name' => 'Alto',
            ],
            65 => [
                'id_car_mark' => 110,
                'name' => 'Baleno',
            ],
            66 => [
                'id_car_mark' => 110,
                'name' => 'Esteem',
            ],
            67 => [
                'id_car_mark' => 110,
                'name' => 'Gypsy',
            ],
            68 => [
                'id_car_mark' => 110,
                'name' => 'Omni',
            ],
            69 => [
                'id_car_mark' => 110,
                'name' => 'Versa',
            ],
            70 => [
                'id_car_mark' => 110,
                'name' => 'Wagon R',
            ],
            71 => [
                'id_car_mark' => 110,
                'name' => 'Zen',
            ],
            72 => [
                'id_car_mark' => 111,
                'name' => '228',
            ],
            73 => [
                'id_car_mark' => 111,
                'name' => '3200 GT',
            ],
            74 => [
                'id_car_mark' => 111,
                'name' => '420',
            ],
            75 => [
                'id_car_mark' => 111,
                'name' => '4200 GT',
            ],
            76 => [
                'id_car_mark' => 111,
                'name' => 'Barchetta Stradale',
            ],
            77 => [
                'id_car_mark' => 111,
                'name' => 'Biturbo',
            ],
            78 => [
                'id_car_mark' => 111,
                'name' => 'Bora',
            ],
            79 => [
                'id_car_mark' => 111,
                'name' => 'Chubasco',
            ],
            80 => [
                'id_car_mark' => 111,
                'name' => 'Ghibli',
            ],
            81 => [
                'id_car_mark' => 111,
                'name' => 'GranTurismo',
            ],
            82 => [
                'id_car_mark' => 111,
                'name' => 'Indy',
            ],
            83 => [
                'id_car_mark' => 111,
                'name' => 'Karif',
            ],
            84 => [
                'id_car_mark' => 111,
                'name' => 'Khamsin',
            ],
            85 => [
                'id_car_mark' => 111,
                'name' => 'Kyalami',
            ],
            86 => [
                'id_car_mark' => 111,
                'name' => 'MC12',
            ],
            87 => [
                'id_car_mark' => 111,
                'name' => 'Merak',
            ],
            88 => [
                'id_car_mark' => 111,
                'name' => 'Mexico',
            ],
            89 => [
                'id_car_mark' => 111,
                'name' => 'Quattroporte',
            ],
            90 => [
                'id_car_mark' => 111,
                'name' => 'Royale',
            ],
            91 => [
                'id_car_mark' => 111,
                'name' => 'Shamal',
            ],
            92 => [
                'id_car_mark' => 112,
                'name' => '57',
            ],
            93 => [
                'id_car_mark' => 112,
                'name' => '62',
            ],
            94 => [
                'id_car_mark' => 113,
                'name' => '1000',
            ],
            95 => [
                'id_car_mark' => 113,
                'name' => '121',
            ],
            96 => [
                'id_car_mark' => 113,
                'name' => '1300',
            ],
            97 => [
                'id_car_mark' => 113,
                'name' => '2',
            ],
            98 => [
                'id_car_mark' => 113,
                'name' => '3',
            ],
            99 => [
                'id_car_mark' => 113,
                'name' => '323',
            ],
            100 => [
                'id_car_mark' => 113,
                'name' => '5',
            ],
            101 => [
                'id_car_mark' => 113,
                'name' => '6',
            ],
            102 => [
                'id_car_mark' => 113,
                'name' => '616',
            ],
            103 => [
                'id_car_mark' => 113,
                'name' => '626',
            ],
            104 => [
                'id_car_mark' => 113,
                'name' => '818',
            ],
            105 => [
                'id_car_mark' => 113,
                'name' => '929',
            ],
            106 => [
                'id_car_mark' => 113,
                'name' => 'Atenza',
            ],
            107 => [
                'id_car_mark' => 113,
                'name' => 'Axela',
            ],
            108 => [
                'id_car_mark' => 113,
                'name' => 'AZ-1',
            ],
            109 => [
                'id_car_mark' => 113,
                'name' => 'AZ-Offroad',
            ],
            110 => [
                'id_car_mark' => 113,
                'name' => 'AZ-Wagon',
            ],
            111 => [
                'id_car_mark' => 113,
                'name' => 'B-series',
            ],
            112 => [
                'id_car_mark' => 113,
                'name' => 'Biante',
            ],
            113 => [
                'id_car_mark' => 113,
                'name' => 'Bongo Friendee',
            ],
            114 => [
                'id_car_mark' => 113,
                'name' => 'Bongo',
            ],
            115 => [
                'id_car_mark' => 113,
                'name' => 'BT-50',
            ],
            116 => [
                'id_car_mark' => 113,
                'name' => 'Capella',
            ],
            117 => [
                'id_car_mark' => 113,
                'name' => 'Carol',
            ],
            118 => [
                'id_car_mark' => 113,
                'name' => 'Cronos',
            ],
            119 => [
                'id_car_mark' => 113,
                'name' => 'CX-5',
            ],
            120 => [
                'id_car_mark' => 113,
                'name' => 'CX-7',
            ],
            121 => [
                'id_car_mark' => 113,
                'name' => 'CX-9',
            ],
            122 => [
                'id_car_mark' => 113,
                'name' => 'Demio',
            ],
            123 => [
                'id_car_mark' => 113,
                'name' => 'Efini MS-6',
            ],
            124 => [
                'id_car_mark' => 113,
                'name' => 'Efini MS-8',
            ],
            125 => [
                'id_car_mark' => 113,
                'name' => 'Efini MS-9',
            ],
            126 => [
                'id_car_mark' => 113,
                'name' => 'Eunos 300',
            ],
            127 => [
                'id_car_mark' => 113,
                'name' => 'Eunos 500',
            ],
            128 => [
                'id_car_mark' => 113,
                'name' => 'Eunos 800',
            ],
            129 => [
                'id_car_mark' => 113,
                'name' => 'Eunos Cosmo',
            ],
            130 => [
                'id_car_mark' => 113,
                'name' => 'Familia',
            ],
            131 => [
                'id_car_mark' => 113,
                'name' => 'Lantis',
            ],
            132 => [
                'id_car_mark' => 113,
                'name' => 'Laputa',
            ],
            133 => [
                'id_car_mark' => 113,
                'name' => 'Luce',
            ],
            134 => [
                'id_car_mark' => 113,
                'name' => 'Millenia',
            ],
            135 => [
                'id_car_mark' => 113,
                'name' => 'MPV',
            ],
            136 => [
                'id_car_mark' => 113,
                'name' => 'MX-3',
            ],
            137 => [
                'id_car_mark' => 113,
                'name' => 'MX-5',
            ],
            138 => [
                'id_car_mark' => 113,
                'name' => 'MX-6',
            ],
            139 => [
                'id_car_mark' => 113,
                'name' => 'Navajo',
            ],
            140 => [
                'id_car_mark' => 113,
                'name' => 'Persona',
            ],
            141 => [
                'id_car_mark' => 113,
                'name' => 'Premacy',
            ],
            142 => [
                'id_car_mark' => 113,
                'name' => 'Proceed Levante',
            ],
            143 => [
                'id_car_mark' => 113,
                'name' => 'Proceed Marvie',
            ],
            144 => [
                'id_car_mark' => 113,
                'name' => 'Protege',
            ],
            145 => [
                'id_car_mark' => 113,
                'name' => 'Revue',
            ],
            146 => [
                'id_car_mark' => 113,
                'name' => 'Roadster',
            ],
            147 => [
                'id_car_mark' => 113,
                'name' => 'RX-7',
            ],
            148 => [
                'id_car_mark' => 113,
                'name' => 'RX-8',
            ],
            149 => [
                'id_car_mark' => 113,
                'name' => 'Scrum',
            ],
            150 => [
                'id_car_mark' => 113,
                'name' => 'Sentia',
            ],
            151 => [
                'id_car_mark' => 113,
                'name' => 'Spiano',
            ],
            152 => [
                'id_car_mark' => 113,
                'name' => 'Tribute',
            ],
            153 => [
                'id_car_mark' => 113,
                'name' => 'Verisa',
            ],
            154 => [
                'id_car_mark' => 114,
                'name' => 'F1',
            ],
            155 => [
                'id_car_mark' => 114,
                'name' => 'MP4-12C',
            ],
            156 => [
                'id_car_mark' => 114,
                'name' => 'P1',
            ],
            157 => [
                'id_car_mark' => 115,
                'name' => 'Club',
            ],
            158 => [
                'id_car_mark' => 115,
                'name' => 'Monte Carlo',
            ],
            159 => [
                'id_car_mark' => 115,
                'name' => 'Track',
            ],
            160 => [
                'id_car_mark' => 116,
            'name' => '190 (W201)',
            ],
            161 => [
                'id_car_mark' => 116,
                'name' => 'A-klasse',
            ],
            162 => [
                'id_car_mark' => 116,
                'name' => 'B-klasse',
            ],
            163 => [
                'id_car_mark' => 116,
                'name' => 'C-klasse',
            ],
            164 => [
                'id_car_mark' => 116,
                'name' => 'Citan',
            ],
            165 => [
                'id_car_mark' => 116,
                'name' => 'CL-klasse',
            ],
            166 => [
                'id_car_mark' => 116,
                'name' => 'CLA-klasse',
            ],
            167 => [
                'id_car_mark' => 116,
                'name' => 'CLC-klasse',
            ],
            168 => [
                'id_car_mark' => 116,
                'name' => 'CLK-klasse',
            ],
            169 => [
                'id_car_mark' => 116,
                'name' => 'CLS-klasse',
            ],
            170 => [
                'id_car_mark' => 116,
                'name' => 'E-klasse',
            ],
            171 => [
                'id_car_mark' => 116,
                'name' => 'G-klasse',
            ],
            172 => [
                'id_car_mark' => 116,
                'name' => 'GL-klasse',
            ],
            173 => [
                'id_car_mark' => 116,
                'name' => 'GLA-klasse',
            ],
            174 => [
                'id_car_mark' => 116,
                'name' => 'GLK-klasse',
            ],
            175 => [
                'id_car_mark' => 116,
                'name' => 'M-klasse',
            ],
            176 => [
                'id_car_mark' => 116,
                'name' => 'R-klasse',
            ],
            177 => [
                'id_car_mark' => 116,
                'name' => 'S-klasse',
            ],
            178 => [
                'id_car_mark' => 116,
                'name' => 'SL-klasse',
            ],
            179 => [
                'id_car_mark' => 116,
                'name' => 'SLK-klasse',
            ],
            180 => [
                'id_car_mark' => 116,
                'name' => 'SLR McLaren',
            ],
            181 => [
                'id_car_mark' => 116,
                'name' => 'SLS AMG',
            ],
            182 => [
                'id_car_mark' => 116,
                'name' => 'Vaneo',
            ],
            183 => [
                'id_car_mark' => 116,
                'name' => 'Viano',
            ],
            184 => [
                'id_car_mark' => 116,
                'name' => 'W114',
            ],
            185 => [
                'id_car_mark' => 116,
                'name' => 'W115',
            ],
            186 => [
                'id_car_mark' => 116,
                'name' => 'W123',
            ],
            187 => [
                'id_car_mark' => 116,
                'name' => 'W124',
            ],
            188 => [
                'id_car_mark' => 117,
                'name' => 'Capri',
            ],
            189 => [
                'id_car_mark' => 117,
                'name' => 'Cougar',
            ],
            190 => [
                'id_car_mark' => 117,
                'name' => 'Grand Marquis',
            ],
            191 => [
                'id_car_mark' => 117,
                'name' => 'Marauder',
            ],
            192 => [
                'id_car_mark' => 117,
                'name' => 'Mariner',
            ],
            193 => [
                'id_car_mark' => 117,
                'name' => 'Marquis',
            ],
            194 => [
                'id_car_mark' => 117,
                'name' => 'Milan',
            ],
            195 => [
                'id_car_mark' => 117,
                'name' => 'Montego',
            ],
            196 => [
                'id_car_mark' => 117,
                'name' => 'Monterey',
            ],
            197 => [
                'id_car_mark' => 117,
                'name' => 'Mountaineer',
            ],
            198 => [
                'id_car_mark' => 117,
                'name' => 'Mystique',
            ],
            199 => [
                'id_car_mark' => 117,
                'name' => 'Sable',
            ],
            200 => [
                'id_car_mark' => 117,
                'name' => 'Topaz',
            ],
            201 => [
                'id_car_mark' => 117,
                'name' => 'Tracer',
            ],
            202 => [
                'id_car_mark' => 117,
                'name' => 'Villager',
            ],
            203 => [
                'id_car_mark' => 118,
                'name' => 'Metrocab I',
            ],
            204 => [
                'id_car_mark' => 118,
            'name' => 'Metrocab II (TTT)',
            ],
            205 => [
                'id_car_mark' => 119,
                'name' => '3',
            ],
            206 => [
                'id_car_mark' => 119,
                'name' => '350',
            ],
            207 => [
                'id_car_mark' => 119,
                'name' => '5',
            ],
            208 => [
                'id_car_mark' => 119,
                'name' => '6',
            ],
            209 => [
                'id_car_mark' => 119,
                'name' => 'F',
            ],
            210 => [
                'id_car_mark' => 119,
                'name' => 'Maestro',
            ],
            211 => [
                'id_car_mark' => 119,
                'name' => 'Metro',
            ],
            212 => [
                'id_car_mark' => 119,
                'name' => 'MGB',
            ],
            213 => [
                'id_car_mark' => 119,
                'name' => 'Midget',
            ],
            214 => [
                'id_car_mark' => 119,
                'name' => 'Montego',
            ],
            215 => [
                'id_car_mark' => 119,
                'name' => 'RV8',
            ],
            216 => [
                'id_car_mark' => 119,
                'name' => 'TF',
            ],
            217 => [
                'id_car_mark' => 119,
                'name' => 'Xpower SV',
            ],
            218 => [
                'id_car_mark' => 119,
                'name' => 'ZR',
            ],
            219 => [
                'id_car_mark' => 119,
                'name' => 'ZS',
            ],
            220 => [
                'id_car_mark' => 119,
                'name' => 'ZT',
            ],
            221 => [
                'id_car_mark' => 120,
                'name' => 'F8C',
            ],
            222 => [
                'id_car_mark' => 120,
                'name' => 'M.Go',
            ],
            223 => [
                'id_car_mark' => 120,
                'name' => 'M8',
            ],
            224 => [
                'id_car_mark' => 120,
                'name' => 'MC',
            ],
            225 => [
                'id_car_mark' => 120,
                'name' => 'Virgo',
            ],
            226 => [
                'id_car_mark' => 121,
                'name' => 'TF 1800',
            ],
            227 => [
                'id_car_mark' => 122,
                'name' => 'Cabrio',
            ],
            228 => [
                'id_car_mark' => 122,
                'name' => 'Clubman',
            ],
            229 => [
                'id_car_mark' => 122,
                'name' => 'Countryman',
            ],
            230 => [
                'id_car_mark' => 122,
                'name' => 'Coupe',
            ],
            231 => [
                'id_car_mark' => 122,
                'name' => 'Hatch',
            ],
            232 => [
                'id_car_mark' => 122,
                'name' => 'Paceman',
            ],
            233 => [
                'id_car_mark' => 122,
                'name' => 'Roadster',
            ],
            234 => [
                'id_car_mark' => 123,
                'name' => '3000 GT',
            ],
            235 => [
                'id_car_mark' => 123,
                'name' => 'Airtrek',
            ],
            236 => [
                'id_car_mark' => 123,
                'name' => 'Aspire',
            ],
            237 => [
                'id_car_mark' => 123,
                'name' => 'ASX',
            ],
            238 => [
                'id_car_mark' => 123,
                'name' => 'Carisma',
            ],
            239 => [
                'id_car_mark' => 123,
                'name' => 'Celeste',
            ],
            240 => [
                'id_car_mark' => 123,
                'name' => 'Challenger',
            ],
            241 => [
                'id_car_mark' => 123,
                'name' => 'Chariot',
            ],
            242 => [
                'id_car_mark' => 123,
                'name' => 'Colt',
            ],
            243 => [
                'id_car_mark' => 123,
                'name' => 'Cordia',
            ],
            244 => [
                'id_car_mark' => 123,
                'name' => 'Debonair',
            ],
            245 => [
                'id_car_mark' => 123,
                'name' => 'Delica',
            ],
            246 => [
                'id_car_mark' => 123,
                'name' => 'Diamante',
            ],
            247 => [
                'id_car_mark' => 123,
                'name' => 'Dingo',
            ],
            248 => [
                'id_car_mark' => 123,
                'name' => 'Dion',
            ],
            249 => [
                'id_car_mark' => 123,
                'name' => 'Eclipse',
            ],
            250 => [
                'id_car_mark' => 123,
                'name' => 'eK',
            ],
            251 => [
                'id_car_mark' => 123,
                'name' => 'Emeraude',
            ],
            252 => [
                'id_car_mark' => 123,
                'name' => 'Endeavor',
            ],
            253 => [
                'id_car_mark' => 123,
                'name' => 'Eterna',
            ],
            254 => [
                'id_car_mark' => 123,
                'name' => 'FTO',
            ],
            255 => [
                'id_car_mark' => 123,
                'name' => 'Galant',
            ],
            256 => [
                'id_car_mark' => 123,
                'name' => 'Grandis',
            ],
            257 => [
                'id_car_mark' => 123,
                'name' => 'GTO',
            ],
            258 => [
                'id_car_mark' => 123,
                'name' => 'i',
            ],
            259 => [
                'id_car_mark' => 123,
                'name' => 'i-MiEV',
            ],
            260 => [
                'id_car_mark' => 123,
                'name' => 'L200',
            ],
            261 => [
                'id_car_mark' => 123,
                'name' => 'Lancer Cargo',
            ],
            262 => [
                'id_car_mark' => 123,
                'name' => 'Lancer Evolution',
            ],
            263 => [
                'id_car_mark' => 123,
                'name' => 'Lancer',
            ],
            264 => [
                'id_car_mark' => 123,
                'name' => 'Legnum',
            ],
            265 => [
                'id_car_mark' => 123,
                'name' => 'Libero',
            ],
            266 => [
                'id_car_mark' => 123,
                'name' => 'Minica',
            ],
            267 => [
                'id_car_mark' => 123,
                'name' => 'Mirage',
            ],
            268 => [
                'id_car_mark' => 123,
                'name' => 'Montero',
            ],
            269 => [
                'id_car_mark' => 123,
                'name' => 'Montero Sport',
            ],
            270 => [
                'id_car_mark' => 123,
                'name' => 'Outlander',
            ],
            271 => [
                'id_car_mark' => 123,
                'name' => 'Pajero',
            ],
            272 => [
                'id_car_mark' => 123,
                'name' => 'Pajero iO',
            ],
            273 => [
                'id_car_mark' => 123,
                'name' => 'Pajero Junior',
            ],
            274 => [
                'id_car_mark' => 123,
                'name' => 'Pajero Mini',
            ],
            275 => [
                'id_car_mark' => 123,
                'name' => 'Pajero Pinin',
            ],
            276 => [
                'id_car_mark' => 123,
                'name' => 'Pajero Sport',
            ],
            277 => [
                'id_car_mark' => 123,
                'name' => 'Pistachio',
            ],
            278 => [
                'id_car_mark' => 123,
                'name' => 'Proudia',
            ],
            279 => [
                'id_car_mark' => 123,
                'name' => 'Raider',
            ],
            280 => [
                'id_car_mark' => 123,
                'name' => 'RVR',
            ],
            281 => [
                'id_car_mark' => 123,
                'name' => 'Sapporo',
            ],
            282 => [
                'id_car_mark' => 123,
                'name' => 'Sigma',
            ],
            283 => [
                'id_car_mark' => 123,
                'name' => 'Space Gear',
            ],
            284 => [
                'id_car_mark' => 123,
                'name' => 'Space Runner',
            ],
            285 => [
                'id_car_mark' => 123,
                'name' => 'Space Star',
            ],
            286 => [
                'id_car_mark' => 123,
                'name' => 'Space Wagon',
            ],
            287 => [
                'id_car_mark' => 123,
                'name' => 'Starion',
            ],
            288 => [
                'id_car_mark' => 123,
                'name' => 'Toppo',
            ],
            289 => [
                'id_car_mark' => 123,
                'name' => 'Town Box',
            ],
            290 => [
                'id_car_mark' => 123,
                'name' => 'Tredia',
            ],
            291 => [
                'id_car_mark' => 124,
                'name' => 'Galue 204',
            ],
            292 => [
                'id_car_mark' => 124,
                'name' => 'Galue',
            ],
            293 => [
                'id_car_mark' => 124,
                'name' => 'Himiko',
            ],
            294 => [
                'id_car_mark' => 124,
                'name' => 'Le-Seyde',
            ],
            295 => [
                'id_car_mark' => 124,
                'name' => 'Like',
            ],
            296 => [
                'id_car_mark' => 124,
                'name' => 'Nouera',
            ],
            297 => [
                'id_car_mark' => 124,
                'name' => 'Orochi',
            ],
            298 => [
                'id_car_mark' => 124,
                'name' => 'Ray',
            ],
            299 => [
                'id_car_mark' => 124,
                'name' => 'Ryoga',
            ],
            300 => [
                'id_car_mark' => 124,
                'name' => 'Viewt',
            ],
            301 => [
                'id_car_mark' => 124,
                'name' => 'Yuga',
            ],
            302 => [
                'id_car_mark' => 124,
                'name' => 'Zero 1',
            ],
            303 => [
                'id_car_mark' => 125,
                'name' => '3 Wheeler',
            ],
            304 => [
                'id_car_mark' => 125,
                'name' => '4 Seater',
            ],
            305 => [
                'id_car_mark' => 125,
                'name' => '4/4',
            ],
            306 => [
                'id_car_mark' => 125,
                'name' => 'Aero 8',
            ],
            307 => [
                'id_car_mark' => 125,
                'name' => 'Aero Coupe',
            ],
            308 => [
                'id_car_mark' => 125,
                'name' => 'Aero SuperSports',
            ],
            309 => [
                'id_car_mark' => 125,
                'name' => 'AeroMax',
            ],
            310 => [
                'id_car_mark' => 125,
                'name' => 'Plus 4',
            ],
            311 => [
                'id_car_mark' => 125,
                'name' => 'Plus 8',
            ],
            312 => [
                'id_car_mark' => 125,
                'name' => 'Roadster',
            ],
            313 => [
                'id_car_mark' => 126,
                'name' => 'Marina',
            ],
            314 => [
                'id_car_mark' => 127,
                'name' => '100NX',
            ],
            315 => [
                'id_car_mark' => 127,
                'name' => '180SX',
            ],
            316 => [
                'id_car_mark' => 127,
                'name' => '200SX',
            ],
            317 => [
                'id_car_mark' => 127,
                'name' => '240SX',
            ],
            318 => [
                'id_car_mark' => 127,
                'name' => '280ZX',
            ],
            319 => [
                'id_car_mark' => 127,
                'name' => '300ZX',
            ],
            320 => [
                'id_car_mark' => 127,
                'name' => '350Z',
            ],
            321 => [
                'id_car_mark' => 127,
                'name' => '370Z',
            ],
            322 => [
                'id_car_mark' => 127,
                'name' => 'AD',
            ],
            323 => [
                'id_car_mark' => 127,
                'name' => 'Almera Classic',
            ],
            324 => [
                'id_car_mark' => 127,
                'name' => 'Almera',
            ],
            325 => [
                'id_car_mark' => 127,
                'name' => 'Almera Tino',
            ],
            326 => [
                'id_car_mark' => 127,
                'name' => 'Altima',
            ],
            327 => [
                'id_car_mark' => 127,
                'name' => 'Armada',
            ],
            328 => [
                'id_car_mark' => 127,
                'name' => 'Avenir',
            ],
            329 => [
                'id_car_mark' => 127,
                'name' => 'Bassara',
            ],
            330 => [
                'id_car_mark' => 127,
                'name' => 'BE-1',
            ],
            331 => [
                'id_car_mark' => 127,
                'name' => 'Bluebird Sylphy',
            ],
            332 => [
                'id_car_mark' => 127,
                'name' => 'Bluebird',
            ],
            333 => [
                'id_car_mark' => 127,
                'name' => 'Cedric',
            ],
            334 => [
                'id_car_mark' => 127,
                'name' => 'Cefiro',
            ],
            335 => [
                'id_car_mark' => 127,
                'name' => 'Cherry',
            ],
            336 => [
                'id_car_mark' => 127,
                'name' => 'Cima',
            ],
            337 => [
                'id_car_mark' => 127,
                'name' => 'Clipper',
            ],
            338 => [
                'id_car_mark' => 127,
                'name' => 'Crew',
            ],
            339 => [
                'id_car_mark' => 127,
                'name' => 'Cube',
            ],
            340 => [
                'id_car_mark' => 127,
                'name' => 'Datsun',
            ],
            341 => [
                'id_car_mark' => 127,
                'name' => 'Dualis',
            ],
            342 => [
                'id_car_mark' => 127,
                'name' => 'Elgrand',
            ],
            343 => [
                'id_car_mark' => 127,
                'name' => 'Expert',
            ],
            344 => [
                'id_car_mark' => 127,
                'name' => 'Fairlady Z',
            ],
            345 => [
                'id_car_mark' => 127,
                'name' => 'Figaro',
            ],
            346 => [
                'id_car_mark' => 127,
                'name' => 'Fuga',
            ],
            347 => [
                'id_car_mark' => 127,
                'name' => 'Gloria',
            ],
            348 => [
                'id_car_mark' => 127,
                'name' => 'GT-R',
            ],
            349 => [
                'id_car_mark' => 127,
                'name' => 'Juke',
            ],
            350 => [
                'id_car_mark' => 127,
                'name' => 'Lafesta',
            ],
            351 => [
                'id_car_mark' => 127,
                'name' => 'Langley',
            ],
            352 => [
                'id_car_mark' => 127,
                'name' => 'Largo',
            ],
            353 => [
                'id_car_mark' => 127,
                'name' => 'Laurel',
            ],
            354 => [
                'id_car_mark' => 127,
                'name' => 'Leaf',
            ],
            355 => [
                'id_car_mark' => 127,
                'name' => 'Leopard',
            ],
            356 => [
                'id_car_mark' => 127,
                'name' => 'Liberty',
            ],
            357 => [
                'id_car_mark' => 127,
                'name' => 'Lucino',
            ],
            358 => [
                'id_car_mark' => 127,
                'name' => 'March',
            ],
            359 => [
                'id_car_mark' => 127,
                'name' => 'Maxima',
            ],
            360 => [
                'id_car_mark' => 127,
                'name' => 'Micra',
            ],
            361 => [
                'id_car_mark' => 127,
                'name' => 'Mistral',
            ],
            362 => [
                'id_car_mark' => 127,
                'name' => 'Moco',
            ],
            363 => [
                'id_car_mark' => 127,
                'name' => 'Murano',
            ],
            364 => [
                'id_car_mark' => 127,
            'name' => 'Navara (Frontier)',
            ],
            365 => [
                'id_car_mark' => 127,
                'name' => 'Note',
            ],
            366 => [
                'id_car_mark' => 127,
                'name' => 'NP 300',
            ],
            367 => [
                'id_car_mark' => 127,
                'name' => 'NV200',
            ],
            368 => [
                'id_car_mark' => 127,
                'name' => 'NX Coupe',
            ],
            369 => [
                'id_car_mark' => 127,
            'name' => 'Otti (Dayz)',
            ],
            370 => [
                'id_car_mark' => 127,
                'name' => 'Pao',
            ],
            371 => [
                'id_car_mark' => 127,
                'name' => 'Pathfinder',
            ],
            372 => [
                'id_car_mark' => 127,
                'name' => 'Patrol',
            ],
            373 => [
                'id_car_mark' => 127,
                'name' => 'Pino',
            ],
            374 => [
                'id_car_mark' => 128,
                'name' => 'M12 GTO',
            ],
            375 => [
                'id_car_mark' => 128,
                'name' => 'M600',
            ],
            376 => [
                'id_car_mark' => 129,
                'name' => 'Achieva',
            ],
            377 => [
                'id_car_mark' => 129,
                'name' => 'Alero',
            ],
            378 => [
                'id_car_mark' => 129,
                'name' => 'Aurora',
            ],
            379 => [
                'id_car_mark' => 129,
                'name' => 'Bravada',
            ],
            380 => [
                'id_car_mark' => 129,
                'name' => 'Cutlass',
            ],
            381 => [
                'id_car_mark' => 129,
                'name' => 'Cutlass Calais',
            ],
            382 => [
                'id_car_mark' => 129,
                'name' => 'Cutlass Ciera',
            ],
            383 => [
                'id_car_mark' => 129,
                'name' => 'Cutlass Supreme',
            ],
            384 => [
                'id_car_mark' => 129,
                'name' => 'Eighty-Eight',
            ],
            385 => [
                'id_car_mark' => 129,
                'name' => 'Intrigue',
            ],
            386 => [
                'id_car_mark' => 129,
                'name' => 'Ninety-Eight',
            ],
            387 => [
                'id_car_mark' => 129,
                'name' => 'Omega',
            ],
            388 => [
                'id_car_mark' => 129,
                'name' => 'Silhouette',
            ],
            389 => [
                'id_car_mark' => 130,
                'name' => 'Adam',
            ],
            390 => [
                'id_car_mark' => 130,
                'name' => 'Admiral',
            ],
            391 => [
                'id_car_mark' => 130,
                'name' => 'Agila',
            ],
            392 => [
                'id_car_mark' => 130,
                'name' => 'Ampera',
            ],
            393 => [
                'id_car_mark' => 130,
                'name' => 'Antara',
            ],
            394 => [
                'id_car_mark' => 130,
                'name' => 'Ascona',
            ],
            395 => [
                'id_car_mark' => 130,
                'name' => 'Astra',
            ],
            396 => [
                'id_car_mark' => 130,
                'name' => 'Calibra',
            ],
            397 => [
                'id_car_mark' => 130,
                'name' => 'Campo',
            ],
            398 => [
                'id_car_mark' => 130,
                'name' => 'Cascada',
            ],
            399 => [
                'id_car_mark' => 130,
                'name' => 'Combo',
            ],
            400 => [
                'id_car_mark' => 130,
                'name' => 'Commodore',
            ],
            401 => [
                'id_car_mark' => 130,
                'name' => 'Corsa',
            ],
            402 => [
                'id_car_mark' => 130,
                'name' => 'Diplomat',
            ],
            403 => [
                'id_car_mark' => 130,
                'name' => 'Frontera',
            ],
            404 => [
                'id_car_mark' => 130,
                'name' => 'GT',
            ],
            405 => [
                'id_car_mark' => 130,
                'name' => 'Insignia',
            ],
            406 => [
                'id_car_mark' => 130,
                'name' => 'Kadett',
            ],
            407 => [
                'id_car_mark' => 130,
                'name' => 'Manta',
            ],
            408 => [
                'id_car_mark' => 130,
                'name' => 'Meriva',
            ],
            409 => [
                'id_car_mark' => 130,
                'name' => 'Mokka',
            ],
            410 => [
                'id_car_mark' => 130,
                'name' => 'Monterey',
            ],
            411 => [
                'id_car_mark' => 130,
                'name' => 'Monza',
            ],
            412 => [
                'id_car_mark' => 130,
                'name' => 'Omega',
            ],
            413 => [
                'id_car_mark' => 130,
                'name' => 'Rekord',
            ],
            414 => [
                'id_car_mark' => 130,
                'name' => 'Senator',
            ],
            415 => [
                'id_car_mark' => 130,
                'name' => 'Signum',
            ],
            416 => [
                'id_car_mark' => 130,
                'name' => 'Sintra',
            ],
            417 => [
                'id_car_mark' => 130,
                'name' => 'Speedster',
            ],
            418 => [
                'id_car_mark' => 130,
                'name' => 'Tigra',
            ],
            419 => [
                'id_car_mark' => 130,
                'name' => 'Vectra',
            ],
            420 => [
                'id_car_mark' => 130,
                'name' => 'Vita',
            ],
            421 => [
                'id_car_mark' => 130,
                'name' => 'Zafira',
            ],
            422 => [
                'id_car_mark' => 131,
                'name' => '2500 GT',
            ],
            423 => [
                'id_car_mark' => 132,
                'name' => 'Huayra',
            ],
            424 => [
                'id_car_mark' => 132,
                'name' => 'Zonda',
            ],
            425 => [
                'id_car_mark' => 133,
                'name' => 'Esperante',
            ],
            426 => [
                'id_car_mark' => 133,
                'name' => 'Roadster',
            ],
            427 => [
                'id_car_mark' => 134,
                'name' => 'Alza',
            ],
            428 => [
                'id_car_mark' => 134,
                'name' => 'Kancil',
            ],
            429 => [
                'id_car_mark' => 134,
                'name' => 'Kelisa',
            ],
            430 => [
                'id_car_mark' => 134,
                'name' => 'Kembara',
            ],
            431 => [
                'id_car_mark' => 134,
                'name' => 'Kenari',
            ],
            432 => [
                'id_car_mark' => 134,
                'name' => 'MyVi',
            ],
            433 => [
                'id_car_mark' => 134,
                'name' => 'Nautica',
            ],
            434 => [
                'id_car_mark' => 134,
                'name' => 'Viva',
            ],
            435 => [
                'id_car_mark' => 135,
                'name' => '1007',
            ],
            436 => [
                'id_car_mark' => 135,
                'name' => '104',
            ],
            437 => [
                'id_car_mark' => 135,
                'name' => '106',
            ],
            438 => [
                'id_car_mark' => 135,
                'name' => '107',
            ],
            439 => [
                'id_car_mark' => 135,
                'name' => '2008',
            ],
            440 => [
                'id_car_mark' => 135,
                'name' => '204',
            ],
            441 => [
                'id_car_mark' => 135,
                'name' => '205',
            ],
            442 => [
                'id_car_mark' => 135,
                'name' => '206',
            ],
            443 => [
                'id_car_mark' => 135,
                'name' => '207',
            ],
            444 => [
                'id_car_mark' => 135,
                'name' => '208',
            ],
            445 => [
                'id_car_mark' => 135,
                'name' => '3008',
            ],
            446 => [
                'id_car_mark' => 135,
                'name' => '301',
            ],
            447 => [
                'id_car_mark' => 135,
                'name' => '304',
            ],
            448 => [
                'id_car_mark' => 135,
                'name' => '305',
            ],
            449 => [
                'id_car_mark' => 135,
                'name' => '306',
            ],
            450 => [
                'id_car_mark' => 135,
                'name' => '307',
            ],
            451 => [
                'id_car_mark' => 135,
                'name' => '308',
            ],
            452 => [
                'id_car_mark' => 135,
                'name' => '309',
            ],
            453 => [
                'id_car_mark' => 135,
                'name' => '4007',
            ],
            454 => [
                'id_car_mark' => 135,
                'name' => '4008',
            ],
            455 => [
                'id_car_mark' => 135,
                'name' => '405',
            ],
            456 => [
                'id_car_mark' => 135,
                'name' => '406',
            ],
            457 => [
                'id_car_mark' => 135,
                'name' => '407',
            ],
            458 => [
                'id_car_mark' => 135,
                'name' => '408',
            ],
            459 => [
                'id_car_mark' => 135,
                'name' => '5008',
            ],
            460 => [
                'id_car_mark' => 135,
                'name' => '504',
            ],
            461 => [
                'id_car_mark' => 135,
                'name' => '505',
            ],
            462 => [
                'id_car_mark' => 135,
                'name' => '508',
            ],
            463 => [
                'id_car_mark' => 135,
                'name' => '604',
            ],
            464 => [
                'id_car_mark' => 135,
                'name' => '605',
            ],
            465 => [
                'id_car_mark' => 135,
                'name' => '607',
            ],
            466 => [
                'id_car_mark' => 135,
                'name' => '806',
            ],
            467 => [
                'id_car_mark' => 135,
                'name' => '807',
            ],
            468 => [
                'id_car_mark' => 135,
                'name' => 'Partner',
            ],
            469 => [
                'id_car_mark' => 135,
                'name' => 'RCZ',
            ],
            470 => [
                'id_car_mark' => 136,
                'name' => 'Porter',
            ],
            471 => [
                'id_car_mark' => 137,
                'name' => 'Acclaim',
            ],
            472 => [
                'id_car_mark' => 137,
                'name' => 'Breeze',
            ],
            473 => [
                'id_car_mark' => 137,
                'name' => 'Caravelle',
            ],
            474 => [
                'id_car_mark' => 137,
                'name' => 'Laser',
            ],
            475 => [
                'id_car_mark' => 137,
                'name' => 'Neon',
            ],
            476 => [
                'id_car_mark' => 137,
                'name' => 'Prowler',
            ],
            477 => [
                'id_car_mark' => 137,
                'name' => 'Sundance',
            ],
            478 => [
                'id_car_mark' => 137,
                'name' => 'Turismo',
            ],
            479 => [
                'id_car_mark' => 137,
                'name' => 'Voyager',
            ],
            480 => [
                'id_car_mark' => 138,
                'name' => '6000',
            ],
            481 => [
                'id_car_mark' => 138,
                'name' => 'Aztec',
            ],
            482 => [
                'id_car_mark' => 138,
                'name' => 'Bonneville',
            ],
            483 => [
                'id_car_mark' => 138,
                'name' => 'Fiero',
            ],
            484 => [
                'id_car_mark' => 138,
                'name' => 'Firebird',
            ],
            485 => [
                'id_car_mark' => 138,
                'name' => 'G4',
            ],
            486 => [
                'id_car_mark' => 138,
                'name' => 'G5',
            ],
            487 => [
                'id_car_mark' => 138,
                'name' => 'G6',
            ],
            488 => [
                'id_car_mark' => 138,
                'name' => 'Grand AM',
            ],
            489 => [
                'id_car_mark' => 138,
                'name' => 'Grand Prix',
            ],
            490 => [
                'id_car_mark' => 138,
                'name' => 'GTO',
            ],
            491 => [
                'id_car_mark' => 138,
                'name' => 'LeMans',
            ],
            492 => [
                'id_car_mark' => 138,
                'name' => 'Montana',
            ],
            493 => [
                'id_car_mark' => 138,
                'name' => 'Parisienne',
            ],
            494 => [
                'id_car_mark' => 138,
                'name' => 'Phoenix',
            ],
            495 => [
                'id_car_mark' => 138,
                'name' => 'Solstice',
            ],
            496 => [
                'id_car_mark' => 138,
                'name' => 'Sunbird',
            ],
            497 => [
                'id_car_mark' => 138,
                'name' => 'Sunfire',
            ],
            498 => [
                'id_car_mark' => 138,
                'name' => 'Tempest',
            ],
            499 => [
                'id_car_mark' => 138,
                'name' => 'Torrent',
            ],
        ]);
        \DB::table('car_models')->insert([
            0 => [
                'id_car_mark' => 138,
                'name' => 'Trans Sport',
            ],
            1 => [
                'id_car_mark' => 138,
                'name' => 'Vibe',
            ],
            2 => [
                'id_car_mark' => 139,
                'name' => '911',
            ],
            3 => [
                'id_car_mark' => 139,
                'name' => '914',
            ],
            4 => [
                'id_car_mark' => 139,
                'name' => '924',
            ],
            5 => [
                'id_car_mark' => 139,
                'name' => '928',
            ],
            6 => [
                'id_car_mark' => 139,
                'name' => '944',
            ],
            7 => [
                'id_car_mark' => 139,
                'name' => '959',
            ],
            8 => [
                'id_car_mark' => 139,
                'name' => '968',
            ],
            9 => [
                'id_car_mark' => 139,
                'name' => 'Boxster',
            ],
            10 => [
                'id_car_mark' => 139,
                'name' => 'Carrera GT',
            ],
            11 => [
                'id_car_mark' => 139,
                'name' => 'Cayenne',
            ],
            12 => [
                'id_car_mark' => 139,
                'name' => 'Cayman',
            ],
            13 => [
                'id_car_mark' => 139,
                'name' => 'Macan',
            ],
            14 => [
                'id_car_mark' => 139,
                'name' => 'Panamera',
            ],
            15 => [
                'id_car_mark' => 140,
                'name' => '118NE',
            ],
            16 => [
                'id_car_mark' => 140,
                'name' => 'Padmini',
            ],
            17 => [
                'id_car_mark' => 141,
                'name' => 'Exora',
            ],
            18 => [
                'id_car_mark' => 141,
                'name' => 'Gen-2',
            ],
            19 => [
                'id_car_mark' => 141,
                'name' => 'Inspira',
            ],
            20 => [
                'id_car_mark' => 141,
                'name' => 'Juara',
            ],
            21 => [
                'id_car_mark' => 141,
                'name' => 'Perdana',
            ],
            22 => [
                'id_car_mark' => 141,
                'name' => 'Persona',
            ],
            23 => [
                'id_car_mark' => 141,
                'name' => 'Preve',
            ],
            24 => [
                'id_car_mark' => 141,
                'name' => 'Saga',
            ],
            25 => [
                'id_car_mark' => 141,
                'name' => 'Satria',
            ],
            26 => [
                'id_car_mark' => 141,
                'name' => 'Waja',
            ],
            27 => [
                'id_car_mark' => 141,
            'name' => 'Wira (400 Series)',
            ],
            28 => [
                'id_car_mark' => 142,
                'name' => 'G-modell',
            ],
            29 => [
                'id_car_mark' => 142,
                'name' => 'Pinzgauer',
            ],
            30 => [
                'id_car_mark' => 143,
                'name' => 'GTB',
            ],
            31 => [
                'id_car_mark' => 143,
                'name' => 'GTE',
            ],
            32 => [
                'id_car_mark' => 144,
                'name' => '3',
            ],
            33 => [
                'id_car_mark' => 145,
                'name' => 'Mangusta',
            ],
            34 => [
                'id_car_mark' => 146,
                'name' => 'Scimitar Sabre',
            ],
            35 => [
                'id_car_mark' => 147,
                'name' => '11',
            ],
            36 => [
                'id_car_mark' => 147,
                'name' => '12',
            ],
            37 => [
                'id_car_mark' => 147,
                'name' => '14',
            ],
            38 => [
                'id_car_mark' => 147,
                'name' => '15',
            ],
            39 => [
                'id_car_mark' => 147,
                'name' => '16',
            ],
            40 => [
                'id_car_mark' => 147,
                'name' => '17',
            ],
            41 => [
                'id_car_mark' => 147,
                'name' => '18',
            ],
            42 => [
                'id_car_mark' => 147,
                'name' => '19',
            ],
            43 => [
                'id_car_mark' => 147,
                'name' => '20',
            ],
            44 => [
                'id_car_mark' => 147,
                'name' => '21',
            ],
            45 => [
                'id_car_mark' => 147,
                'name' => '25',
            ],
            46 => [
                'id_car_mark' => 147,
                'name' => '30',
            ],
            47 => [
                'id_car_mark' => 147,
                'name' => '4',
            ],
            48 => [
                'id_car_mark' => 147,
                'name' => '5',
            ],
            49 => [
                'id_car_mark' => 147,
                'name' => '6',
            ],
            50 => [
                'id_car_mark' => 147,
                'name' => '9',
            ],
            51 => [
                'id_car_mark' => 147,
                'name' => 'Avantime',
            ],
            52 => [
                'id_car_mark' => 147,
                'name' => 'Captur',
            ],
            53 => [
                'id_car_mark' => 147,
                'name' => 'Clio',
            ],
            54 => [
                'id_car_mark' => 147,
                'name' => 'Duster',
            ],
            55 => [
                'id_car_mark' => 147,
                'name' => 'Espace',
            ],
            56 => [
                'id_car_mark' => 147,
                'name' => 'Fluence',
            ],
            57 => [
                'id_car_mark' => 147,
                'name' => 'Fuego',
            ],
            58 => [
                'id_car_mark' => 147,
                'name' => 'Kangoo',
            ],
            59 => [
                'id_car_mark' => 147,
                'name' => 'Koleos',
            ],
            60 => [
                'id_car_mark' => 147,
                'name' => 'Laguna',
            ],
            61 => [
                'id_car_mark' => 147,
                'name' => 'Latitude',
            ],
            62 => [
                'id_car_mark' => 147,
                'name' => 'Logan',
            ],
            63 => [
                'id_car_mark' => 147,
                'name' => 'Megane',
            ],
            64 => [
                'id_car_mark' => 147,
                'name' => 'Modus',
            ],
            65 => [
                'id_car_mark' => 147,
                'name' => 'Rodeo',
            ],
            66 => [
                'id_car_mark' => 147,
                'name' => 'Safrane',
            ],
            67 => [
                'id_car_mark' => 147,
                'name' => 'Sandero',
            ],
            68 => [
                'id_car_mark' => 147,
                'name' => 'Scenic',
            ],
            69 => [
                'id_car_mark' => 147,
                'name' => 'Sport Spider',
            ],
            70 => [
                'id_car_mark' => 147,
                'name' => 'Symbol',
            ],
            71 => [
                'id_car_mark' => 147,
                'name' => 'Twingo',
            ],
            72 => [
                'id_car_mark' => 147,
                'name' => 'Twizy',
            ],
            73 => [
                'id_car_mark' => 147,
                'name' => 'Vel Satis',
            ],
            74 => [
                'id_car_mark' => 147,
                'name' => 'Wind',
            ],
            75 => [
                'id_car_mark' => 147,
                'name' => 'ZOE',
            ],
            76 => [
                'id_car_mark' => 148,
                'name' => 'SM3',
            ],
            77 => [
                'id_car_mark' => 148,
                'name' => 'SM5',
            ],
            78 => [
                'id_car_mark' => 148,
                'name' => 'SM7',
            ],
            79 => [
                'id_car_mark' => 149,
                'name' => 'Corniche',
            ],
            80 => [
                'id_car_mark' => 149,
                'name' => 'Ghost',
            ],
            81 => [
                'id_car_mark' => 149,
                'name' => 'Park Ward',
            ],
            82 => [
                'id_car_mark' => 149,
                'name' => 'Phantom',
            ],
            83 => [
                'id_car_mark' => 149,
                'name' => 'Silver Seraph',
            ],
            84 => [
                'id_car_mark' => 149,
                'name' => 'Silver Spur',
            ],
            85 => [
                'id_car_mark' => 149,
                'name' => 'Wraith',
            ],
            86 => [
                'id_car_mark' => 150,
                'name' => 'Lightning',
            ],
            87 => [
                'id_car_mark' => 151,
                'name' => '100',
            ],
            88 => [
                'id_car_mark' => 151,
                'name' => '200',
            ],
            89 => [
                'id_car_mark' => 151,
                'name' => '25',
            ],
            90 => [
                'id_car_mark' => 151,
                'name' => '400',
            ],
            91 => [
                'id_car_mark' => 151,
                'name' => '45',
            ],
            92 => [
                'id_car_mark' => 151,
                'name' => '600',
            ],
            93 => [
                'id_car_mark' => 151,
                'name' => '75',
            ],
            94 => [
                'id_car_mark' => 151,
                'name' => '800',
            ],
            95 => [
                'id_car_mark' => 151,
                'name' => 'Metro',
            ],
            96 => [
                'id_car_mark' => 151,
                'name' => 'Mini',
            ],
            97 => [
                'id_car_mark' => 151,
                'name' => 'P6',
            ],
            98 => [
                'id_car_mark' => 151,
                'name' => 'SD1',
            ],
            99 => [
                'id_car_mark' => 152,
                'name' => '9-2X',
            ],
            100 => [
                'id_car_mark' => 152,
                'name' => '9-3',
            ],
            101 => [
                'id_car_mark' => 152,
                'name' => '9-4X',
            ],
            102 => [
                'id_car_mark' => 152,
                'name' => '9-5',
            ],
            103 => [
                'id_car_mark' => 152,
                'name' => '9-7X',
            ],
            104 => [
                'id_car_mark' => 152,
                'name' => '90',
            ],
            105 => [
                'id_car_mark' => 152,
                'name' => '900',
            ],
            106 => [
                'id_car_mark' => 152,
                'name' => '9000',
            ],
            107 => [
                'id_car_mark' => 152,
                'name' => '95',
            ],
            108 => [
                'id_car_mark' => 152,
                'name' => '96',
            ],
            109 => [
                'id_car_mark' => 152,
                'name' => '99',
            ],
            110 => [
                'id_car_mark' => 153,
                'name' => 'S7',
            ],
            111 => [
                'id_car_mark' => 154,
                'name' => 'PS-10',
            ],
            112 => [
                'id_car_mark' => 155,
                'name' => 'Astra',
            ],
            113 => [
                'id_car_mark' => 155,
                'name' => 'Aura',
            ],
            114 => [
                'id_car_mark' => 155,
                'name' => 'ION',
            ],
            115 => [
                'id_car_mark' => 155,
                'name' => 'LS',
            ],
            116 => [
                'id_car_mark' => 155,
                'name' => 'LW',
            ],
            117 => [
                'id_car_mark' => 155,
                'name' => 'Outlook',
            ],
            118 => [
                'id_car_mark' => 155,
                'name' => 'Relay',
            ],
            119 => [
                'id_car_mark' => 155,
                'name' => 'SC',
            ],
            120 => [
                'id_car_mark' => 155,
                'name' => 'Sky',
            ],
            121 => [
                'id_car_mark' => 155,
                'name' => 'SL',
            ],
            122 => [
                'id_car_mark' => 155,
                'name' => 'SW',
            ],
            123 => [
                'id_car_mark' => 155,
                'name' => 'VUE',
            ],
            124 => [
                'id_car_mark' => 156,
                'name' => 'FR-S',
            ],
            125 => [
                'id_car_mark' => 156,
                'name' => 'iQ',
            ],
            126 => [
                'id_car_mark' => 156,
                'name' => 'tC',
            ],
            127 => [
                'id_car_mark' => 156,
                'name' => 'xA',
            ],
            128 => [
                'id_car_mark' => 156,
                'name' => 'xB',
            ],
            129 => [
                'id_car_mark' => 156,
                'name' => 'xD',
            ],
            130 => [
                'id_car_mark' => 157,
                'name' => '133',
            ],
            131 => [
                'id_car_mark' => 157,
                'name' => 'Alhambra',
            ],
            132 => [
                'id_car_mark' => 157,
                'name' => 'Altea',
            ],
            133 => [
                'id_car_mark' => 157,
                'name' => 'Arosa',
            ],
            134 => [
                'id_car_mark' => 157,
                'name' => 'Cordoba',
            ],
            135 => [
                'id_car_mark' => 157,
                'name' => 'Exeo',
            ],
            136 => [
                'id_car_mark' => 157,
                'name' => 'Fura',
            ],
            137 => [
                'id_car_mark' => 157,
                'name' => 'Ibiza',
            ],
            138 => [
                'id_car_mark' => 157,
                'name' => 'Leon',
            ],
            139 => [
                'id_car_mark' => 157,
                'name' => 'Malaga',
            ],
            140 => [
                'id_car_mark' => 157,
                'name' => 'Marbella',
            ],
            141 => [
                'id_car_mark' => 157,
                'name' => 'Ronda',
            ],
            142 => [
                'id_car_mark' => 157,
                'name' => 'Toledo',
            ],
            143 => [
                'id_car_mark' => 158,
                'name' => 'Noble',
            ],
            144 => [
                'id_car_mark' => 158,
                'name' => 'Sceo',
            ],
            145 => [
                'id_car_mark' => 159,
                'name' => '100 Series',
            ],
            146 => [
                'id_car_mark' => 159,
                'name' => 'Citigo',
            ],
            147 => [
                'id_car_mark' => 159,
                'name' => 'Fabia',
            ],
            148 => [
                'id_car_mark' => 159,
                'name' => 'Favorit',
            ],
            149 => [
                'id_car_mark' => 159,
                'name' => 'Felicia',
            ],
            150 => [
                'id_car_mark' => 159,
                'name' => 'Octavia',
            ],
            151 => [
                'id_car_mark' => 159,
                'name' => 'Rapid',
            ],
            152 => [
                'id_car_mark' => 159,
                'name' => 'Roomster',
            ],
            153 => [
                'id_car_mark' => 159,
                'name' => 'Superb',
            ],
            154 => [
                'id_car_mark' => 159,
                'name' => 'Yeti',
            ],
            155 => [
                'id_car_mark' => 160,
                'name' => 'Forfour',
            ],
            156 => [
                'id_car_mark' => 160,
                'name' => 'Fortwo',
            ],
            157 => [
                'id_car_mark' => 160,
                'name' => 'Roadster',
            ],
            158 => [
                'id_car_mark' => 161,
                'name' => 'Lioncel',
            ],
            159 => [
                'id_car_mark' => 162,
                'name' => 'R42',
            ],
            160 => [
                'id_car_mark' => 163,
                'name' => 'C12',
            ],
            161 => [
                'id_car_mark' => 163,
                'name' => 'C8',
            ],
            162 => [
                'id_car_mark' => 165,
                'name' => 'Actyon',
            ],
            163 => [
                'id_car_mark' => 165,
                'name' => 'Actyon Sports',
            ],
            164 => [
                'id_car_mark' => 165,
                'name' => 'Chairman',
            ],
            165 => [
                'id_car_mark' => 165,
                'name' => 'Kallista',
            ],
            166 => [
                'id_car_mark' => 165,
                'name' => 'Korando Family',
            ],
            167 => [
                'id_car_mark' => 165,
                'name' => 'Korando',
            ],
            168 => [
                'id_car_mark' => 165,
                'name' => 'Kyron',
            ],
            169 => [
                'id_car_mark' => 165,
                'name' => 'Musso',
            ],
            170 => [
                'id_car_mark' => 165,
                'name' => 'Rexton',
            ],
            171 => [
                'id_car_mark' => 165,
                'name' => 'Rodius',
            ],
            172 => [
                'id_car_mark' => 165,
                'name' => 'Stavic',
            ],
            173 => [
                'id_car_mark' => 166,
                'name' => 'Alcyone',
            ],
            174 => [
                'id_car_mark' => 166,
                'name' => 'Baja',
            ],
            175 => [
                'id_car_mark' => 166,
                'name' => 'BRZ',
            ],
            176 => [
                'id_car_mark' => 166,
                'name' => 'Dex',
            ],
            177 => [
                'id_car_mark' => 166,
                'name' => 'Domingo',
            ],
            178 => [
                'id_car_mark' => 166,
                'name' => 'Exiga',
            ],
            179 => [
                'id_car_mark' => 166,
                'name' => 'Forester',
            ],
            180 => [
                'id_car_mark' => 166,
                'name' => 'Impreza',
            ],
            181 => [
                'id_car_mark' => 166,
                'name' => 'Justy',
            ],
            182 => [
                'id_car_mark' => 166,
                'name' => 'Legacy',
            ],
            183 => [
                'id_car_mark' => 166,
                'name' => 'Leone',
            ],
            184 => [
                'id_car_mark' => 166,
                'name' => 'Libero',
            ],
            185 => [
                'id_car_mark' => 166,
                'name' => 'Lucra',
            ],
            186 => [
                'id_car_mark' => 166,
                'name' => 'Outback',
            ],
            187 => [
                'id_car_mark' => 166,
                'name' => 'Pleo',
            ],
            188 => [
                'id_car_mark' => 166,
                'name' => 'R1',
            ],
            189 => [
                'id_car_mark' => 166,
                'name' => 'R2',
            ],
            190 => [
                'id_car_mark' => 166,
                'name' => 'Sambar',
            ],
            191 => [
                'id_car_mark' => 166,
                'name' => 'Stella',
            ],
            192 => [
                'id_car_mark' => 166,
                'name' => 'SVX',
            ],
            193 => [
                'id_car_mark' => 166,
                'name' => 'Traviq',
            ],
            194 => [
                'id_car_mark' => 166,
                'name' => 'Trezia',
            ],
            195 => [
                'id_car_mark' => 166,
                'name' => 'Tribeca',
            ],
            196 => [
                'id_car_mark' => 166,
                'name' => 'Vivio',
            ],
            197 => [
                'id_car_mark' => 166,
                'name' => 'XT',
            ],
            198 => [
                'id_car_mark' => 166,
                'name' => 'XV',
            ],
            199 => [
                'id_car_mark' => 167,
                'name' => 'Aerio',
            ],
            200 => [
                'id_car_mark' => 167,
                'name' => 'Alto',
            ],
            201 => [
                'id_car_mark' => 167,
                'name' => 'Baleno',
            ],
            202 => [
                'id_car_mark' => 167,
                'name' => 'Cappuccino',
            ],
            203 => [
                'id_car_mark' => 167,
                'name' => 'Cervo',
            ],
            204 => [
                'id_car_mark' => 167,
                'name' => 'Ertiga',
            ],
            205 => [
                'id_car_mark' => 167,
                'name' => 'Escudo',
            ],
            206 => [
                'id_car_mark' => 167,
                'name' => 'Every',
            ],
            207 => [
                'id_car_mark' => 167,
                'name' => 'Forenza',
            ],
            208 => [
                'id_car_mark' => 167,
                'name' => 'Grand Vitara',
            ],
            209 => [
                'id_car_mark' => 167,
                'name' => 'Ignis',
            ],
            210 => [
                'id_car_mark' => 167,
                'name' => 'Jimny',
            ],
            211 => [
                'id_car_mark' => 167,
                'name' => 'Kei',
            ],
            212 => [
                'id_car_mark' => 167,
                'name' => 'Kizashi',
            ],
            213 => [
                'id_car_mark' => 167,
                'name' => 'Landy',
            ],
            214 => [
                'id_car_mark' => 167,
                'name' => 'Liana',
            ],
            215 => [
                'id_car_mark' => 167,
                'name' => 'MR Wagon',
            ],
            216 => [
                'id_car_mark' => 167,
                'name' => 'Palette',
            ],
            217 => [
                'id_car_mark' => 167,
                'name' => 'Reno',
            ],
            218 => [
                'id_car_mark' => 167,
                'name' => 'Solio',
            ],
            219 => [
                'id_car_mark' => 167,
                'name' => 'Spacia',
            ],
            220 => [
                'id_car_mark' => 167,
                'name' => 'Splash',
            ],
            221 => [
                'id_car_mark' => 167,
                'name' => 'Swift',
            ],
            222 => [
                'id_car_mark' => 167,
                'name' => 'SX4',
            ],
            223 => [
                'id_car_mark' => 167,
                'name' => 'Verona',
            ],
            224 => [
                'id_car_mark' => 167,
                'name' => 'Wagon R',
            ],
            225 => [
                'id_car_mark' => 167,
                'name' => 'Wagon R+',
            ],
            226 => [
                'id_car_mark' => 167,
                'name' => 'X-90',
            ],
            227 => [
                'id_car_mark' => 167,
                'name' => 'XL7',
            ],
            228 => [
                'id_car_mark' => 168,
                'name' => '1510',
            ],
            229 => [
                'id_car_mark' => 168,
                'name' => 'Avenger',
            ],
            230 => [
                'id_car_mark' => 168,
                'name' => 'Horizon',
            ],
            231 => [
                'id_car_mark' => 168,
                'name' => 'Samba',
            ],
            232 => [
                'id_car_mark' => 168,
                'name' => 'Solara',
            ],
            233 => [
                'id_car_mark' => 168,
                'name' => 'Tagora',
            ],
            234 => [
                'id_car_mark' => 169,
                'name' => 'Aria',
            ],
            235 => [
                'id_car_mark' => 169,
                'name' => 'Estate',
            ],
            236 => [
                'id_car_mark' => 169,
                'name' => 'Indica',
            ],
            237 => [
                'id_car_mark' => 169,
                'name' => 'Indigo',
            ],
            238 => [
                'id_car_mark' => 169,
                'name' => 'Nano',
            ],
            239 => [
                'id_car_mark' => 169,
                'name' => 'Safari',
            ],
            240 => [
                'id_car_mark' => 169,
                'name' => 'Sierra',
            ],
            241 => [
                'id_car_mark' => 169,
                'name' => 'Sumo',
            ],
            242 => [
                'id_car_mark' => 170,
                'name' => 'T613',
            ],
            243 => [
                'id_car_mark' => 170,
                'name' => 'T700',
            ],
            244 => [
                'id_car_mark' => 171,
                'name' => 'Zero',
            ],
            245 => [
                'id_car_mark' => 172,
                'name' => 'Model S',
            ],
            246 => [
                'id_car_mark' => 172,
                'name' => 'Roadster',
            ],
            247 => [
                'id_car_mark' => 173,
                'name' => 'Century',
            ],
            248 => [
                'id_car_mark' => 174,
                'name' => 'Admiral',
            ],
            249 => [
                'id_car_mark' => 175,
                'name' => 'Dogan',
            ],
            250 => [
                'id_car_mark' => 175,
                'name' => 'Kartal',
            ],
            251 => [
                'id_car_mark' => 175,
                'name' => 'Murat 131',
            ],
            252 => [
                'id_car_mark' => 175,
                'name' => 'Serce',
            ],
            253 => [
                'id_car_mark' => 176,
                'name' => '4Runner',
            ],
            254 => [
                'id_car_mark' => 176,
                'name' => 'Allex',
            ],
            255 => [
                'id_car_mark' => 176,
                'name' => 'Allion',
            ],
            256 => [
                'id_car_mark' => 176,
                'name' => 'Alphard',
            ],
            257 => [
                'id_car_mark' => 176,
                'name' => 'Altezza',
            ],
            258 => [
                'id_car_mark' => 176,
                'name' => 'Aristo',
            ],
            259 => [
                'id_car_mark' => 176,
                'name' => 'Aurion',
            ],
            260 => [
                'id_car_mark' => 176,
                'name' => 'Auris',
            ],
            261 => [
                'id_car_mark' => 176,
                'name' => 'Avalon',
            ],
            262 => [
                'id_car_mark' => 176,
                'name' => 'Avensis',
            ],
            263 => [
                'id_car_mark' => 176,
                'name' => 'Avensis Verso',
            ],
            264 => [
                'id_car_mark' => 176,
                'name' => 'Aygo',
            ],
            265 => [
                'id_car_mark' => 176,
                'name' => 'bB',
            ],
            266 => [
                'id_car_mark' => 176,
                'name' => 'Belta',
            ],
            267 => [
                'id_car_mark' => 176,
                'name' => 'Blade',
            ],
            268 => [
                'id_car_mark' => 176,
                'name' => 'Blizzard',
            ],
            269 => [
                'id_car_mark' => 176,
                'name' => 'Brevis',
            ],
            270 => [
                'id_car_mark' => 176,
                'name' => 'Caldina',
            ],
            271 => [
                'id_car_mark' => 176,
                'name' => 'Cami',
            ],
            272 => [
                'id_car_mark' => 176,
                'name' => 'Camry',
            ],
            273 => [
                'id_car_mark' => 176,
                'name' => 'Carina ED',
            ],
            274 => [
                'id_car_mark' => 176,
                'name' => 'Carina',
            ],
            275 => [
                'id_car_mark' => 176,
                'name' => 'Cavalier',
            ],
            276 => [
                'id_car_mark' => 176,
                'name' => 'Celica',
            ],
            277 => [
                'id_car_mark' => 176,
                'name' => 'Celsior',
            ],
            278 => [
                'id_car_mark' => 176,
                'name' => 'Century',
            ],
            279 => [
                'id_car_mark' => 176,
                'name' => 'Chaser',
            ],
            280 => [
                'id_car_mark' => 176,
                'name' => 'Corolla',
            ],
            281 => [
                'id_car_mark' => 176,
                'name' => 'Corolla Rumion',
            ],
            282 => [
                'id_car_mark' => 176,
                'name' => 'Corona',
            ],
            283 => [
                'id_car_mark' => 176,
                'name' => 'Corsa',
            ],
            284 => [
                'id_car_mark' => 176,
                'name' => 'Cressida',
            ],
            285 => [
                'id_car_mark' => 176,
                'name' => 'Cresta',
            ],
            286 => [
                'id_car_mark' => 176,
                'name' => 'Crown Majesta',
            ],
            287 => [
                'id_car_mark' => 176,
                'name' => 'Crown',
            ],
            288 => [
                'id_car_mark' => 176,
                'name' => 'Curren',
            ],
            289 => [
                'id_car_mark' => 176,
                'name' => 'Cynos',
            ],
            290 => [
                'id_car_mark' => 176,
                'name' => 'Duet',
            ],
            291 => [
                'id_car_mark' => 176,
                'name' => 'Echo',
            ],
            292 => [
                'id_car_mark' => 176,
                'name' => 'Estima',
            ],
            293 => [
                'id_car_mark' => 176,
                'name' => 'FJ Cruiser',
            ],
            294 => [
                'id_car_mark' => 176,
                'name' => 'Fortuner',
            ],
            295 => [
                'id_car_mark' => 176,
                'name' => 'FunCargo',
            ],
            296 => [
                'id_car_mark' => 176,
                'name' => 'Gaia',
            ],
            297 => [
                'id_car_mark' => 176,
                'name' => 'Granvia',
            ],
            298 => [
                'id_car_mark' => 176,
                'name' => 'Harrier',
            ],
            299 => [
                'id_car_mark' => 176,
                'name' => 'HiAce',
            ],
            300 => [
                'id_car_mark' => 176,
                'name' => 'Highlander',
            ],
            301 => [
                'id_car_mark' => 176,
                'name' => 'Hilux Surf',
            ],
            302 => [
                'id_car_mark' => 176,
                'name' => 'Hilux',
            ],
            303 => [
                'id_car_mark' => 176,
                'name' => 'Innova',
            ],
            304 => [
                'id_car_mark' => 176,
                'name' => 'Ipsum',
            ],
            305 => [
                'id_car_mark' => 176,
                'name' => 'iQ',
            ],
            306 => [
                'id_car_mark' => 176,
                'name' => 'ISis',
            ],
            307 => [
                'id_car_mark' => 176,
                'name' => 'Ist',
            ],
            308 => [
                'id_car_mark' => 176,
                'name' => 'Kluger',
            ],
            309 => [
                'id_car_mark' => 176,
                'name' => 'Land Cruiser',
            ],
            310 => [
                'id_car_mark' => 176,
                'name' => 'Land Cruiser Prado',
            ],
            311 => [
                'id_car_mark' => 177,
                'name' => '1.1',
            ],
            312 => [
                'id_car_mark' => 177,
                'name' => 'P 601',
            ],
            313 => [
                'id_car_mark' => 178,
                'name' => 'Tramontana',
            ],
            314 => [
                'id_car_mark' => 179,
                'name' => 'TR7',
            ],
            315 => [
                'id_car_mark' => 179,
                'name' => 'TR8',
            ],
            316 => [
                'id_car_mark' => 180,
                'name' => '280',
            ],
            317 => [
                'id_car_mark' => 180,
                'name' => '350',
            ],
            318 => [
                'id_car_mark' => 180,
                'name' => '390',
            ],
            319 => [
                'id_car_mark' => 180,
                'name' => '400',
            ],
            320 => [
                'id_car_mark' => 180,
                'name' => '420',
            ],
            321 => [
                'id_car_mark' => 180,
                'name' => '450',
            ],
            322 => [
                'id_car_mark' => 180,
                'name' => 'Cerbera',
            ],
            323 => [
                'id_car_mark' => 180,
                'name' => 'Chimaera',
            ],
            324 => [
                'id_car_mark' => 180,
                'name' => 'Griffith',
            ],
            325 => [
                'id_car_mark' => 180,
                'name' => 'S-Series',
            ],
            326 => [
                'id_car_mark' => 180,
                'name' => 'Sagaris',
            ],
            327 => [
                'id_car_mark' => 180,
                'name' => 'Tamora',
            ],
            328 => [
                'id_car_mark' => 180,
                'name' => 'Tuscan',
            ],
            329 => [
                'id_car_mark' => 181,
                'name' => 'Adam',
            ],
            330 => [
                'id_car_mark' => 181,
                'name' => 'Astra',
            ],
            331 => [
                'id_car_mark' => 181,
                'name' => 'Carlton',
            ],
            332 => [
                'id_car_mark' => 181,
                'name' => 'Royale',
            ],
            333 => [
                'id_car_mark' => 181,
                'name' => 'Vectra',
            ],
            334 => [
                'id_car_mark' => 181,
                'name' => 'Ventora',
            ],
            335 => [
                'id_car_mark' => 181,
                'name' => 'Viceroy',
            ],
            336 => [
                'id_car_mark' => 181,
                'name' => 'Victor',
            ],
            337 => [
                'id_car_mark' => 181,
                'name' => 'Viva',
            ],
            338 => [
                'id_car_mark' => 181,
                'name' => 'VXR8',
            ],
            339 => [
                'id_car_mark' => 182,
                'name' => 'M12',
            ],
            340 => [
                'id_car_mark' => 182,
                'name' => 'W8 Twin Turbo',
            ],
            341 => [
                'id_car_mark' => 183,
                'name' => '210',
            ],
            342 => [
                'id_car_mark' => 183,
                'name' => '260 LM',
            ],
            343 => [
                'id_car_mark' => 183,
                'name' => '300 Atlantique',
            ],
            344 => [
                'id_car_mark' => 183,
                'name' => '400 GT',
            ],
            345 => [
                'id_car_mark' => 184,
                'name' => '181',
            ],
            346 => [
                'id_car_mark' => 184,
                'name' => 'Beetle',
            ],
            347 => [
                'id_car_mark' => 184,
                'name' => 'Bora',
            ],
            348 => [
                'id_car_mark' => 184,
                'name' => 'Caddy',
            ],
            349 => [
                'id_car_mark' => 184,
                'name' => 'Corrado',
            ],
            350 => [
                'id_car_mark' => 184,
                'name' => 'Derby',
            ],
            351 => [
                'id_car_mark' => 184,
                'name' => 'Eos',
            ],
            352 => [
                'id_car_mark' => 184,
                'name' => 'Fox',
            ],
            353 => [
                'id_car_mark' => 184,
                'name' => 'Golf Country',
            ],
            354 => [
                'id_car_mark' => 184,
                'name' => 'Golf',
            ],
            355 => [
                'id_car_mark' => 184,
                'name' => 'Golf Plus',
            ],
            356 => [
                'id_car_mark' => 184,
                'name' => 'Golf Sportsvan',
            ],
            357 => [
                'id_car_mark' => 184,
                'name' => 'Iltis',
            ],
            358 => [
                'id_car_mark' => 184,
                'name' => 'Jetta',
            ],
            359 => [
                'id_car_mark' => 184,
                'name' => 'Lupo',
            ],
            360 => [
                'id_car_mark' => 184,
                'name' => 'Multivan',
            ],
            361 => [
                'id_car_mark' => 184,
            'name' => 'Passat (North America)',
            ],
            362 => [
                'id_car_mark' => 184,
                'name' => 'Passat',
            ],
            363 => [
                'id_car_mark' => 184,
                'name' => 'Passat CC',
            ],
            364 => [
                'id_car_mark' => 184,
                'name' => 'Phaeton',
            ],
            365 => [
                'id_car_mark' => 184,
                'name' => 'Pointer',
            ],
            366 => [
                'id_car_mark' => 184,
                'name' => 'Polo',
            ],
            367 => [
                'id_car_mark' => 184,
                'name' => 'Routan',
            ],
            368 => [
                'id_car_mark' => 184,
                'name' => 'Santana',
            ],
            369 => [
                'id_car_mark' => 184,
                'name' => 'Scirocco',
            ],
            370 => [
                'id_car_mark' => 184,
                'name' => 'Sharan',
            ],
            371 => [
                'id_car_mark' => 184,
                'name' => 'Taro',
            ],
            372 => [
                'id_car_mark' => 184,
                'name' => 'Tiguan',
            ],
            373 => [
                'id_car_mark' => 184,
                'name' => 'Touareg',
            ],
            374 => [
                'id_car_mark' => 184,
                'name' => 'Touran',
            ],
            375 => [
                'id_car_mark' => 184,
                'name' => 'Type 4',
            ],
            376 => [
                'id_car_mark' => 184,
                'name' => 'up!',
            ],
            377 => [
                'id_car_mark' => 184,
                'name' => 'Vento',
            ],
            378 => [
                'id_car_mark' => 184,
                'name' => 'XL1',
            ],
            379 => [
                'id_car_mark' => 185,
                'name' => '140 Series',
            ],
            380 => [
                'id_car_mark' => 185,
                'name' => '164',
            ],
            381 => [
                'id_car_mark' => 185,
                'name' => '240 Series',
            ],
            382 => [
                'id_car_mark' => 185,
                'name' => '260 Series',
            ],
            383 => [
                'id_car_mark' => 185,
                'name' => '300 Series',
            ],
            384 => [
                'id_car_mark' => 185,
                'name' => '440',
            ],
            385 => [
                'id_car_mark' => 185,
                'name' => '460',
            ],
            386 => [
                'id_car_mark' => 185,
                'name' => '480',
            ],
            387 => [
                'id_car_mark' => 185,
                'name' => '66',
            ],
            388 => [
                'id_car_mark' => 185,
                'name' => '740',
            ],
            389 => [
                'id_car_mark' => 185,
                'name' => '760',
            ],
            390 => [
                'id_car_mark' => 185,
                'name' => '780',
            ],
            391 => [
                'id_car_mark' => 185,
                'name' => '850',
            ],
            392 => [
                'id_car_mark' => 185,
                'name' => '940',
            ],
            393 => [
                'id_car_mark' => 185,
                'name' => '960',
            ],
            394 => [
                'id_car_mark' => 185,
                'name' => 'C30',
            ],
            395 => [
                'id_car_mark' => 185,
                'name' => 'C70',
            ],
            396 => [
                'id_car_mark' => 185,
                'name' => 'Laplander',
            ],
            397 => [
                'id_car_mark' => 185,
                'name' => 'S40',
            ],
            398 => [
                'id_car_mark' => 185,
                'name' => 'S60',
            ],
            399 => [
                'id_car_mark' => 185,
                'name' => 'S70',
            ],
            400 => [
                'id_car_mark' => 185,
                'name' => 'S80',
            ],
            401 => [
                'id_car_mark' => 185,
                'name' => 'S90',
            ],
            402 => [
                'id_car_mark' => 185,
                'name' => 'V40',
            ],
            403 => [
                'id_car_mark' => 185,
                'name' => 'V50',
            ],
            404 => [
                'id_car_mark' => 185,
                'name' => 'V60',
            ],
            405 => [
                'id_car_mark' => 185,
                'name' => 'V70',
            ],
            406 => [
                'id_car_mark' => 185,
                'name' => 'V90',
            ],
            407 => [
                'id_car_mark' => 185,
                'name' => 'XC60',
            ],
            408 => [
                'id_car_mark' => 185,
                'name' => 'XC70',
            ],
            409 => [
                'id_car_mark' => 185,
                'name' => 'XC90',
            ],
            410 => [
                'id_car_mark' => 186,
                'name' => 'Corda',
            ],
            411 => [
                'id_car_mark' => 186,
                'name' => 'Estina',
            ],
            412 => [
                'id_car_mark' => 186,
                'name' => 'Tingo',
            ],
            413 => [
                'id_car_mark' => 187,
                'name' => '1.3',
            ],
            414 => [
                'id_car_mark' => 187,
                'name' => '353',
            ],
            415 => [
                'id_car_mark' => 188,
                'name' => 'SEi & Sport',
            ],
            416 => [
                'id_car_mark' => 188,
                'name' => 'SEiGHT',
            ],
            417 => [
                'id_car_mark' => 189,
                'name' => 'GT',
            ],
            418 => [
                'id_car_mark' => 189,
                'name' => 'Roadster',
            ],
            419 => [
                'id_car_mark' => 190,
                'name' => 'Pickup X3',
            ],
            420 => [
                'id_car_mark' => 190,
                'name' => 'SR-V X3',
            ],
            421 => [
                'id_car_mark' => 190,
                'name' => 'SUV X3',
            ],
            422 => [
                'id_car_mark' => 191,
                'name' => '10',
            ],
            423 => [
                'id_car_mark' => 191,
                'name' => 'Florida',
            ],
            424 => [
                'id_car_mark' => 191,
                'name' => 'Skala',
            ],
            425 => [
                'id_car_mark' => 191,
                'name' => 'Yugo',
            ],
            426 => [
                'id_car_mark' => 192,
            'name' => 'Nomad (RX6400)',
            ],
            427 => [
                'id_car_mark' => 193,
                'name' => 'Admiral',
            ],
            428 => [
                'id_car_mark' => 193,
                'name' => 'Landmark',
            ],
            429 => [
                'id_car_mark' => 212,
                'name' => '2160',
            ],
            430 => [
                'id_car_mark' => 212,
                'name' => '2163',
            ],
            431 => [
                'id_car_mark' => 212,
                'name' => '3101',
            ],
            432 => [
                'id_car_mark' => 213,
                'name' => 'Ока-Астро 11301',
            ],
            433 => [
                'id_car_mark' => 214,
                'name' => 'Рысь',
            ],
            434 => [
                'id_car_mark' => 215,
                'name' => '1111 Ока',
            ],
            435 => [
                'id_car_mark' => 215,
                'name' => '2101',
            ],
            436 => [
                'id_car_mark' => 215,
                'name' => '2102',
            ],
            437 => [
                'id_car_mark' => 215,
                'name' => '2103',
            ],
            438 => [
                'id_car_mark' => 215,
                'name' => '2104',
            ],
            439 => [
                'id_car_mark' => 215,
                'name' => '2105',
            ],
            440 => [
                'id_car_mark' => 215,
                'name' => '2106',
            ],
            441 => [
                'id_car_mark' => 215,
                'name' => '2107',
            ],
            442 => [
                'id_car_mark' => 215,
                'name' => '2108',
            ],
            443 => [
                'id_car_mark' => 215,
                'name' => '2109',
            ],
            444 => [
                'id_car_mark' => 215,
                'name' => '21099',
            ],
            445 => [
                'id_car_mark' => 215,
                'name' => '2110',
            ],
            446 => [
                'id_car_mark' => 215,
                'name' => '2111',
            ],
            447 => [
                'id_car_mark' => 215,
                'name' => '2112',
            ],
            448 => [
                'id_car_mark' => 215,
                'name' => '2113',
            ],
            449 => [
                'id_car_mark' => 215,
                'name' => '2114',
            ],
            450 => [
                'id_car_mark' => 215,
                'name' => '2115',
            ],
            451 => [
                'id_car_mark' => 215,
                'name' => '2120 Надежда',
            ],
            452 => [
                'id_car_mark' => 215,
            'name' => '2121 (4x4)',
            ],
            453 => [
                'id_car_mark' => 215,
                'name' => '2123',
            ],
            454 => [
                'id_car_mark' => 215,
                'name' => '2129',
            ],
            455 => [
                'id_car_mark' => 215,
            'name' => '2131 (4x4)',
            ],
            456 => [
                'id_car_mark' => 215,
                'name' => '2328',
            ],
            457 => [
                'id_car_mark' => 215,
                'name' => '2329',
            ],
            458 => [
                'id_car_mark' => 215,
                'name' => 'Granta',
            ],
            459 => [
                'id_car_mark' => 215,
                'name' => 'Kalina',
            ],
            460 => [
                'id_car_mark' => 215,
                'name' => 'Largus',
            ],
            461 => [
                'id_car_mark' => 215,
                'name' => 'Priora',
            ],
            462 => [
                'id_car_mark' => 215,
                'name' => 'Revolution',
            ],
            463 => [
                'id_car_mark' => 216,
                'name' => '13 «Чайка»',
            ],
            464 => [
                'id_car_mark' => 216,
                'name' => '14 «Чайка»',
            ],
            465 => [
                'id_car_mark' => 216,
                'name' => '21 «Волга»',
            ],
            466 => [
                'id_car_mark' => 216,
                'name' => '22 «Волга»',
            ],
            467 => [
                'id_car_mark' => 216,
                'name' => '2308 «Атаман»',
            ],
            468 => [
                'id_car_mark' => 216,
                'name' => '2330 «Тигр»',
            ],
            469 => [
                'id_car_mark' => 216,
                'name' => '24 «Волга»',
            ],
            470 => [
                'id_car_mark' => 216,
                'name' => '3102 «Волга»',
            ],
            471 => [
                'id_car_mark' => 216,
                'name' => '31029 «Волга»',
            ],
            472 => [
                'id_car_mark' => 216,
                'name' => '3103 «Волга»',
            ],
            473 => [
                'id_car_mark' => 216,
                'name' => '3105 «Волга»',
            ],
            474 => [
                'id_car_mark' => 216,
                'name' => '3110 «Волга»',
            ],
            475 => [
                'id_car_mark' => 216,
                'name' => '31105 «Волга»',
            ],
            476 => [
                'id_car_mark' => 216,
                'name' => '3111 «Волга»',
            ],
            477 => [
                'id_car_mark' => 216,
                'name' => '69',
            ],
            478 => [
                'id_car_mark' => 216,
                'name' => 'Volga Siber',
            ],
            479 => [
                'id_car_mark' => 216,
                'name' => 'М-20 «Победа»',
            ],
            480 => [
                'id_car_mark' => 216,
                'name' => 'М1',
            ],
            481 => [
                'id_car_mark' => 217,
                'name' => '1102 «Таврия»',
            ],
            482 => [
                'id_car_mark' => 217,
                'name' => '1103 «Славута»',
            ],
            483 => [
                'id_car_mark' => 217,
                'name' => '1105 «Дана»',
            ],
            484 => [
                'id_car_mark' => 217,
                'name' => '965',
            ],
            485 => [
                'id_car_mark' => 217,
                'name' => '966',
            ],
            486 => [
                'id_car_mark' => 217,
                'name' => '968',
            ],
            487 => [
                'id_car_mark' => 217,
                'name' => 'Chance',
            ],
            488 => [
                'id_car_mark' => 217,
                'name' => 'Forza',
            ],
            489 => [
                'id_car_mark' => 217,
                'name' => 'Sens',
            ],
            490 => [
                'id_car_mark' => 217,
                'name' => 'Vida',
            ],
            491 => [
                'id_car_mark' => 218,
                'name' => '114',
            ],
            492 => [
                'id_car_mark' => 218,
                'name' => '117',
            ],
            493 => [
                'id_car_mark' => 218,
                'name' => '4104',
            ],
            494 => [
                'id_car_mark' => 219,
                'name' => '2125 «Комби»',
            ],
            495 => [
                'id_car_mark' => 219,
                'name' => '2126 «Ода»',
            ],
            496 => [
                'id_car_mark' => 219,
                'name' => '21261 «Фабула»',
            ],
            497 => [
                'id_car_mark' => 219,
                'name' => '2717',
            ],
            498 => [
                'id_car_mark' => 219,
                'name' => 'Москвич-412',
            ],
            499 => [
                'id_car_mark' => 220,
                'name' => '1111 Ока',
            ],
        ]);
        \DB::table('car_models')->insert([
            0 => [
                'id_car_mark' => 221,
                'name' => '2317',
            ],
            1 => [
                'id_car_mark' => 222,
                'name' => '1302 Волынь',
            ],
            2 => [
                'id_car_mark' => 222,
                'name' => '967',
            ],
            3 => [
                'id_car_mark' => 222,
                'name' => '969',
            ],
            4 => [
                'id_car_mark' => 223,
                'name' => '2136',
            ],
            5 => [
                'id_car_mark' => 223,
                'name' => '2137',
            ],
            6 => [
                'id_car_mark' => 223,
                'name' => '2138',
            ],
            7 => [
                'id_car_mark' => 223,
                'name' => '2140',
            ],
            8 => [
                'id_car_mark' => 223,
                'name' => '2141',
            ],
            9 => [
                'id_car_mark' => 223,
                'name' => '400',
            ],
            10 => [
                'id_car_mark' => 223,
                'name' => '401',
            ],
            11 => [
                'id_car_mark' => 223,
                'name' => '402',
            ],
            12 => [
                'id_car_mark' => 223,
                'name' => '403',
            ],
            13 => [
                'id_car_mark' => 223,
                'name' => '407',
            ],
            14 => [
                'id_car_mark' => 223,
                'name' => '408',
            ],
            15 => [
                'id_car_mark' => 223,
                'name' => '410',
            ],
            16 => [
                'id_car_mark' => 223,
                'name' => '411',
            ],
            17 => [
                'id_car_mark' => 223,
                'name' => '412',
            ],
            18 => [
                'id_car_mark' => 223,
                'name' => '423',
            ],
            19 => [
                'id_car_mark' => 223,
                'name' => '426',
            ],
            20 => [
                'id_car_mark' => 223,
                'name' => '427',
            ],
            21 => [
                'id_car_mark' => 223,
                'name' => 'Дуэт',
            ],
            22 => [
                'id_car_mark' => 223,
                'name' => 'Иван Калита',
            ],
            23 => [
                'id_car_mark' => 223,
                'name' => 'Князь Владимир',
            ],
            24 => [
                'id_car_mark' => 223,
                'name' => 'Святогор',
            ],
            25 => [
                'id_car_mark' => 223,
                'name' => 'Юрий Долгорукий',
            ],
            26 => [
                'id_car_mark' => 224,
                'name' => 'С-3А',
            ],
            27 => [
                'id_car_mark' => 224,
                'name' => 'С-3Д',
            ],
            28 => [
                'id_car_mark' => 225,
                'name' => '1111 Ока',
            ],
            29 => [
                'id_car_mark' => 226,
                'name' => 'Aquila',
            ],
            30 => [
                'id_car_mark' => 226,
                'name' => 'C-30',
            ],
            31 => [
                'id_car_mark' => 226,
                'name' => 'C10',
            ],
            32 => [
                'id_car_mark' => 226,
                'name' => 'C190',
            ],
            33 => [
                'id_car_mark' => 226,
                'name' => 'Road Partner',
            ],
            34 => [
                'id_car_mark' => 226,
                'name' => 'Tager',
            ],
            35 => [
                'id_car_mark' => 226,
                'name' => 'Vega',
            ],
            36 => [
                'id_car_mark' => 227,
                'name' => '3151',
            ],
            37 => [
                'id_car_mark' => 227,
                'name' => '3153',
            ],
            38 => [
                'id_car_mark' => 227,
                'name' => '3160',
            ],
            39 => [
                'id_car_mark' => 227,
                'name' => '3162 Simbir',
            ],
            40 => [
                'id_car_mark' => 227,
                'name' => '469',
            ],
            41 => [
                'id_car_mark' => 227,
                'name' => 'Hunter',
            ],
            42 => [
                'id_car_mark' => 227,
                'name' => 'Patriot',
            ],
            43 => [
                'id_car_mark' => 227,
                'name' => 'Pickup',
            ],
            44 => [
                'id_car_mark' => 35,
                'name' => 'Traverse',
            ],
            45 => [
                'id_car_mark' => 35,
                'name' => 'Uplander',
            ],
            46 => [
                'id_car_mark' => 35,
                'name' => 'Van',
            ],
            47 => [
                'id_car_mark' => 35,
                'name' => 'Vectra',
            ],
            48 => [
                'id_car_mark' => 35,
                'name' => 'Venture',
            ],
            49 => [
                'id_car_mark' => 35,
                'name' => 'Viva',
            ],
            50 => [
                'id_car_mark' => 35,
                'name' => 'Volt',
            ],
            51 => [
                'id_car_mark' => 35,
                'name' => 'Zafira',
            ],
            52 => [
                'id_car_mark' => 52,
                'name' => 'S30',
            ],
            53 => [
                'id_car_mark' => 67,
                'name' => 'GC6',
            ],
            54 => [
                'id_car_mark' => 80,
                'name' => 'Q70',
            ],
            55 => [
                'id_car_mark' => 101,
            'name' => 'Celliya (530)',
            ],
            56 => [
                'id_car_mark' => 113,
                'name' => 'Xedos 6',
            ],
            57 => [
                'id_car_mark' => 113,
                'name' => 'Xedos 9',
            ],
            58 => [
                'id_car_mark' => 127,
                'name' => 'Pixo',
            ],
            59 => [
                'id_car_mark' => 127,
                'name' => 'Prairie',
            ],
            60 => [
                'id_car_mark' => 127,
                'name' => 'Presage',
            ],
            61 => [
                'id_car_mark' => 127,
                'name' => 'Presea',
            ],
            62 => [
                'id_car_mark' => 127,
                'name' => 'President',
            ],
            63 => [
                'id_car_mark' => 127,
                'name' => 'Primera',
            ],
            64 => [
                'id_car_mark' => 127,
                'name' => 'Pulsar',
            ],
            65 => [
                'id_car_mark' => 127,
                'name' => 'Qashqai',
            ],
            66 => [
                'id_car_mark' => 127,
                'name' => 'Quest',
            ],
            67 => [
                'id_car_mark' => 127,
                'name' => 'R\'nessa',
            ],
            68 => [
                'id_car_mark' => 127,
                'name' => 'Rasheen',
            ],
            69 => [
                'id_car_mark' => 127,
                'name' => 'Rogue',
            ],
            70 => [
                'id_car_mark' => 127,
                'name' => 'Roox',
            ],
            71 => [
                'id_car_mark' => 127,
                'name' => 'Safari',
            ],
            72 => [
                'id_car_mark' => 127,
                'name' => 'Sentra',
            ],
            73 => [
                'id_car_mark' => 127,
                'name' => 'Serena',
            ],
            74 => [
                'id_car_mark' => 127,
                'name' => 'Silvia',
            ],
            75 => [
                'id_car_mark' => 127,
                'name' => 'Skyline Crossover',
            ],
            76 => [
                'id_car_mark' => 127,
                'name' => 'Skyline',
            ],
            77 => [
                'id_car_mark' => 127,
                'name' => 'Stagea',
            ],
            78 => [
                'id_car_mark' => 127,
                'name' => 'Stanza',
            ],
            79 => [
                'id_car_mark' => 127,
                'name' => 'Sunny',
            ],
            80 => [
                'id_car_mark' => 127,
                'name' => 'Teana',
            ],
            81 => [
                'id_car_mark' => 127,
                'name' => 'Terrano',
            ],
            82 => [
                'id_car_mark' => 127,
                'name' => 'Terrano Regulus',
            ],
            83 => [
                'id_car_mark' => 127,
                'name' => 'Tiida',
            ],
            84 => [
                'id_car_mark' => 127,
                'name' => 'Tino',
            ],
            85 => [
                'id_car_mark' => 127,
                'name' => 'Titan',
            ],
            86 => [
                'id_car_mark' => 127,
                'name' => 'Vanette',
            ],
            87 => [
                'id_car_mark' => 127,
                'name' => 'Versa',
            ],
            88 => [
                'id_car_mark' => 127,
                'name' => 'Wingroad',
            ],
            89 => [
                'id_car_mark' => 127,
                'name' => 'X-Terra',
            ],
            90 => [
                'id_car_mark' => 127,
                'name' => 'X-Trail',
            ],
            91 => [
                'id_car_mark' => 176,
                'name' => 'LiteAce',
            ],
            92 => [
                'id_car_mark' => 176,
                'name' => 'Mark II',
            ],
            93 => [
                'id_car_mark' => 176,
                'name' => 'Mark X',
            ],
            94 => [
                'id_car_mark' => 176,
                'name' => 'Mark X ZiO',
            ],
            95 => [
                'id_car_mark' => 176,
                'name' => 'MasterAce Surf',
            ],
            96 => [
                'id_car_mark' => 176,
                'name' => 'Matrix',
            ],
            97 => [
                'id_car_mark' => 176,
                'name' => 'Mega Cruiser',
            ],
            98 => [
                'id_car_mark' => 176,
                'name' => 'MR2',
            ],
            99 => [
                'id_car_mark' => 176,
                'name' => 'Nadia',
            ],
            100 => [
                'id_car_mark' => 176,
                'name' => 'Noah',
            ],
            101 => [
                'id_car_mark' => 176,
                'name' => 'Opa',
            ],
            102 => [
                'id_car_mark' => 176,
                'name' => 'Origin',
            ],
            103 => [
                'id_car_mark' => 176,
                'name' => 'Paseo',
            ],
            104 => [
                'id_car_mark' => 176,
                'name' => 'Passo',
            ],
            105 => [
                'id_car_mark' => 176,
                'name' => 'Passo Sette',
            ],
            106 => [
                'id_car_mark' => 176,
                'name' => 'Picnic',
            ],
            107 => [
                'id_car_mark' => 176,
                'name' => 'Platz',
            ],
            108 => [
                'id_car_mark' => 176,
                'name' => 'Porte',
            ],
            109 => [
                'id_car_mark' => 176,
                'name' => 'Premio',
            ],
            110 => [
                'id_car_mark' => 176,
                'name' => 'Previa',
            ],
            111 => [
                'id_car_mark' => 176,
                'name' => 'Prius c',
            ],
            112 => [
                'id_car_mark' => 176,
                'name' => 'Prius',
            ],
            113 => [
                'id_car_mark' => 176,
                'name' => 'Probox',
            ],
            114 => [
                'id_car_mark' => 176,
                'name' => 'Progres',
            ],
            115 => [
                'id_car_mark' => 176,
                'name' => 'Pronard',
            ],
            116 => [
                'id_car_mark' => 176,
                'name' => 'Ractis',
            ],
            117 => [
                'id_car_mark' => 176,
                'name' => 'Raum',
            ],
            118 => [
                'id_car_mark' => 176,
                'name' => 'RAV 4',
            ],
            119 => [
                'id_car_mark' => 176,
                'name' => 'Regius',
            ],
            120 => [
                'id_car_mark' => 176,
                'name' => 'RegiusAce',
            ],
            121 => [
                'id_car_mark' => 176,
                'name' => 'Rush',
            ],
            122 => [
                'id_car_mark' => 176,
                'name' => 'Sai',
            ],
            123 => [
                'id_car_mark' => 176,
                'name' => 'Scepter',
            ],
            124 => [
                'id_car_mark' => 176,
                'name' => 'Sequoia',
            ],
            125 => [
                'id_car_mark' => 176,
                'name' => 'Sera',
            ],
            126 => [
                'id_car_mark' => 176,
                'name' => 'Sienna',
            ],
            127 => [
                'id_car_mark' => 176,
                'name' => 'Sienta',
            ],
            128 => [
                'id_car_mark' => 176,
                'name' => 'Soarer',
            ],
            129 => [
                'id_car_mark' => 176,
                'name' => 'Soluna',
            ],
            130 => [
                'id_car_mark' => 176,
                'name' => 'Sparky',
            ],
            131 => [
                'id_car_mark' => 176,
                'name' => 'Sprinter Carib',
            ],
            132 => [
                'id_car_mark' => 176,
                'name' => 'Sprinter Marino',
            ],
            133 => [
                'id_car_mark' => 176,
                'name' => 'Sprinter Trueno',
            ],
            134 => [
                'id_car_mark' => 176,
                'name' => 'Sprinter',
            ],
            135 => [
                'id_car_mark' => 176,
                'name' => 'Starlet',
            ],
            136 => [
                'id_car_mark' => 176,
                'name' => 'Succeed',
            ],
            137 => [
                'id_car_mark' => 176,
                'name' => 'Supra',
            ],
            138 => [
                'id_car_mark' => 176,
                'name' => 'Tacoma',
            ],
            139 => [
                'id_car_mark' => 176,
                'name' => 'Tercel',
            ],
            140 => [
                'id_car_mark' => 176,
                'name' => 'TownAce',
            ],
            141 => [
                'id_car_mark' => 176,
                'name' => 'Tundra',
            ],
            142 => [
                'id_car_mark' => 176,
                'name' => 'Urban Cruiser',
            ],
            143 => [
                'id_car_mark' => 176,
                'name' => 'Vanguard',
            ],
            144 => [
                'id_car_mark' => 176,
                'name' => 'Vellfire',
            ],
            145 => [
                'id_car_mark' => 176,
                'name' => 'Venza',
            ],
            146 => [
                'id_car_mark' => 176,
                'name' => 'Verossa',
            ],
            147 => [
                'id_car_mark' => 176,
                'name' => 'Verso',
            ],
            148 => [
                'id_car_mark' => 176,
                'name' => 'Verso-S',
            ],
            149 => [
                'id_car_mark' => 176,
                'name' => 'Vios',
            ],
            150 => [
                'id_car_mark' => 176,
                'name' => 'Vista',
            ],
            151 => [
                'id_car_mark' => 176,
                'name' => 'Vitz',
            ],
            152 => [
                'id_car_mark' => 176,
                'name' => 'Voltz',
            ],
            153 => [
                'id_car_mark' => 176,
                'name' => 'Voxy',
            ],
            154 => [
                'id_car_mark' => 176,
                'name' => 'WiLL Cypha',
            ],
            155 => [
                'id_car_mark' => 176,
                'name' => 'WiLL',
            ],
            156 => [
                'id_car_mark' => 176,
                'name' => 'Windom',
            ],
            157 => [
                'id_car_mark' => 176,
                'name' => 'Wish',
            ],
            158 => [
                'id_car_mark' => 176,
                'name' => 'Yaris',
            ],
            159 => [
                'id_car_mark' => 176,
                'name' => 'Yaris Verso',
            ],
            160 => [
                'id_car_mark' => 28,
                'name' => 'ELR',
            ],
            161 => [
                'id_car_mark' => 35,
                'name' => 'Silverado',
            ],
            162 => [
                'id_car_mark' => 37,
                'name' => 'Jumpy',
            ],
            163 => [
                'id_car_mark' => 61,
                'name' => 'Scudo',
            ],
            164 => [
                'id_car_mark' => 63,
                'name' => 'Bronco II',
            ],
            165 => [
                'id_car_mark' => 76,
                'name' => 'Vezel',
            ],
            166 => [
                'id_car_mark' => 116,
                'name' => 'Vito',
            ],
            167 => [
                'id_car_mark' => 127,
                'name' => 'Primastar',
            ],
            168 => [
                'id_car_mark' => 130,
                'name' => 'Vivaro',
            ],
            169 => [
                'id_car_mark' => 135,
                'name' => '108',
            ],
            170 => [
                'id_car_mark' => 135,
                'name' => 'Expert',
            ],
            171 => [
                'id_car_mark' => 147,
                'name' => 'Trafic',
            ],
            172 => [
                'id_car_mark' => 166,
                'name' => 'WRX',
            ],
            173 => [
                'id_car_mark' => 167,
                'name' => 'Celerio',
            ],
            174 => [
                'id_car_mark' => 184,
                'name' => 'Amarok',
            ],
            175 => [
                'id_car_mark' => 184,
                'name' => 'California',
            ],
            176 => [
                'id_car_mark' => 184,
                'name' => 'Caravelle',
            ],
            177 => [
                'id_car_mark' => 184,
                'name' => 'Transporter',
            ],
            178 => [
                'id_car_mark' => 26,
                'name' => 'F5',
            ],
            179 => [
                'id_car_mark' => 47,
                'name' => 'Urvan',
            ],
            180 => [
                'id_car_mark' => 63,
                'name' => 'Tourneo Custom',
            ],
            181 => [
                'id_car_mark' => 79,
                'name' => 'Grace',
            ],
            182 => [
                'id_car_mark' => 114,
                'name' => '650S',
            ],
            183 => [
                'id_car_mark' => 123,
                'name' => 'Minicab',
            ],
            184 => [
                'id_car_mark' => 127,
                'name' => 'Caravan',
            ],
            185 => [
                'id_car_mark' => 127,
                'name' => 'NV350 Caravan',
            ],
            186 => [
                'id_car_mark' => 127,
                'name' => 'Urvan',
            ],
            187 => [
                'id_car_mark' => 135,
                'name' => 'Bipper',
            ],
            188 => [
                'id_car_mark' => 32,
                'name' => 'CM-8',
            ],
            189 => [
                'id_car_mark' => 34,
            'name' => 'M11 (A3)',
            ],
            190 => [
                'id_car_mark' => 80,
                'name' => 'Q40',
            ],
            191 => [
                'id_car_mark' => 167,
                'name' => 'Vitara',
            ],
            192 => [
                'id_car_mark' => 25,
                'name' => 'Encore',
            ],
            193 => [
                'id_car_mark' => 34,
            'name' => 'Bonus 3 (E3/A19)',
            ],
            194 => [
                'id_car_mark' => 34,
                'name' => 'Tiggo 5',
            ],
            195 => [
                'id_car_mark' => 35,
                'name' => 'SS',
            ],
            196 => [
                'id_car_mark' => 51,
                'name' => 'Lancer',
            ],
            197 => [
                'id_car_mark' => 59,
                'name' => 'Besturn X80',
            ],
            198 => [
                'id_car_mark' => 67,
                'name' => 'SC7',
            ],
            199 => [
                'id_car_mark' => 95,
                'name' => 'Sesto Elemento',
            ],
            200 => [
                'id_car_mark' => 99,
                'name' => 'NX',
            ],
            201 => [
                'id_car_mark' => 280,
                'name' => 'GTR',
            ],
            202 => [
                'id_car_mark' => 2,
                'name' => 'TLX',
            ],
            203 => [
                'id_car_mark' => 3,
                'name' => 'Disco Volante',
            ],
            204 => [
                'id_car_mark' => 47,
                'name' => 'mi-DO',
            ],
            205 => [
                'id_car_mark' => 89,
                'name' => 'Renegade',
            ],
            206 => [
                'id_car_mark' => 101,
                'name' => 'Smily',
            ],
            207 => [
                'id_car_mark' => 282,
                'name' => 'Boliger',
            ],
            208 => [
                'id_car_mark' => 284,
                'name' => 'Tropica Roadster',
            ],
            209 => [
                'id_car_mark' => 10,
                'name' => 'TT RS',
            ],
            210 => [
                'id_car_mark' => 10,
                'name' => 'TTS',
            ],
            211 => [
                'id_car_mark' => 63,
                'name' => 'Tourneo Courier',
            ],
            212 => [
                'id_car_mark' => 71,
                'name' => 'Hover H3',
            ],
            213 => [
                'id_car_mark' => 71,
                'name' => 'Hover H5',
            ],
            214 => [
                'id_car_mark' => 71,
                'name' => 'Hover H6',
            ],
            215 => [
                'id_car_mark' => 101,
                'name' => 'Solano',
            ],
            216 => [
                'id_car_mark' => 116,
                'name' => 'AMG GT',
            ],
            217 => [
                'id_car_mark' => 165,
                'name' => 'Korando Sports',
            ],
            218 => [
                'id_car_mark' => 176,
                'name' => 'ProAce',
            ],
            219 => [
                'id_car_mark' => 79,
                'name' => 'Aslan',
            ],
            220 => [
                'id_car_mark' => 88,
                'name' => 'XE',
            ],
            221 => [
                'id_car_mark' => 97,
                'name' => 'Discovery Sport',
            ],
            222 => [
                'id_car_mark' => 289,
                'name' => 'Roadster',
            ],
            223 => [
                'id_car_mark' => 290,
                'name' => 'H6',
            ],
            224 => [
                'id_car_mark' => 21,
                'name' => 'H530',
            ],
            225 => [
                'id_car_mark' => 34,
                'name' => 'Arrizo 7',
            ],
            226 => [
                'id_car_mark' => 61,
                'name' => '500X',
            ],
            227 => [
                'id_car_mark' => 63,
            'name' => 'Focus (North America)',
            ],
            228 => [
                'id_car_mark' => 147,
                'name' => 'Dokker',
            ],
            229 => [
                'id_car_mark' => 147,
                'name' => 'Lodgy',
            ],
            230 => [
                'id_car_mark' => 291,
                'name' => 'B10',
            ],
            231 => [
                'id_car_mark' => 291,
                'name' => 'B11',
            ],
            232 => [
                'id_car_mark' => 291,
                'name' => 'B12',
            ],
            233 => [
                'id_car_mark' => 291,
                'name' => 'B3',
            ],
            234 => [
                'id_car_mark' => 291,
                'name' => 'B4',
            ],
            235 => [
                'id_car_mark' => 291,
                'name' => 'B5',
            ],
            236 => [
                'id_car_mark' => 291,
                'name' => 'B6',
            ],
            237 => [
                'id_car_mark' => 291,
                'name' => 'B7',
            ],
            238 => [
                'id_car_mark' => 291,
                'name' => 'B8',
            ],
            239 => [
                'id_car_mark' => 291,
                'name' => 'B9',
            ],
            240 => [
                'id_car_mark' => 291,
                'name' => 'C1',
            ],
            241 => [
                'id_car_mark' => 291,
                'name' => 'C2',
            ],
            242 => [
                'id_car_mark' => 291,
                'name' => 'D10',
            ],
            243 => [
                'id_car_mark' => 291,
                'name' => 'D3',
            ],
            244 => [
                'id_car_mark' => 291,
                'name' => 'D5',
            ],
            245 => [
                'id_car_mark' => 291,
                'name' => 'Roadster',
            ],
            246 => [
                'id_car_mark' => 291,
                'name' => 'XD3',
            ],
            247 => [
                'id_car_mark' => 18,
                'name' => '1M',
            ],
            248 => [
                'id_car_mark' => 18,
                'name' => 'M3',
            ],
            249 => [
                'id_car_mark' => 18,
                'name' => 'M4',
            ],
            250 => [
                'id_car_mark' => 18,
                'name' => 'M5',
            ],
            251 => [
                'id_car_mark' => 18,
                'name' => 'M6',
            ],
            252 => [
                'id_car_mark' => 18,
                'name' => 'X5 M',
            ],
            253 => [
                'id_car_mark' => 18,
                'name' => 'X6 M',
            ],
            254 => [
                'id_car_mark' => 18,
                'name' => 'Z3 M',
            ],
            255 => [
                'id_car_mark' => 18,
                'name' => 'Z4 M',
            ],
            256 => [
                'id_car_mark' => 28,
                'name' => 'CTS-V',
            ],
            257 => [
                'id_car_mark' => 36,
                'name' => '300C SRT8',
            ],
            258 => [
                'id_car_mark' => 63,
                'name' => 'Fiesta ST',
            ],
            259 => [
                'id_car_mark' => 63,
                'name' => 'Focus RS',
            ],
            260 => [
                'id_car_mark' => 63,
                'name' => 'Focus ST',
            ],
            261 => [
                'id_car_mark' => 63,
                'name' => 'Mondeo ST',
            ],
            262 => [
                'id_car_mark' => 76,
                'name' => 'Civic Type R',
            ],
            263 => [
                'id_car_mark' => 88,
                'name' => 'XFR',
            ],
            264 => [
                'id_car_mark' => 88,
                'name' => 'XKR',
            ],
            265 => [
                'id_car_mark' => 89,
                'name' => 'Grand Cherokee SRT8',
            ],
            266 => [
                'id_car_mark' => 92,
                'name' => 'Cee\'d GT',
            ],
            267 => [
                'id_car_mark' => 99,
                'name' => 'IS F',
            ],
            268 => [
                'id_car_mark' => 99,
                'name' => 'RC F',
            ],
            269 => [
                'id_car_mark' => 113,
                'name' => '3 MPS',
            ],
            270 => [
                'id_car_mark' => 113,
                'name' => '6 MPS',
            ],
            271 => [
                'id_car_mark' => 116,
                'name' => 'A-klasse AMG',
            ],
            272 => [
                'id_car_mark' => 116,
                'name' => 'C-klasse AMG',
            ],
            273 => [
                'id_car_mark' => 116,
                'name' => 'CL-klasse AMG',
            ],
            274 => [
                'id_car_mark' => 116,
                'name' => 'CLA-klasse AMG',
            ],
            275 => [
                'id_car_mark' => 116,
                'name' => 'CLK-klasse AMG',
            ],
            276 => [
                'id_car_mark' => 116,
                'name' => 'CLS-klasse AMG',
            ],
            277 => [
                'id_car_mark' => 116,
                'name' => 'E-klasse AMG',
            ],
            278 => [
                'id_car_mark' => 116,
                'name' => 'G-klasse AMG 6x6',
            ],
            279 => [
                'id_car_mark' => 116,
                'name' => 'G-klasse AMG',
            ],
            280 => [
                'id_car_mark' => 116,
                'name' => 'GLA-klasse AMG',
            ],
            281 => [
                'id_car_mark' => 116,
                'name' => 'M-klasse AMG',
            ],
            282 => [
                'id_car_mark' => 116,
                'name' => 'Maybach S-klasse',
            ],
            283 => [
                'id_car_mark' => 116,
                'name' => 'R-klasse AMG',
            ],
            284 => [
                'id_car_mark' => 116,
                'name' => 'S-klasse AMG',
            ],
            285 => [
                'id_car_mark' => 116,
                'name' => 'SL-klasse AMG',
            ],
            286 => [
                'id_car_mark' => 116,
                'name' => 'SLK-klasse AMG',
            ],
            287 => [
                'id_car_mark' => 130,
                'name' => 'Astra OPC',
            ],
            288 => [
                'id_car_mark' => 130,
                'name' => 'Corsa OPC',
            ],
            289 => [
                'id_car_mark' => 130,
                'name' => 'Insignia OPC',
            ],
            290 => [
                'id_car_mark' => 130,
                'name' => 'Meriva OPC',
            ],
            291 => [
                'id_car_mark' => 130,
                'name' => 'Vectra OPC',
            ],
            292 => [
                'id_car_mark' => 130,
                'name' => 'Zafira OPC',
            ],
            293 => [
                'id_car_mark' => 139,
                'name' => '911 GT2',
            ],
            294 => [
                'id_car_mark' => 139,
                'name' => '911 GT3',
            ],
            295 => [
                'id_car_mark' => 147,
                'name' => 'Clio RS',
            ],
            296 => [
                'id_car_mark' => 147,
                'name' => 'Clio V6',
            ],
            297 => [
                'id_car_mark' => 147,
                'name' => 'Megane RS',
            ],
            298 => [
                'id_car_mark' => 151,
                'name' => 'Streetwise',
            ],
            299 => [
                'id_car_mark' => 157,
                'name' => 'Ibiza Cupra',
            ],
            300 => [
                'id_car_mark' => 157,
                'name' => 'Leon Cupra',
            ],
            301 => [
                'id_car_mark' => 159,
                'name' => 'Fabia RS',
            ],
            302 => [
                'id_car_mark' => 159,
                'name' => 'Octavia RS',
            ],
            303 => [
                'id_car_mark' => 166,
                'name' => 'Impreza WRX',
            ],
            304 => [
                'id_car_mark' => 167,
                'name' => 'Samurai',
            ],
            305 => [
                'id_car_mark' => 176,
            'name' => 'Camry (Japan)',
            ],
            306 => [
                'id_car_mark' => 176,
                'name' => 'Camry Solara',
            ],
            307 => [
                'id_car_mark' => 176,
                'name' => 'Corolla Spacio',
            ],
            308 => [
                'id_car_mark' => 176,
                'name' => 'Corolla Verso',
            ],
            309 => [
                'id_car_mark' => 184,
                'name' => 'Golf GTI',
            ],
            310 => [
                'id_car_mark' => 184,
                'name' => 'Golf R',
            ],
            311 => [
                'id_car_mark' => 184,
                'name' => 'Lupo GTI',
            ],
            312 => [
                'id_car_mark' => 184,
                'name' => 'Polo GTI',
            ],
            313 => [
                'id_car_mark' => 184,
                'name' => 'Polo R WRC',
            ],
            314 => [
                'id_car_mark' => 184,
                'name' => 'Scirocco R',
            ],
            315 => [
                'id_car_mark' => 37,
                'name' => 'C-ZERO',
            ],
            316 => [
                'id_car_mark' => 135,
                'name' => '205 GTi',
            ],
            317 => [
                'id_car_mark' => 135,
                'name' => '208 GTi',
            ],
            318 => [
                'id_car_mark' => 135,
                'name' => 'iOn',
            ],
            319 => [
                'id_car_mark' => 139,
                'name' => '918 Spyder',
            ],
            320 => [
                'id_car_mark' => 157,
                'name' => 'Mii',
            ],
            321 => [
                'id_car_mark' => 85,
                'name' => 'MU-X',
            ],
            322 => [
                'id_car_mark' => 166,
                'name' => 'Impreza WRX STi',
            ],
            323 => [
                'id_car_mark' => 166,
                'name' => 'WRX STi',
            ],
            324 => [
                'id_car_mark' => 71,
                'name' => 'Voleex C30',
            ],
            325 => [
                'id_car_mark' => 166,
                'name' => 'Levorg',
            ],
            326 => [
                'id_car_mark' => 176,
            'name' => 'Prius v (+)',
            ],
            327 => [
                'id_car_mark' => 116,
                'name' => 'GL-klasse AMG',
            ],
            328 => [
                'id_car_mark' => 116,
                'name' => 'V-klasse',
            ],
            329 => [
                'id_car_mark' => 88,
                'name' => 'XJR',
            ],
            330 => [
                'id_car_mark' => 24,
                'name' => 'EB Veyron 16.4',
            ],
            331 => [
                'id_car_mark' => 75,
                'name' => 'Statesman',
            ],
            332 => [
                'id_car_mark' => 98,
                'name' => 'Х9',
            ],
            333 => [
                'id_car_mark' => 116,
                'name' => 'AMG GLE',
            ],
            334 => [
                'id_car_mark' => 116,
                'name' => 'AMG GLE Coupe',
            ],
            335 => [
                'id_car_mark' => 116,
                'name' => 'GLE',
            ],
            336 => [
                'id_car_mark' => 116,
                'name' => 'GLE Coupe',
            ],
            337 => [
                'id_car_mark' => 123,
                'name' => 'Lancer Ralliart',
            ],
            338 => [
                'id_car_mark' => 176,
                'name' => 'GT86',
            ],
            339 => [
                'id_car_mark' => 185,
                'name' => 'V40 Cross Country',
            ],
            340 => [
                'id_car_mark' => 193,
                'name' => 'Grand Tiger',
            ],
            341 => [
                'id_car_mark' => 211,
                'name' => 'Ё-Кроссовер',
            ],
            342 => [
                'id_car_mark' => 227,
                'name' => '3159',
            ],
            343 => [
                'id_car_mark' => 3589,
                'name' => '5',
            ],
            344 => [
                'id_car_mark' => 25,
                'name' => 'Estate Wagon',
            ],
            345 => [
                'id_car_mark' => 25,
                'name' => 'Verano',
            ],
            346 => [
                'id_car_mark' => 28,
                'name' => 'ATS-V',
            ],
            347 => [
                'id_car_mark' => 60,
                'name' => '488 GTB',
            ],
            348 => [
                'id_car_mark' => 63,
                'name' => 'Explorer Sport Trac',
            ],
            349 => [
                'id_car_mark' => 63,
                'name' => 'Spectron',
            ],
            350 => [
                'id_car_mark' => 63,
                'name' => 'Telstar',
            ],
            351 => [
                'id_car_mark' => 67,
                'name' => 'GC9',
            ],
            352 => [
                'id_car_mark' => 114,
                'name' => '540C',
            ],
            353 => [
                'id_car_mark' => 114,
                'name' => '570S',
            ],
            354 => [
                'id_car_mark' => 127,
                'name' => 'Juke Nismo',
            ],
            355 => [
                'id_car_mark' => 127,
                'name' => 'Qashqai+2',
            ],
            356 => [
                'id_car_mark' => 130,
                'name' => 'Karl',
            ],
            357 => [
                'id_car_mark' => 139,
                'name' => 'Cayman GT4',
            ],
            358 => [
                'id_car_mark' => 185,
                'name' => 'S60 Cross Country',
            ],
            359 => [
                'id_car_mark' => 185,
                'name' => 'V60 Cross Country',
            ],
            360 => [
                'id_car_mark' => 290,
                'name' => 'H2',
            ],
            361 => [
                'id_car_mark' => 290,
                'name' => 'H8',
            ],
            362 => [
                'id_car_mark' => 3591,
                'name' => 'ST1',
            ],
            363 => [
                'id_car_mark' => 3590,
                'name' => 'Cevennes',
            ],
            364 => [
                'id_car_mark' => 3590,
                'name' => 'Hemera',
            ],
            365 => [
                'id_car_mark' => 3590,
                'name' => 'Speedster II',
            ],
            366 => [
                'id_car_mark' => 3589,
                'name' => '3',
            ],
            367 => [
                'id_car_mark' => 3589,
                'name' => '4',
            ],
            368 => [
                'id_car_mark' => 21,
                'name' => 'H230',
            ],
            369 => [
                'id_car_mark' => 123,
                'name' => 'Attrage',
            ],
            370 => [
                'id_car_mark' => 147,
                'name' => 'Kadjar',
            ],
            371 => [
                'id_car_mark' => 165,
                'name' => 'Nomad',
            ],
            372 => [
                'id_car_mark' => 3619,
                'name' => 'Beast',
            ],
            373 => [
                'id_car_mark' => 101,
                'name' => 'X50',
            ],
            374 => [
                'id_car_mark' => 3620,
                'name' => 'Concept_One',
            ],
            375 => [
                'id_car_mark' => 18,
                'name' => '2er Grand Tourer',
            ],
            376 => [
                'id_car_mark' => 113,
                'name' => 'CX-3',
            ],
            377 => [
                'id_car_mark' => 116,
                'name' => 'GLC-klasse',
            ],
            378 => [
                'id_car_mark' => 135,
                'name' => '308 GTi',
            ],
            379 => [
                'id_car_mark' => 156,
                'name' => 'iM',
            ],
            380 => [
                'id_car_mark' => 165,
                'name' => 'Tivoli',
            ],
            381 => [
                'id_car_mark' => 215,
                'name' => 'Vesta',
            ],
            382 => [
                'id_car_mark' => 215,
                'name' => 'XRAY',
            ],
            383 => [
                'id_car_mark' => 290,
                'name' => 'H9',
            ],
            384 => [
                'id_car_mark' => 147,
                'name' => 'Talisman',
            ],
            385 => [
                'id_car_mark' => 3,
                'name' => '2600',
            ],
            386 => [
                'id_car_mark' => 10,
                'name' => '920',
            ],
            387 => [
                'id_car_mark' => 15,
                'name' => 'S',
            ],
            388 => [
                'id_car_mark' => 18,
                'name' => '2000 C/CS',
            ],
            389 => [
                'id_car_mark' => 18,
                'name' => '315',
            ],
            390 => [
                'id_car_mark' => 18,
                'name' => '321',
            ],
            391 => [
                'id_car_mark' => 18,
                'name' => '326',
            ],
            392 => [
                'id_car_mark' => 18,
                'name' => '340',
            ],
            393 => [
                'id_car_mark' => 25,
                'name' => 'Skyhawk',
            ],
            394 => [
                'id_car_mark' => 25,
                'name' => 'Special',
            ],
            395 => [
                'id_car_mark' => 25,
                'name' => 'Super',
            ],
            396 => [
                'id_car_mark' => 28,
                'name' => 'Series 62',
            ],
            397 => [
                'id_car_mark' => 35,
                'name' => 'El Camino',
            ],
            398 => [
                'id_car_mark' => 35,
                'name' => 'Master',
            ],
            399 => [
                'id_car_mark' => 35,
                'name' => 'Special DeLuxe',
            ],
            400 => [
                'id_car_mark' => 37,
                'name' => 'Traction Avant',
            ],
            401 => [
                'id_car_mark' => 44,
                'name' => 'Midget II',
            ],
            402 => [
                'id_car_mark' => 51,
                'name' => 'WC',
            ],
            403 => [
                'id_car_mark' => 63,
                'name' => 'Galaxie',
            ],
            404 => [
                'id_car_mark' => 63,
                'name' => 'Model A',
            ],
            405 => [
                'id_car_mark' => 63,
                'name' => 'Model T',
            ],
            406 => [
                'id_car_mark' => 63,
                'name' => 'Torino',
            ],
            407 => [
                'id_car_mark' => 73,
                'name' => 'S5',
            ],
            408 => [
                'id_car_mark' => 87,
                'name' => 'S3',
            ],
            409 => [
                'id_car_mark' => 93,
                'name' => 'Regera',
            ],
            410 => [
                'id_car_mark' => 113,
                'name' => 'Cosmo',
            ],
            411 => [
                'id_car_mark' => 116,
                'name' => '190 SL',
            ],
            412 => [
                'id_car_mark' => 116,
                'name' => 'W100',
            ],
            413 => [
                'id_car_mark' => 116,
                'name' => 'W110',
            ],
            414 => [
                'id_car_mark' => 116,
                'name' => 'W136',
            ],
            415 => [
                'id_car_mark' => 116,
                'name' => 'W189',
            ],
            416 => [
                'id_car_mark' => 130,
                'name' => 'Olympia',
            ],
            417 => [
                'id_car_mark' => 137,
                'name' => 'Barracuda',
            ],
            418 => [
                'id_car_mark' => 137,
                'name' => 'Fury',
            ],
            419 => [
                'id_car_mark' => 137,
                'name' => 'Road Runner',
            ],
            420 => [
                'id_car_mark' => 137,
                'name' => 'Valiant',
            ],
            421 => [
                'id_car_mark' => 139,
                'name' => '356',
            ],
            422 => [
                'id_car_mark' => 149,
                'name' => 'Silver Cloud',
            ],
            423 => [
                'id_car_mark' => 149,
                'name' => 'Silver Shadow',
            ],
            424 => [
                'id_car_mark' => 149,
                'name' => 'Silver Wraith',
            ],
            425 => [
                'id_car_mark' => 156,
                'name' => 'iA',
            ],
            426 => [
                'id_car_mark' => 170,
                'name' => '57',
            ],
            427 => [
                'id_car_mark' => 184,
                'name' => 'Karmann-Ghia',
            ],
            428 => [
                'id_car_mark' => 184,
                'name' => 'Type 2',
            ],
            429 => [
                'id_car_mark' => 185,
                'name' => '120 Series',
            ],
            430 => [
                'id_car_mark' => 192,
                'name' => 'T600',
            ],
            431 => [
                'id_car_mark' => 192,
                'name' => 'Z300',
            ],
            432 => [
                'id_car_mark' => 215,
                'name' => 'EL Lada',
            ],
            433 => [
                'id_car_mark' => 216,
                'name' => 'М-72',
            ],
            434 => [
                'id_car_mark' => 3664,
                'name' => 'Trumpf Junior',
            ],
            435 => [
                'id_car_mark' => 3665,
                'name' => 'Firedome',
            ],
            436 => [
                'id_car_mark' => 3665,
                'name' => 'Fireflite',
            ],
            437 => [
                'id_car_mark' => 3666,
                'name' => 'Clipper',
            ],
            438 => [
                'id_car_mark' => 3666,
                'name' => 'One-Twenty',
            ],
            439 => [
                'id_car_mark' => 3666,
                'name' => 'Twelve',
            ],
            440 => [
                'id_car_mark' => 3667,
                'name' => 'MB',
            ],
            441 => [
                'id_car_mark' => 3668,
                'name' => 'Т98',
            ],
            442 => [
                'id_car_mark' => 8,
                'name' => 'Topic',
            ],
            443 => [
                'id_car_mark' => 15,
                'name' => 'Bentayga',
            ],
            444 => [
                'id_car_mark' => 36,
                'name' => 'Imperial Crown',
            ],
            445 => [
                'id_car_mark' => 80,
                'name' => 'Q30',
            ],
            446 => [
                'id_car_mark' => 87,
            'name' => 'J4 (Heyue A30)',
            ],
            447 => [
                'id_car_mark' => 87,
                'name' => 'M5',
            ],
            448 => [
                'id_car_mark' => 88,
                'name' => 'F-Pace',
            ],
            449 => [
                'id_car_mark' => 116,
                'name' => 'W121',
            ],
            450 => [
                'id_car_mark' => 123,
                'name' => 'Jeep J',
            ],
            451 => [
                'id_car_mark' => 147,
                'name' => 'Sandero RS',
            ],
            452 => [
                'id_car_mark' => 149,
                'name' => 'Dawn',
            ],
            453 => [
                'id_car_mark' => 216,
                'name' => '12 ЗИМ',
            ],
            454 => [
                'id_car_mark' => 3676,
                'name' => '2000',
            ],
            455 => [
                'id_car_mark' => 3,
                'name' => '105/115',
            ],
            456 => [
                'id_car_mark' => 18,
                'name' => 'M2',
            ],
            457 => [
                'id_car_mark' => 28,
                'name' => 'CT6',
            ],
            458 => [
                'id_car_mark' => 63,
                'name' => 'Custom',
            ],
            459 => [
                'id_car_mark' => 116,
                'name' => 'W120',
            ],
            460 => [
                'id_car_mark' => 147,
                'name' => 'KWID',
            ],
            461 => [
                'id_car_mark' => 172,
                'name' => 'Model X',
            ],
            462 => [
                'id_car_mark' => 176,
                'name' => 'Mirai',
            ],
            463 => [
                'id_car_mark' => 179,
                'name' => 'TR6',
            ],
            464 => [
                'id_car_mark' => 184,
                'name' => 'Type 1',
            ],
            465 => [
                'id_car_mark' => 216,
                'name' => '67',
            ],
            466 => [
                'id_car_mark' => 3689,
                'name' => 'Gentra',
            ],
            467 => [
                'id_car_mark' => 3689,
                'name' => 'Matiz',
            ],
            468 => [
                'id_car_mark' => 3690,
                'name' => '110',
            ],
            469 => [
                'id_car_mark' => 76,
                'name' => 'Acty',
            ],
            470 => [
                'id_car_mark' => 214,
                'name' => 'Фора',
            ],
            471 => [
                'id_car_mark' => 3689,
                'name' => 'Nexia R3',
            ],
            472 => [
                'id_car_mark' => 9,
                'name' => 'DB5',
            ],
            473 => [
                'id_car_mark' => 25,
                'name' => 'Limited',
            ],
            474 => [
                'id_car_mark' => 28,
                'name' => 'XT5',
            ],
            475 => [
                'id_car_mark' => 63,
                'name' => 'Fairlane',
            ],
            476 => [
                'id_car_mark' => 116,
                'name' => 'GLS-klasse',
            ],
            477 => [
                'id_car_mark' => 116,
                'name' => 'GLS-klasse AMG',
            ],
            478 => [
                'id_car_mark' => 116,
                'name' => 'W108',
            ],
            479 => [
                'id_car_mark' => 176,
                'name' => '2000GT',
            ],
            480 => [
                'id_car_mark' => 179,
                'name' => 'Stag',
            ],
            481 => [
                'id_car_mark' => 3705,
                'name' => 'Hornet',
            ],
            482 => [
                'id_car_mark' => 3706,
                'name' => 'E10',
            ],
            483 => [
                'id_car_mark' => 44,
                'name' => 'Move Latte',
            ],
            484 => [
                'id_car_mark' => 61,
                'name' => '508',
            ],
            485 => [
                'id_car_mark' => 63,
                'name' => 'Ranchero',
            ],
            486 => [
                'id_car_mark' => 80,
                'name' => 'QX30',
            ],
            487 => [
                'id_car_mark' => 129,
                'name' => 'Toronado',
            ],
            488 => [
                'id_car_mark' => 3728,
                'name' => 'Fenyr Supersport',
            ],
            489 => [
                'id_car_mark' => 3728,
                'name' => 'Lykan Hypersport',
            ],
            490 => [
                'id_car_mark' => 37,
                'name' => 'DS',
            ],
            491 => [
                'id_car_mark' => 37,
                'name' => 'SM',
            ],
            492 => [
                'id_car_mark' => 60,
                'name' => 'FXX K',
            ],
            493 => [
                'id_car_mark' => 114,
                'name' => '675LT',
            ],
            494 => [
                'id_car_mark' => 10,
                'name' => 'F103',
            ],
            495 => [
                'id_car_mark' => 10,
                'name' => 'Typ R',
            ],
            496 => [
                'id_car_mark' => 15,
                'name' => 'Mark VI',
            ],
            497 => [
                'id_car_mark' => 15,
                'name' => 'R Type',
            ],
            498 => [
                'id_car_mark' => 15,
                'name' => 'T-Series',
            ],
            499 => [
                'id_car_mark' => 18,
                'name' => '3/15',
            ],
        ]);
        \DB::table('car_models')->insert([
            0 => [
                'id_car_mark' => 18,
                'name' => '3200',
            ],
            1 => [
                'id_car_mark' => 18,
                'name' => '327',
            ],
            2 => [
                'id_car_mark' => 18,
                'name' => '501',
            ],
            3 => [
                'id_car_mark' => 18,
                'name' => '502',
            ],
            4 => [
                'id_car_mark' => 18,
                'name' => '503',
            ],
            5 => [
                'id_car_mark' => 18,
                'name' => '507',
            ],
            6 => [
                'id_car_mark' => 18,
                'name' => 'New Class',
            ],
            7 => [
                'id_car_mark' => 25,
                'name' => 'Envision',
            ],
            8 => [
                'id_car_mark' => 35,
                'name' => 'Bolt',
            ],
            9 => [
                'id_car_mark' => 76,
                'name' => 'Ascot Innova',
            ],
            10 => [
                'id_car_mark' => 99,
                'name' => 'LC',
            ],
            11 => [
                'id_car_mark' => 113,
                'name' => 'Eunos 100',
            ],
            12 => [
                'id_car_mark' => 116,
                'name' => 'SLC-klasse AMG',
            ],
            13 => [
                'id_car_mark' => 116,
                'name' => 'SLC-klasse',
            ],
            14 => [
                'id_car_mark' => 116,
                'name' => 'W111',
            ],
            15 => [
                'id_car_mark' => 116,
                'name' => 'W128',
            ],
            16 => [
                'id_car_mark' => 116,
                'name' => 'W186',
            ],
            17 => [
                'id_car_mark' => 135,
                'name' => '402',
            ],
            18 => [
                'id_car_mark' => 167,
                'name' => 'Twin',
            ],
            19 => [
                'id_car_mark' => 176,
                'name' => 'Pixis Epoch',
            ],
            20 => [
                'id_car_mark' => 176,
                'name' => 'Pixis Mega',
            ],
            21 => [
                'id_car_mark' => 176,
                'name' => 'Pixis Space',
            ],
            22 => [
                'id_car_mark' => 184,
                'name' => 'Golf R32',
            ],
            23 => [
                'id_car_mark' => 192,
                'name' => 'Z100',
            ],
            24 => [
                'id_car_mark' => 223,
                'name' => '424',
            ],
            25 => [
                'id_car_mark' => 3739,
                'name' => 'Deluxe Eight',
            ],
            26 => [
                'id_car_mark' => 3,
                'name' => '1900',
            ],
            27 => [
                'id_car_mark' => 3,
                'name' => '6C',
            ],
            28 => [
                'id_car_mark' => 18,
                'name' => '600',
            ],
            29 => [
                'id_car_mark' => 18,
                'name' => '700',
            ],
            30 => [
                'id_car_mark' => 18,
                'name' => 'E3',
            ],
            31 => [
                'id_car_mark' => 18,
                'name' => 'E9',
            ],
            32 => [
                'id_car_mark' => 35,
                'name' => 'Chevelle',
            ],
            33 => [
                'id_car_mark' => 35,
                'name' => 'Fleetmaster',
            ],
            34 => [
                'id_car_mark' => 36,
                'name' => '180',
            ],
            35 => [
                'id_car_mark' => 36,
                'name' => '300',
            ],
            36 => [
                'id_car_mark' => 36,
                'name' => 'Cordoba',
            ],
            37 => [
                'id_car_mark' => 36,
                'name' => 'Windsor',
            ],
            38 => [
                'id_car_mark' => 37,
                'name' => 'LN',
            ],
            39 => [
                'id_car_mark' => 60,
                'name' => 'GTC4Lusso',
            ],
            40 => [
                'id_car_mark' => 63,
                'name' => 'GT40',
            ],
            41 => [
                'id_car_mark' => 92,
                'name' => 'Niro',
            ],
            42 => [
                'id_car_mark' => 130,
                'name' => 'Kapitan',
            ],
            43 => [
                'id_car_mark' => 135,
                'name' => '203',
            ],
            44 => [
                'id_car_mark' => 139,
                'name' => '718 Boxster',
            ],
            45 => [
                'id_car_mark' => 3689,
                'name' => 'R2',
            ],
            46 => [
                'id_car_mark' => 88,
                'name' => 'F-Type SVR',
            ],
            47 => [
                'id_car_mark' => 130,
                'name' => 'P4',
            ],
            48 => [
                'id_car_mark' => 135,
                'name' => 'Traveller',
            ],
            49 => [
                'id_car_mark' => 9,
                'name' => 'DB11',
            ],
            50 => [
                'id_car_mark' => 10,
                'name' => 'Q2',
            ],
            51 => [
                'id_car_mark' => 10,
                'name' => 'SQ7',
            ],
            52 => [
                'id_car_mark' => 24,
                'name' => 'Chiron',
            ],
            53 => [
                'id_car_mark' => 35,
                'name' => 'C/K',
            ],
            54 => [
                'id_car_mark' => 35,
                'name' => 'Deluxe',
            ],
            55 => [
                'id_car_mark' => 52,
                'name' => 'AX7',
            ],
            56 => [
                'id_car_mark' => 63,
                'name' => 'Zephyr',
            ],
            57 => [
                'id_car_mark' => 85,
                'name' => 'Hombre',
            ],
            58 => [
                'id_car_mark' => 95,
                'name' => 'Centanario',
            ],
            59 => [
                'id_car_mark' => 111,
                'name' => 'Levante',
            ],
            60 => [
                'id_car_mark' => 114,
                'name' => '570GT',
            ],
            61 => [
                'id_car_mark' => 116,
                'name' => 'GLC-klasse AMG',
            ],
            62 => [
                'id_car_mark' => 117,
                'name' => 'Eight',
            ],
            63 => [
                'id_car_mark' => 135,
                'name' => '201',
            ],
            64 => [
                'id_car_mark' => 135,
                'name' => '202',
            ],
            65 => [
                'id_car_mark' => 135,
                'name' => '403',
            ],
            66 => [
                'id_car_mark' => 135,
                'name' => '404',
            ],
            67 => [
                'id_car_mark' => 138,
                'name' => 'Catalina',
            ],
            68 => [
                'id_car_mark' => 147,
                'name' => '10',
            ],
            69 => [
                'id_car_mark' => 147,
                'name' => '4CV',
            ],
            70 => [
                'id_car_mark' => 147,
                'name' => 'Caravelle',
            ],
            71 => [
                'id_car_mark' => 157,
                'name' => 'Ateca',
            ],
        ]);
    }
}
