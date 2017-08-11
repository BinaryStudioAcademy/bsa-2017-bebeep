<?php

use Illuminate\Database\Seeder;

class CarMarkTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('car_mark')->delete();
        
        \DB::table('car_mark')->insert(array (
            0 => 
            array (
                'id_car_mark' => 1,
                'name' => 'AC',
                'name_rus' => 'АЦ',
            ),
            1 => 
            array (
                'id_car_mark' => 2,
                'name' => 'Acura',
                'name_rus' => 'Акура',
            ),
            2 => 
            array (
                'id_car_mark' => 3,
                'name' => 'Alfa Romeo',
                'name_rus' => 'Альфа Ромео',
            ),
            3 => 
            array (
                'id_car_mark' => 4,
                'name' => 'Alpine',
                'name_rus' => 'Альпине',
            ),
            4 => 
            array (
                'id_car_mark' => 5,
                'name' => 'AM General',
                'name_rus' => 'АМ Генерал',
            ),
            5 => 
            array (
                'id_car_mark' => 6,
                'name' => 'Ariel',
                'name_rus' => 'Ариель',
            ),
            6 => 
            array (
                'id_car_mark' => 7,
                'name' => 'Aro',
                'name_rus' => 'Аро',
            ),
            7 => 
            array (
                'id_car_mark' => 8,
                'name' => 'Asia',
                'name_rus' => 'Азия',
            ),
            8 => 
            array (
                'id_car_mark' => 9,
                'name' => 'Aston Martin',
                'name_rus' => 'Астон Мартин',
            ),
            9 => 
            array (
                'id_car_mark' => 10,
                'name' => 'Audi',
                'name_rus' => 'Ауди',
            ),
            10 => 
            array (
                'id_car_mark' => 11,
                'name' => 'Austin',
                'name_rus' => 'Аустин',
            ),
            11 => 
            array (
                'id_car_mark' => 12,
                'name' => 'Autobianchi',
                'name_rus' => 'Автобьянчи',
            ),
            12 => 
            array (
                'id_car_mark' => 13,
                'name' => 'Baltijas Dzips',
                'name_rus' => 'Балтиза Джипс',
            ),
            13 => 
            array (
                'id_car_mark' => 14,
                'name' => 'Beijing',
                'name_rus' => 'Бьюджинг',
            ),
            14 => 
            array (
                'id_car_mark' => 15,
                'name' => 'Bentley',
                'name_rus' => 'Бентли',
            ),
            15 => 
            array (
                'id_car_mark' => 16,
                'name' => 'Bertone',
                'name_rus' => 'Бертони',
            ),
            16 => 
            array (
                'id_car_mark' => 17,
                'name' => 'Bitter',
                'name_rus' => 'Биттер',
            ),
            17 => 
            array (
                'id_car_mark' => 18,
                'name' => 'BMW',
                'name_rus' => 'БМВ',
            ),
            18 => 
            array (
                'id_car_mark' => 20,
                'name' => 'Brabus',
                'name_rus' => 'Брабус',
            ),
            19 => 
            array (
                'id_car_mark' => 21,
                'name' => 'Brilliance',
                'name_rus' => 'Бриллианс',
            ),
            20 => 
            array (
                'id_car_mark' => 22,
                'name' => 'Bristol',
                'name_rus' => 'Бристол',
            ),
            21 => 
            array (
                'id_car_mark' => 23,
                'name' => 'Bufori',
                'name_rus' => 'Буфори',
            ),
            22 => 
            array (
                'id_car_mark' => 24,
                'name' => 'Bugatti',
                'name_rus' => 'Бугатти',
            ),
            23 => 
            array (
                'id_car_mark' => 25,
                'name' => 'Buick',
                'name_rus' => 'Бьюик',
            ),
            24 => 
            array (
                'id_car_mark' => 26,
                'name' => 'BYD',
                'name_rus' => 'БИД',
            ),
            25 => 
            array (
                'id_car_mark' => 27,
                'name' => 'Byvin',
                'name_rus' => 'Бивин',
            ),
            26 => 
            array (
                'id_car_mark' => 28,
                'name' => 'Cadillac',
                'name_rus' => 'Кадилак',
            ),
            27 => 
            array (
                'id_car_mark' => 29,
                'name' => 'Callaway',
                'name_rus' => 'Каллавэй',
            ),
            28 => 
            array (
                'id_car_mark' => 30,
                'name' => 'Carbodies',
                'name_rus' => 'Карбодис',
            ),
            29 => 
            array (
                'id_car_mark' => 31,
                'name' => 'Caterham',
                'name_rus' => 'Катерхам',
            ),
            30 => 
            array (
                'id_car_mark' => 32,
                'name' => 'Changan',
                'name_rus' => 'Чанган',
            ),
            31 => 
            array (
                'id_car_mark' => 33,
                'name' => 'ChangFeng',
                'name_rus' => 'ЧангФэнг',
            ),
            32 => 
            array (
                'id_car_mark' => 34,
                'name' => 'Chery',
                'name_rus' => 'Чери',
            ),
            33 => 
            array (
                'id_car_mark' => 35,
                'name' => 'Chevrolet',
                'name_rus' => 'Шевроле',
            ),
            34 => 
            array (
                'id_car_mark' => 36,
                'name' => 'Chrysler',
                'name_rus' => 'Крайслер',
            ),
            35 => 
            array (
                'id_car_mark' => 37,
                'name' => 'Citroen',
                'name_rus' => 'Ситроен',
            ),
            36 => 
            array (
                'id_car_mark' => 38,
                'name' => 'Cizeta',
                'name_rus' => 'Чизета',
            ),
            37 => 
            array (
                'id_car_mark' => 39,
                'name' => 'Coggiola',
                'name_rus' => 'Коджиола',
            ),
            38 => 
            array (
                'id_car_mark' => 40,
                'name' => 'Dacia',
                'name_rus' => 'Дачия',
            ),
            39 => 
            array (
                'id_car_mark' => 41,
                'name' => 'Dadi',
                'name_rus' => 'Дади',
            ),
            40 => 
            array (
                'id_car_mark' => 42,
                'name' => 'Daewoo',
                'name_rus' => 'Дэу',
            ),
            41 => 
            array (
                'id_car_mark' => 43,
                'name' => 'DAF',
                'name_rus' => 'ДАФ',
            ),
            42 => 
            array (
                'id_car_mark' => 44,
                'name' => 'Daihatsu',
                'name_rus' => 'Дайхатсу',
            ),
            43 => 
            array (
                'id_car_mark' => 45,
                'name' => 'Daimler',
                'name_rus' => 'Даймлер',
            ),
            44 => 
            array (
                'id_car_mark' => 47,
                'name' => 'Datsun',
                'name_rus' => 'Датсун',
            ),
            45 => 
            array (
                'id_car_mark' => 48,
                'name' => 'De Tomaso',
                'name_rus' => 'Де Томасо',
            ),
            46 => 
            array (
                'id_car_mark' => 49,
                'name' => 'DeLorean',
                'name_rus' => 'ДеЛориан',
            ),
            47 => 
            array (
                'id_car_mark' => 50,
                'name' => 'Derways',
                'name_rus' => 'Дарвэйс',
            ),
            48 => 
            array (
                'id_car_mark' => 51,
                'name' => 'Dodge',
                'name_rus' => 'Додж',
            ),
            49 => 
            array (
                'id_car_mark' => 52,
                'name' => 'DongFeng',
                'name_rus' => 'ДонгФенг',
            ),
            50 => 
            array (
                'id_car_mark' => 53,
                'name' => 'Doninvest',
                'name_rus' => 'Донинвест',
            ),
            51 => 
            array (
                'id_car_mark' => 54,
                'name' => 'Donkervoort',
                'name_rus' => 'Донкервурт',
            ),
            52 => 
            array (
                'id_car_mark' => 55,
                'name' => 'E-Car',
                'name_rus' => 'Е-Кар',
            ),
            53 => 
            array (
                'id_car_mark' => 56,
                'name' => 'Eagle',
                'name_rus' => 'Игл',
            ),
            54 => 
            array (
                'id_car_mark' => 57,
                'name' => 'Eagle Cars',
                'name_rus' => 'Игл Карс',
            ),
            55 => 
            array (
                'id_car_mark' => 58,
                'name' => 'Ecomotors',
                'name_rus' => 'Экомоторс',
            ),
            56 => 
            array (
                'id_car_mark' => 59,
                'name' => 'FAW',
                'name_rus' => 'ФАВ',
            ),
            57 => 
            array (
                'id_car_mark' => 60,
                'name' => 'Ferrari',
                'name_rus' => 'Феррари',
            ),
            58 => 
            array (
                'id_car_mark' => 61,
                'name' => 'Fiat',
                'name_rus' => 'Фиат',
            ),
            59 => 
            array (
                'id_car_mark' => 62,
                'name' => 'Fisker',
                'name_rus' => 'Фискер',
            ),
            60 => 
            array (
                'id_car_mark' => 63,
                'name' => 'Ford',
                'name_rus' => 'Форд',
            ),
            61 => 
            array (
                'id_car_mark' => 64,
                'name' => 'Foton',
                'name_rus' => 'Фотон',
            ),
            62 => 
            array (
                'id_car_mark' => 65,
                'name' => 'FSO',
                'name_rus' => 'ФСО',
            ),
            63 => 
            array (
                'id_car_mark' => 66,
                'name' => 'Fuqi',
                'name_rus' => 'Фуки',
            ),
            64 => 
            array (
                'id_car_mark' => 67,
                'name' => 'Geely',
                'name_rus' => 'Джили',
            ),
            65 => 
            array (
                'id_car_mark' => 68,
                'name' => 'Geo',
                'name_rus' => 'Гео',
            ),
            66 => 
            array (
                'id_car_mark' => 69,
                'name' => 'GMC',
                'name_rus' => 'Джи Эм Си',
            ),
            67 => 
            array (
                'id_car_mark' => 70,
                'name' => 'Gonow',
                'name_rus' => 'Гонов',
            ),
            68 => 
            array (
                'id_car_mark' => 71,
                'name' => 'Great Wall',
                'name_rus' => 'Грейт Волл',
            ),
            69 => 
            array (
                'id_car_mark' => 72,
                'name' => 'Hafei',
                'name_rus' => 'Хафей',
            ),
            70 => 
            array (
                'id_car_mark' => 73,
                'name' => 'Haima',
                'name_rus' => 'Хайма',
            ),
            71 => 
            array (
                'id_car_mark' => 74,
                'name' => 'Hindustan',
                'name_rus' => 'Хиндустан',
            ),
            72 => 
            array (
                'id_car_mark' => 75,
                'name' => 'Holden',
                'name_rus' => 'Холден',
            ),
            73 => 
            array (
                'id_car_mark' => 76,
                'name' => 'Honda',
                'name_rus' => 'Хонда',
            ),
            74 => 
            array (
                'id_car_mark' => 77,
                'name' => 'HuangHai',
                'name_rus' => 'ХуангХай',
            ),
            75 => 
            array (
                'id_car_mark' => 78,
                'name' => 'Hummer',
                'name_rus' => 'Хаммер',
            ),
            76 => 
            array (
                'id_car_mark' => 79,
                'name' => 'Hyundai',
                'name_rus' => 'Хёндай',
            ),
            77 => 
            array (
                'id_car_mark' => 80,
                'name' => 'Infiniti',
                'name_rus' => 'Инфинити',
            ),
            78 => 
            array (
                'id_car_mark' => 81,
                'name' => 'Innocenti',
                'name_rus' => 'Инноченти',
            ),
            79 => 
            array (
                'id_car_mark' => 82,
                'name' => 'Invicta',
                'name_rus' => 'Инвикта',
            ),
            80 => 
            array (
                'id_car_mark' => 83,
                'name' => 'Iran Khodro',
                'name_rus' => 'Иран Ходро',
            ),
            81 => 
            array (
                'id_car_mark' => 84,
                'name' => 'Isdera',
                'name_rus' => 'Исдера',
            ),
            82 => 
            array (
                'id_car_mark' => 85,
                'name' => 'Isuzu',
                'name_rus' => 'Исузу',
            ),
            83 => 
            array (
                'id_car_mark' => 86,
                'name' => 'IVECO',
                'name_rus' => 'ИВЕКО',
            ),
            84 => 
            array (
                'id_car_mark' => 87,
                'name' => 'JAC',
                'name_rus' => 'Джак',
            ),
            85 => 
            array (
                'id_car_mark' => 88,
                'name' => 'Jaguar',
                'name_rus' => 'Ягуар',
            ),
            86 => 
            array (
                'id_car_mark' => 89,
                'name' => 'Jeep',
                'name_rus' => 'Джип',
            ),
            87 => 
            array (
                'id_car_mark' => 90,
                'name' => 'Jensen',
                'name_rus' => 'Дженсен',
            ),
            88 => 
            array (
                'id_car_mark' => 91,
                'name' => 'JMC',
                'name_rus' => 'ДжейЭмСи',
            ),
            89 => 
            array (
                'id_car_mark' => 92,
                'name' => 'Kia',
                'name_rus' => 'Киа',
            ),
            90 => 
            array (
                'id_car_mark' => 93,
                'name' => 'Koenigsegg',
                'name_rus' => 'Кёнигсегг',
            ),
            91 => 
            array (
                'id_car_mark' => 94,
                'name' => 'KTM',
                'name_rus' => 'КТМ',
            ),
            92 => 
            array (
                'id_car_mark' => 95,
                'name' => 'Lamborghini',
                'name_rus' => 'Ламборджини',
            ),
            93 => 
            array (
                'id_car_mark' => 96,
                'name' => 'Lancia',
                'name_rus' => 'Лянча',
            ),
            94 => 
            array (
                'id_car_mark' => 97,
                'name' => 'Land Rover',
                'name_rus' => 'Ленд Ровер',
            ),
            95 => 
            array (
                'id_car_mark' => 98,
                'name' => 'Landwind',
                'name_rus' => 'Ландвинд',
            ),
            96 => 
            array (
                'id_car_mark' => 99,
                'name' => 'Lexus',
                'name_rus' => 'Лексус',
            ),
            97 => 
            array (
                'id_car_mark' => 100,
                'name' => 'Liebao Motor',
                'name_rus' => 'Либао Мотор',
            ),
            98 => 
            array (
                'id_car_mark' => 101,
                'name' => 'Lifan',
                'name_rus' => 'Лифан',
            ),
            99 => 
            array (
                'id_car_mark' => 102,
                'name' => 'Lincoln',
                'name_rus' => 'Линкольн',
            ),
            100 => 
            array (
                'id_car_mark' => 103,
                'name' => 'Lotus',
                'name_rus' => 'Лотус',
            ),
            101 => 
            array (
                'id_car_mark' => 104,
                'name' => 'LTI',
                'name_rus' => 'ЛТИ',
            ),
            102 => 
            array (
                'id_car_mark' => 105,
                'name' => 'Luxgen',
                'name_rus' => 'Люксген',
            ),
            103 => 
            array (
                'id_car_mark' => 106,
                'name' => 'Mahindra',
                'name_rus' => 'Махиндра',
            ),
            104 => 
            array (
                'id_car_mark' => 107,
                'name' => 'Marcos',
                'name_rus' => 'Маркос',
            ),
            105 => 
            array (
                'id_car_mark' => 108,
                'name' => 'Marlin',
                'name_rus' => 'Марлин',
            ),
            106 => 
            array (
                'id_car_mark' => 109,
                'name' => 'Marussia',
                'name_rus' => 'Маруся',
            ),
            107 => 
            array (
                'id_car_mark' => 110,
                'name' => 'Maruti',
                'name_rus' => 'Марути',
            ),
            108 => 
            array (
                'id_car_mark' => 111,
                'name' => 'Maserati',
                'name_rus' => 'Мазерати',
            ),
            109 => 
            array (
                'id_car_mark' => 112,
                'name' => 'Maybach',
                'name_rus' => 'Майбах',
            ),
            110 => 
            array (
                'id_car_mark' => 113,
                'name' => 'Mazda',
                'name_rus' => 'Мазда',
            ),
            111 => 
            array (
                'id_car_mark' => 114,
                'name' => 'McLaren',
                'name_rus' => 'Макларен',
            ),
            112 => 
            array (
                'id_car_mark' => 115,
                'name' => 'Mega',
                'name_rus' => 'Мега',
            ),
            113 => 
            array (
                'id_car_mark' => 116,
                'name' => 'Mercedes-Benz',
                'name_rus' => 'Мерседес Бенс',
            ),
            114 => 
            array (
                'id_car_mark' => 117,
                'name' => 'Mercury',
                'name_rus' => 'Меркури',
            ),
            115 => 
            array (
                'id_car_mark' => 118,
                'name' => 'Metrocab',
                'name_rus' => 'Метрокэб',
            ),
            116 => 
            array (
                'id_car_mark' => 119,
                'name' => 'MG',
                'name_rus' => 'МГ',
            ),
            117 => 
            array (
                'id_car_mark' => 120,
                'name' => 'Microcar',
                'name_rus' => 'Микрокар',
            ),
            118 => 
            array (
                'id_car_mark' => 121,
                'name' => 'Minelli',
                'name_rus' => 'Минелли',
            ),
            119 => 
            array (
                'id_car_mark' => 122,
                'name' => 'MINI',
                'name_rus' => 'Мини',
            ),
            120 => 
            array (
                'id_car_mark' => 123,
                'name' => 'Mitsubishi',
                'name_rus' => 'Митсубиши',
            ),
            121 => 
            array (
                'id_car_mark' => 124,
                'name' => 'Mitsuoka',
                'name_rus' => 'Мицуока',
            ),
            122 => 
            array (
                'id_car_mark' => 125,
                'name' => 'Morgan',
                'name_rus' => 'Морган',
            ),
            123 => 
            array (
                'id_car_mark' => 126,
                'name' => 'Morris',
                'name_rus' => 'Моррис',
            ),
            124 => 
            array (
                'id_car_mark' => 127,
                'name' => 'Nissan',
                'name_rus' => 'Ниссан',
            ),
            125 => 
            array (
                'id_car_mark' => 128,
                'name' => 'Noble',
                'name_rus' => 'Нобл',
            ),
            126 => 
            array (
                'id_car_mark' => 129,
                'name' => 'Oldsmobile',
                'name_rus' => 'Олдсмобиль',
            ),
            127 => 
            array (
                'id_car_mark' => 130,
                'name' => 'Opel',
                'name_rus' => 'Опель',
            ),
            128 => 
            array (
                'id_car_mark' => 131,
                'name' => 'Osca',
                'name_rus' => 'Оска',
            ),
            129 => 
            array (
                'id_car_mark' => 132,
                'name' => 'Pagani',
                'name_rus' => 'Пагани',
            ),
            130 => 
            array (
                'id_car_mark' => 133,
                'name' => 'Panoz',
                'name_rus' => 'Паноз',
            ),
            131 => 
            array (
                'id_car_mark' => 134,
                'name' => 'Perodua',
                'name_rus' => 'Перодуа',
            ),
            132 => 
            array (
                'id_car_mark' => 135,
                'name' => 'Peugeot',
                'name_rus' => 'Пежо',
            ),
            133 => 
            array (
                'id_car_mark' => 136,
                'name' => 'Piaggio',
                'name_rus' => 'Пьяджо',
            ),
            134 => 
            array (
                'id_car_mark' => 137,
                'name' => 'Plymouth',
                'name_rus' => 'Плимут',
            ),
            135 => 
            array (
                'id_car_mark' => 138,
                'name' => 'Pontiac',
                'name_rus' => 'Понтиак',
            ),
            136 => 
            array (
                'id_car_mark' => 139,
                'name' => 'Porsche',
                'name_rus' => 'Порше',
            ),
            137 => 
            array (
                'id_car_mark' => 140,
                'name' => 'Premier',
                'name_rus' => 'Премьер',
            ),
            138 => 
            array (
                'id_car_mark' => 141,
                'name' => 'Proton',
                'name_rus' => 'Протон',
            ),
            139 => 
            array (
                'id_car_mark' => 142,
                'name' => 'PUCH',
                'name_rus' => 'Пух',
            ),
            140 => 
            array (
                'id_car_mark' => 143,
                'name' => 'Puma',
                'name_rus' => 'Пума',
            ),
            141 => 
            array (
                'id_car_mark' => 144,
                'name' => 'Qoros',
                'name_rus' => 'Корос',
            ),
            142 => 
            array (
                'id_car_mark' => 145,
                'name' => 'Qvale',
                'name_rus' => 'Куали',
            ),
            143 => 
            array (
                'id_car_mark' => 146,
                'name' => 'Reliant',
                'name_rus' => 'Релиант',
            ),
            144 => 
            array (
                'id_car_mark' => 147,
                'name' => 'Renault',
                'name_rus' => 'Рено',
            ),
            145 => 
            array (
                'id_car_mark' => 148,
                'name' => 'Renault Samsung',
                'name_rus' => 'Рено Самсунг',
            ),
            146 => 
            array (
                'id_car_mark' => 149,
                'name' => 'Rolls-Royce',
                'name_rus' => 'Роллс-Ройс',
            ),
            147 => 
            array (
                'id_car_mark' => 150,
                'name' => 'Ronart',
                'name_rus' => 'Ронарт',
            ),
            148 => 
            array (
                'id_car_mark' => 151,
                'name' => 'Rover',
                'name_rus' => 'Ровер',
            ),
            149 => 
            array (
                'id_car_mark' => 152,
                'name' => 'Saab',
                'name_rus' => 'Сааб',
            ),
            150 => 
            array (
                'id_car_mark' => 153,
                'name' => 'Saleen',
                'name_rus' => 'Салин',
            ),
            151 => 
            array (
                'id_car_mark' => 154,
                'name' => 'Santana',
                'name_rus' => 'Сантана',
            ),
            152 => 
            array (
                'id_car_mark' => 155,
                'name' => 'Saturn',
                'name_rus' => 'Сатурн',
            ),
            153 => 
            array (
                'id_car_mark' => 156,
                'name' => 'Scion',
                'name_rus' => 'Сцион',
            ),
            154 => 
            array (
                'id_car_mark' => 157,
                'name' => 'SEAT',
                'name_rus' => 'Сеат',
            ),
            155 => 
            array (
                'id_car_mark' => 158,
                'name' => 'ShuangHuan',
                'name_rus' => 'ШуангХуан',
            ),
            156 => 
            array (
                'id_car_mark' => 159,
                'name' => 'Skoda',
                'name_rus' => 'Шкода',
            ),
            157 => 
            array (
                'id_car_mark' => 160,
                'name' => 'Smart',
                'name_rus' => 'Смарт',
            ),
            158 => 
            array (
                'id_car_mark' => 161,
                'name' => 'Soueast',
                'name_rus' => 'Сауист',
            ),
            159 => 
            array (
                'id_car_mark' => 162,
                'name' => 'Spectre',
                'name_rus' => 'Спектр',
            ),
            160 => 
            array (
                'id_car_mark' => 163,
                'name' => 'Spyker',
                'name_rus' => 'Спайкер',
            ),
            161 => 
            array (
                'id_car_mark' => 165,
                'name' => 'SsangYong',
                'name_rus' => 'Ссанг Йонг',
            ),
            162 => 
            array (
                'id_car_mark' => 166,
                'name' => 'Subaru',
                'name_rus' => 'Субару',
            ),
            163 => 
            array (
                'id_car_mark' => 167,
                'name' => 'Suzuki',
                'name_rus' => 'Сузуки',
            ),
            164 => 
            array (
                'id_car_mark' => 168,
                'name' => 'Talbot',
                'name_rus' => 'Тэлбот',
            ),
            165 => 
            array (
                'id_car_mark' => 169,
                'name' => 'TATA',
                'name_rus' => 'ТАТА',
            ),
            166 => 
            array (
                'id_car_mark' => 170,
                'name' => 'Tatra',
                'name_rus' => 'Татра',
            ),
            167 => 
            array (
                'id_car_mark' => 171,
                'name' => 'Tazzari',
                'name_rus' => 'Таззари',
            ),
            168 => 
            array (
                'id_car_mark' => 172,
                'name' => 'Tesla',
                'name_rus' => 'Тесла',
            ),
            169 => 
            array (
                'id_car_mark' => 173,
                'name' => 'Tianma',
                'name_rus' => 'Тианма',
            ),
            170 => 
            array (
                'id_car_mark' => 174,
                'name' => 'Tianye',
                'name_rus' => 'Тианье',
            ),
            171 => 
            array (
                'id_car_mark' => 175,
                'name' => 'Tofas',
                'name_rus' => 'Тофас',
            ),
            172 => 
            array (
                'id_car_mark' => 176,
                'name' => 'Toyota',
                'name_rus' => 'Тойота',
            ),
            173 => 
            array (
                'id_car_mark' => 177,
                'name' => 'Trabant',
                'name_rus' => 'Трабант',
            ),
            174 => 
            array (
                'id_car_mark' => 178,
                'name' => 'Tramontana',
                'name_rus' => 'Трамонтана',
            ),
            175 => 
            array (
                'id_car_mark' => 179,
                'name' => 'Triumph',
                'name_rus' => 'Триумф',
            ),
            176 => 
            array (
                'id_car_mark' => 180,
                'name' => 'TVR',
                'name_rus' => 'ТВР',
            ),
            177 => 
            array (
                'id_car_mark' => 181,
                'name' => 'Vauxhall',
                'name_rus' => 'Воксхолл',
            ),
            178 => 
            array (
                'id_car_mark' => 182,
                'name' => 'Vector',
                'name_rus' => 'Вектор',
            ),
            179 => 
            array (
                'id_car_mark' => 183,
                'name' => 'Venturi',
                'name_rus' => 'Вентури',
            ),
            180 => 
            array (
                'id_car_mark' => 184,
                'name' => 'Volkswagen',
                'name_rus' => 'Фольксваген',
            ),
            181 => 
            array (
                'id_car_mark' => 185,
                'name' => 'Volvo',
                'name_rus' => 'Вольво',
            ),
            182 => 
            array (
                'id_car_mark' => 186,
                'name' => 'Vortex',
                'name_rus' => 'Вортекс',
            ),
            183 => 
            array (
                'id_car_mark' => 187,
                'name' => 'Wartburg',
                'name_rus' => 'Вартбург',
            ),
            184 => 
            array (
                'id_car_mark' => 188,
                'name' => 'Westfield',
                'name_rus' => 'Вестфилд',
            ),
            185 => 
            array (
                'id_car_mark' => 189,
                'name' => 'Wiesmann',
                'name_rus' => 'Вайсман',
            ),
            186 => 
            array (
                'id_car_mark' => 190,
                'name' => 'Xin Kai',
                'name_rus' => 'Ксин Кай',
            ),
            187 => 
            array (
                'id_car_mark' => 191,
                'name' => 'Zastava',
                'name_rus' => 'Застава',
            ),
            188 => 
            array (
                'id_car_mark' => 192,
                'name' => 'Zotye',
                'name_rus' => 'Зоти',
            ),
            189 => 
            array (
                'id_car_mark' => 193,
                'name' => 'ZX',
                'name_rus' => 'ЗетИкс',
            ),
            190 => 
            array (
                'id_car_mark' => 211,
                'name' => 'Ё-мобиль',
                'name_rus' => 'Ё-мобиль',
            ),
            191 => 
            array (
                'id_car_mark' => 212,
                'name' => 'Автокам',
                'name_rus' => 'Автокам',
            ),
            192 => 
            array (
                'id_car_mark' => 213,
                'name' => 'Астро',
                'name_rus' => 'Астро',
            ),
            193 => 
            array (
                'id_car_mark' => 214,
                'name' => 'Бронто',
                'name_rus' => 'Бронто',
            ),
            194 => 
            array (
                'id_car_mark' => 215,
            'name' => 'ВАЗ (Lada)',
                'name_rus' => 'ВАЗ',
            ),
            195 => 
            array (
                'id_car_mark' => 216,
                'name' => 'ГАЗ',
                'name_rus' => 'ГАЗ',
            ),
            196 => 
            array (
                'id_car_mark' => 217,
                'name' => 'ЗАЗ',
                'name_rus' => 'ЗАЗ',
            ),
            197 => 
            array (
                'id_car_mark' => 218,
                'name' => 'ЗИЛ',
                'name_rus' => 'ЗИЛ',
            ),
            198 => 
            array (
                'id_car_mark' => 219,
                'name' => 'ИЖ',
                'name_rus' => 'ИЖ',
            ),
            199 => 
            array (
                'id_car_mark' => 220,
                'name' => 'КамАЗ',
                'name_rus' => 'КамАЗ',
            ),
            200 => 
            array (
                'id_car_mark' => 221,
                'name' => 'Канонир',
                'name_rus' => 'Канонир',
            ),
            201 => 
            array (
                'id_car_mark' => 222,
                'name' => 'ЛуАЗ',
                'name_rus' => 'ЛУАЗ',
            ),
            202 => 
            array (
                'id_car_mark' => 223,
                'name' => 'Москвич',
                'name_rus' => 'Москвич',
            ),
            203 => 
            array (
                'id_car_mark' => 224,
                'name' => 'СМЗ',
                'name_rus' => 'СМЗ',
            ),
            204 => 
            array (
                'id_car_mark' => 225,
                'name' => 'СеАЗ',
                'name_rus' => 'СеАЗ',
            ),
            205 => 
            array (
                'id_car_mark' => 226,
                'name' => 'ТагАЗ',
                'name_rus' => 'ТагАЗ',
            ),
            206 => 
            array (
                'id_car_mark' => 227,
                'name' => 'УАЗ',
                'name_rus' => 'УАЗ',
            ),
            207 => 
            array (
                'id_car_mark' => 280,
                'name' => 'Ultima',
                'name_rus' => 'Ультима',
            ),
            208 => 
            array (
                'id_car_mark' => 282,
                'name' => 'Hawtai',
                'name_rus' => 'Хавтай',
            ),
            209 => 
            array (
                'id_car_mark' => 284,
                'name' => 'Renaissance',
                'name_rus' => 'Ренессанс',
            ),
            210 => 
            array (
                'id_car_mark' => 288,
                'name' => 'Эксклюзив',
                'name_rus' => 'Эксклюзив',
            ),
            211 => 
            array (
                'id_car_mark' => 289,
                'name' => 'Gordon',
                'name_rus' => 'Гордон',
            ),
            212 => 
            array (
                'id_car_mark' => 290,
                'name' => 'Haval',
                'name_rus' => 'Хавэйл',
            ),
            213 => 
            array (
                'id_car_mark' => 291,
                'name' => 'Alpina',
                'name_rus' => 'Альпина',
            ),
            214 => 
            array (
                'id_car_mark' => 3589,
                'name' => 'DS',
                'name_rus' => 'ДС',
            ),
            215 => 
            array (
                'id_car_mark' => 3590,
                'name' => 'PGO',
                'name_rus' => 'ПГО',
            ),
            216 => 
            array (
                'id_car_mark' => 3591,
                'name' => 'Zenvo',
                'name_rus' => 'Зенво',
            ),
            217 => 
            array (
                'id_car_mark' => 3619,
                'name' => 'Rezvani',
                'name_rus' => 'Резвани',
            ),
            218 => 
            array (
                'id_car_mark' => 3620,
                'name' => 'Rimac',
                'name_rus' => 'Римак',
            ),
            219 => 
            array (
                'id_car_mark' => 3664,
                'name' => 'Adler',
                'name_rus' => 'Адлер',
            ),
            220 => 
            array (
                'id_car_mark' => 3665,
                'name' => 'DeSoto',
                'name_rus' => 'ДеСото',
            ),
            221 => 
            array (
                'id_car_mark' => 3666,
                'name' => 'Packard',
                'name_rus' => 'Пакард',
            ),
            222 => 
            array (
                'id_car_mark' => 3667,
                'name' => 'Willys',
                'name_rus' => 'Вилис',
            ),
            223 => 
            array (
                'id_car_mark' => 3668,
                'name' => 'Комбат',
                'name_rus' => 'Комбат',
            ),
            224 => 
            array (
                'id_car_mark' => 3676,
                'name' => 'Borgward',
                'name_rus' => NULL,
            ),
            225 => 
            array (
                'id_car_mark' => 3689,
                'name' => 'Ravon',
                'name_rus' => NULL,
            ),
            226 => 
            array (
                'id_car_mark' => 3690,
                'name' => 'ЗиС',
                'name_rus' => NULL,
            ),
            227 => 
            array (
                'id_car_mark' => 3705,
                'name' => 'AMC',
                'name_rus' => NULL,
            ),
            228 => 
            array (
                'id_car_mark' => 3706,
                'name' => 'Zenos',
                'name_rus' => NULL,
            ),
            229 => 
            array (
                'id_car_mark' => 3728,
                'name' => 'W Motors',
                'name_rus' => NULL,
            ),
            230 => 
            array (
                'id_car_mark' => 3739,
                'name' => 'Hudson',
                'name_rus' => NULL,
            ),
        ));
        
        
    }
}