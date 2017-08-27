<?php

use Illuminate\Database\Seeder;

class CarBrandsTableSeeder extends Seeder
{
    /**
     * Auto generated seed file.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('car_brands')->delete();

        \DB::table('car_brands')->insert([
            0 => [
                'name' => 'AC',
            ],
            1 => [
                'name' => 'Acura',
            ],
            2 => [
                'name' => 'Alfa Romeo',
            ],
            3 => [
                'name' => 'Alpine',
            ],
            4 => [
                'name' => 'AM General',
            ],
            5 => [
                'name' => 'Ariel',
            ],
            6 => [
                'name' => 'Aro',
            ],
            7 => [
                'name' => 'Asia',
            ],
            8 => [
                'name' => 'Aston Martin',
            ],
            9 => [
                'name' => 'Audi',
            ],
            10 => [
                'name' => 'Austin',
            ],
            11 => [
                'name' => 'Autobianchi',
            ],
            12 => [
                'name' => 'Baltijas Dzips',
            ],
            13 => [
                'name' => 'Beijing',
            ],
            14 => [
                'name' => 'Bentley',
            ],
            15 => [
                'name' => 'Bertone',
            ],
            16 => [
                'name' => 'Bitter',
            ],
            17 => [
                'name' => 'BMW',
            ],
            18 => [
                'name' => 'Brabus',
            ],
            19 => [
                'name' => 'Brilliance',
            ],
            20 => [
                'name' => 'Bristol',
            ],
            21 => [
                'name' => 'Bufori',
            ],
            22 => [
                'name' => 'Bugatti',
            ],
            23 => [
                'name' => 'Buick',
            ],
            24 => [
                'name' => 'BYD',
            ],
            25 => [
                'name' => 'Byvin',
            ],
            26 => [
                'name' => 'Cadillac',
            ],
            27 => [
                'name' => 'Callaway',
            ],
            28 => [
                'name' => 'Carbodies',
            ],
            29 => [
                'name' => 'Caterham',
            ],
            30 => [
                'name' => 'Changan',
            ],
            31 => [
                'name' => 'ChangFeng',
            ],
            32 => [
                'name' => 'Chery',
            ],
            33 => [
                'name' => 'Chevrolet',
            ],
            34 => [
                'name' => 'Chrysler',
            ],
            35 => [
                'name' => 'Citroen',
            ],
            36 => [
                'name' => 'Cizeta',
            ],
            37 => [
                'name' => 'Coggiola',
            ],
            38 => [
                'name' => 'Dacia',
            ],
            39 => [
                'name' => 'Dadi',
            ],
            40 => [
                'name' => 'Daewoo',
            ],
            41 => [
                'name' => 'DAF',
            ],
            42 => [
                'name' => 'Daihatsu',
            ],
            43 => [
                'name' => 'Daimler',
            ],
            44 => [
                'name' => 'Datsun',
            ],
            45 => [
                'name' => 'De Tomaso',
            ],
            46 => [
                'name' => 'DeLorean',
            ],
            47 => [
                'name' => 'Derways',
            ],
            48 => [
                'name' => 'Dodge',
            ],
            49 => [
                'name' => 'DongFeng',
            ],
            50 => [
                'name' => 'Doninvest',
            ],
            51 => [
                'name' => 'Donkervoort',
            ],
            52 => [
                'name' => 'E-Car',
            ],
            53 => [
                'name' => 'Eagle',
            ],
            54 => [
                'name' => 'Eagle Cars',
            ],
            55 => [
                'name' => 'Ecomotors',
            ],
            56 => [
                'name' => 'FAW',
            ],
            57 => [
                'name' => 'Ferrari',
            ],
            58 => [
                'name' => 'Fiat',
            ],
            59 => [
                'name' => 'Fisker',
            ],
            60 => [
                'name' => 'Ford',
            ],
            61 => [
                'name' => 'Foton',
            ],
            62 => [
                'name' => 'FSO',
            ],
            63 => [
                'name' => 'Fuqi',
            ],
            64 => [
                'name' => 'Geely',
            ],
            65 => [
                'name' => 'Geo',
            ],
            66 => [
                'name' => 'GMC',
            ],
            67 => [
                'name' => 'Gonow',
            ],
            68 => [
                'name' => 'Great Wall',
            ],
            69 => [
                'name' => 'Hafei',
            ],
            70 => [
                'name' => 'Haima',
            ],
            71 => [
                'name' => 'Hindustan',
            ],
            72 => [
                'name' => 'Holden',
            ],
            73 => [
                'name' => 'Honda',
            ],
            74 => [
                'name' => 'HuangHai',
            ],
            75 => [
                'name' => 'Hummer',
            ],
            76 => [
                'name' => 'Hyundai',
            ],
            77 => [
                'name' => 'Infiniti',
            ],
            78 => [
                'name' => 'Innocenti',
            ],
            79 => [
                'name' => 'Invicta',
            ],
            80 => [
                'name' => 'Iran Khodro',
            ],
            81 => [
                'name' => 'Isdera',
            ],
            82 => [
                'name' => 'Isuzu',
            ],
            83 => [
                'name' => 'IVECO',
            ],
            84 => [
                'name' => 'JAC',
            ],
            85 => [
                'name' => 'Jaguar',
            ],
            86 => [
                'name' => 'Jeep',
            ],
            87 => [
                'name' => 'Jensen',
            ],
            88 => [
                'name' => 'JMC',
            ],
            89 => [
                'name' => 'Kia',
            ],
            90 => [
                'name' => 'Koenigsegg',
            ],
            91 => [
                'name' => 'KTM',
            ],
            92 => [
                'name' => 'Lamborghini',
            ],
            93 => [
                'name' => 'Lancia',
            ],
            94 => [
                'name' => 'Land Rover',
            ],
            95 => [
                'name' => 'Landwind',
            ],
            96 => [
                'name' => 'Lexus',
            ],
            97 => [
                'name' => 'Liebao Motor',
            ],
            98 => [
                'name' => 'Lifan',
            ],
            99 => [
                'name' => 'Lincoln',
            ],
            100 => [
                'name' => 'Lotus',
            ],
            101 => [
                'name' => 'LTI',
            ],
            102 => [
                'name' => 'Luxgen',
            ],
            103 => [
                'name' => 'Mahindra',
            ],
            104 => [
                'name' => 'Marcos',
            ],
            105 => [
                'name' => 'Marlin',
            ],
            106 => [
                'name' => 'Marussia',
            ],
            107 => [
                'name' => 'Maruti',
            ],
            108 => [
                'name' => 'Maserati',
            ],
            109 => [
                'name' => 'Maybach',
            ],
            110 => [
                'name' => 'Mazda',
            ],
            111 => [
                'name' => 'McLaren',
            ],
            112 => [
                'name' => 'Mega',
            ],
            113 => [
                'name' => 'Mercedes-Benz',
            ],
            114 => [
                'name' => 'Mercury',
            ],
            115 => [
                'name' => 'Metrocab',
            ],
            116 => [
                'name' => 'MG',
            ],
            117 => [
                'name' => 'Microcar',
            ],
            118 => [
                'name' => 'Minelli',
            ],
            119 => [
                'name' => 'MINI',
            ],
            120 => [
                'name' => 'Mitsubishi',
            ],
            121 => [
                'name' => 'Mitsuoka',
            ],
            122 => [
                'name' => 'Morgan',
            ],
            123 => [
                'name' => 'Morris',
            ],
            124 => [
                'name' => 'Nissan',
            ],
            125 => [
                'name' => 'Noble',
            ],
            126 => [
                'name' => 'Oldsmobile',
            ],
            127 => [
                'name' => 'Opel',
            ],
            128 => [
                'name' => 'Osca',
            ],
            129 => [
                'name' => 'Pagani',
            ],
            130 => [
                'name' => 'Panoz',
            ],
            131 => [
                'name' => 'Perodua',
            ],
            132 => [
                'name' => 'Peugeot',
            ],
            133 => [
                'name' => 'Piaggio',
            ],
            134 => [
                'name' => 'Plymouth',
            ],
            135 => [
                'name' => 'Pontiac',
            ],
            136 => [
                'name' => 'Porsche',
            ],
            137 => [
                'name' => 'Premier',
            ],
            138 => [
                'name' => 'Proton',
            ],
            139 => [
                'name' => 'PUCH',
            ],
            140 => [
                'name' => 'Puma',
            ],
            141 => [
                'name' => 'Qoros',
            ],
            142 => [
                'name' => 'Qvale',
            ],
            143 => [
                'name' => 'Reliant',
            ],
            144 => [
                'name' => 'Renault',
            ],
            145 => [
                'name' => 'Renault Samsung',
            ],
            146 => [
                'name' => 'Rolls-Royce',
            ],
            147 => [
                'name' => 'Ronart',
            ],
            148 => [
                'name' => 'Rover',
            ],
            149 => [
                'name' => 'Saab',
            ],
            150 => [
                'name' => 'Saleen',
            ],
            151 => [
                'name' => 'Santana',
            ],
            152 => [
                'name' => 'Saturn',
            ],
            153 => [
                'name' => 'Scion',
            ],
            154 => [
                'name' => 'SEAT',
            ],
            155 => [
                'name' => 'ShuangHuan',
            ],
            156 => [
                'name' => 'Skoda',
            ],
            157 => [
                'name' => 'Smart',
            ],
            158 => [
                'name' => 'Soueast',
            ],
            159 => [
                'name' => 'Spectre',
            ],
            160 => [
                'name' => 'Spyker',
            ],
            161 => [
                'name' => 'SsangYong',
            ],
            162 => [
                'name' => 'Subaru',
            ],
            163 => [
                'name' => 'Suzuki',
            ],
            164 => [
                'name' => 'Talbot',
            ],
            165 => [
                'name' => 'TATA',
            ],
            166 => [
                'name' => 'Tatra',
            ],
            167 => [
                'name' => 'Tazzari',
            ],
            168 => [
                'name' => 'Tesla',
            ],
            169 => [
                'name' => 'Tianma',
            ],
            170 => [
                'name' => 'Tianye',
            ],
            171 => [
                'name' => 'Tofas',
            ],
            172 => [
                'name' => 'Toyota',
            ],
            173 => [
                'name' => 'Trabant',
            ],
            174 => [
                'name' => 'Tramontana',
            ],
            175 => [
                'name' => 'Triumph',
            ],
            176 => [
                'name' => 'TVR',
            ],
            177 => [
                'name' => 'Vauxhall',
            ],
            178 => [
                'name' => 'Vector',
            ],
            179 => [
                'name' => 'Venturi',
            ],
            180 => [
                'name' => 'Volkswagen',
            ],
            181 => [
                'name' => 'Volvo',
            ],
            182 => [
                'name' => 'Vortex',
            ],
            183 => [
                'name' => 'Wartburg',
            ],
            184 => [
                'name' => 'Westfield',
            ],
            185 => [
                'name' => 'Wiesmann',
            ],
            186 => [
                'name' => 'Xin Kai',
            ],
            187 => [
                'name' => 'Zastava',
            ],
            188 => [
                'name' => 'Zotye',
            ],
            189 => [
                'name' => 'ZX',
            ],
            190 => [
                'name' => 'Ё-мобиль',
            ],
            191 => [
                'name' => 'Автокам',
            ],
            192 => [
                'name' => 'Астро',
            ],
            193 => [
                'name' => 'Бронто',
            ],
            194 => [
            'name' => 'ВАЗ (Lada)',
            ],
            195 => [
                'name' => 'ГАЗ',
            ],
            196 => [
                'name' => 'ЗАЗ',
            ],
            197 => [
                'name' => 'ЗИЛ',
            ],
            198 => [
                'name' => 'ИЖ',
            ],
            199 => [
                'name' => 'КамАЗ',
            ],
            200 => [
                'name' => 'Канонир',
            ],
            201 => [
                'name' => 'ЛуАЗ',
            ],
            202 => [
                'name' => 'Москвич',
            ],
            203 => [
                'name' => 'СМЗ',
            ],
            204 => [
                'name' => 'СеАЗ',
            ],
            205 => [
                'name' => 'ТагАЗ',
            ],
            206 => [
                'name' => 'УАЗ',
            ],
            207 => [
                'name' => 'Ultima',
            ],
            208 => [
                'name' => 'Hawtai',
            ],
            209 => [
                'name' => 'Renaissance',
            ],
            210 => [
                'name' => 'Эксклюзив',
            ],
            211 => [
                'name' => 'Gordon',
            ],
            212 => [
                'name' => 'Haval',
            ],
            213 => [
                'name' => 'Alpina',
            ],
            214 => [
                'name' => 'DS',
            ],
            215 => [
                'name' => 'PGO',
            ],
            216 => [
                'name' => 'Zenvo',
            ],
            217 => [
                'name' => 'Rezvani',
            ],
            218 => [
                'name' => 'Rimac',
            ],
            219 => [
                'name' => 'Adler',
            ],
            220 => [
                'name' => 'DeSoto',
            ],
            221 => [
                'name' => 'Packard',
            ],
            222 => [
                'name' => 'Willys',
            ],
            223 => [
                'name' => 'Комбат',
            ],
            224 => [
                'name' => 'Borgward',
            ],
            225 => [
                'name' => 'Ravon',
            ],
            226 => [
                'name' => 'ЗиС',
            ],
            227 => [
                'name' => 'AMC',
            ],
            228 => [
                'name' => 'Zenos',
            ],
            229 => [
                'name' => 'W Motors',
            ],
            230 => [
                'name' => 'Hudson',
            ],
        ]);
    }
}
