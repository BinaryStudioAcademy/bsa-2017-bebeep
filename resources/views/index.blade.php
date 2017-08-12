<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="UTF-8">
    <title>BeBeep</title>

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDvY4byPK3_fVxs7eEoJFwG9dFiuz3ghuY&libraries=places,geometry"></script>
</head>

<body>
    <div id="bebeep-app"></div>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyACTI_jCTcZ9m87Vp9k10oPDZpkQik8Njo"></script>
    <script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
