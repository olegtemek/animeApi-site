<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @vite(['resources/js/app.js', 'resources/scss/app.scss'])
    <title>{{env('APP_NAME')}} |</title>
    <script src="http://localhost:8098"></script>
</head>
<body>
    @yield('content')
</body>
</html>