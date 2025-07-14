-- Migration script to insert stations data into the database
-- Run this script against your stations.db file

-- Insert station data from stations.js
INSERT INTO stations (
    name, 
    location, 
    masterlocation, 
    fare, 
    type, 
    typeid, 
    positionstart_lat, 
    positionstart_lng, 
    positionend_lat, 
    positionend_lng, 
    encpoly, 
    last_updated
) VALUES 
(
    'Pasig Palengke - Shaw Central',
    'Pasig Palengke, west side, in front of 7-11 and Julie''s Bakeshop',
    'Pasig Palengke',
    'Php13 - Php18',
    'Jeepney',
    'jeep',
    14.558445549559705,
    121.08319678592332,
    14.57996634680757,
    121.05488842253284,
    'amzwAqphwzAyF_BiEnOyMiDy@xEkGlAuGz@uCzCbCfISbB^nDc@lNSjNdArErCn@hCz@~BhAvBvA~@dBTrBBzBQzBg@rCi@|@aAL{MoAiNuAqIq@uOjRyJvLcOzQaLlMqIlKl@TzDiE',
    '2025-07-12T00:00:00.000Z'
),
(
    'Pasig - SM Megamall Via Robinson (Pasig Palengke)',
    'Pasig Palengke, west side, near Mercury Drug',
    'Pasig Palengke',
    'Php30',
    'UV Express',
    'uvexpress',
    14.55885435883534,
    121.08329303260435,
    14.58605017751485,
    121.05794424785866,
    'wpzwAerhwzAkCo@iEtOhD~@}EdRb@PBl@WzByEWgEVgEJmB?c@NqB|AkDeI[pBd@jDq@tUIdGf@nChAhAnH|B|D`Cr@lAXvAL~BIbC]rBe@lBq@d@}@AaGq@{AG}AOaI{@aMiAgGk@_Ho@kJ@u@@s@L}BlA_C~@}DlA{@Pq@f@uAdBq@dAa@tADvA}LIaIQeKCEdDcE?{IGcD@iBb@y@t@o@bAyBhCaClCjFhE~Cv@tKWhGM|@h@`@z@GnGeG?',
    '2025-07-12T00:00:00.000Z'
),
(
    'Pasig - SM Megamall Via Robinson (Urbano Velasco Ave)',
    'Urbano Velascco Ave, across Total Gas Station and alongside Lyn''s Mamihan',
    'Urbano Velasco Ave',
    'Php30',
    'UV Express',
    'uvexpress',
    14.55698175029236,
    121.08623491997508,
    14.58605017751485,
    121.05794424785866,
    '}czwAyciwzA{BzHlI~BwGpVwAdEw@~BMhAu@vGhBp@UpBqMoB[zBnAlAn@jBl@|G`B~@eHtI]b@m@PiCdCw@m@eHfI}GoDUp@lEfBtA`Av@nAd@fBJtBKrBQnBYrAi@jAy@NaAM_CQwD]uDa@wLiA_Im@eI{@aD[_DCoGJ_DxA{HjCw@Ro@b@qAxAw@rAg@xABnA{HI{F?}FMmIEChDqJEsDCwDFw@Pq@^aAtAeGlHlFbEfAj@zAJnGMtHUpACt@d@`@r@AzG}GA',
    '2025-07-12T00:00:00.000Z'
),
(
    'Pasig - Quiapo',
    'Pasig Palengke, east side, in front of Novo',
    'Pasig Palengke',
    'Php13',
    'Jeepney',
    'jeep',
    14.557878413041184,
    121.08488125247021,
    14.600493334624769,
    120.99096530601079,
    'oizwAak`bV{FsA_ItYdD`A}EhRf@HUnDwAE_AQcAAaEX}DFqCHuB`BqDkI[lB^zDo@lUGtG~@`EfE|@vD`BlB~@tAtAh@rBL|BKxBWvB[bB]n@g@RmJw@{Go@}N{AqD[uDhEoDxEcL`NcMnOsOnR_O|Q{L`OcPjTsDtE}ErO_BrGmAtGa@dD\\l[mCpDwMb_@_J`X}Jv]j@rBaIvLgO`DtBlJuFfJ_I|HbBj^hAlUP~CUx@z@xIbAnCm@rDXvDn@vCn@bCgBpIcBfJB\\GN',
    '2025-07-12T00:00:00.000Z'
);
