<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Penalty - قائمة اللاعبين</title>
    <link rel="stylesheet" href="{{ asset('players.css') }}">
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
</head>

<body>

<header>
    <nav>
        <div class="logo">
            <img src="{{ asset('logo.png') }}" alt="Penalty Logo">
            <span>PENALTY</span>
        </div>

        <ul>
            <li><a href="/">الرئيسية</a></li>
            <li><a href="/players">اللاعبين</a></li>
            <li><a href="#">أغتنم الفرصة</a></li>
            <li><a href="#">من نحن</a></li>
        </ul>

        <button class="login-btn">
            <a href="#">تسجيل الدخول</a>
        </button>
    </nav>
</header>


<section class="hero">
    <div class="hero-content"></div>
</section>


<div class="stadium-header">
    <div class="shadow-overlay"></div>
</div>


<div class="main-content">
    <div class="container">

        <div class="players-grid">

            @foreach($players as $player)
                <div class="player-card">

                    <div class="image-wrapper">
                        <img src="{{ asset($player->image) }}" alt="لاعب">
                    </div>

                    <div class="player-data">
                        <h3>{{ $player->name }}</h3>

                        <span class="year">{{ $player->year }}</span>

                        <p class="position">{{ $player->position }}</p>

                        <button class="details-btn">
                            عرض بيانات اللاعب
                        </button>
                    </div>

                </div>
            @endforeach

        </div>

    </div>
</div>


<footer>
    <div class="footer-container">

        <div class="footer-logo">
            <img src="{{ asset('logo-white.png') }}" alt="Penalty Logo">
            <span>PENALTY</span>
        </div>

        <ul class="footer-links">
            <li><a href="/">الرئيسية</a></li>
            <li><a href="/players">اللاعبين</a></li>
            <li><a href="#">أغتنم الفرصة</a></li>
            <li><a href="#">من نحن</a></li>
        </ul>

    </div>
</footer>

</body>
</html>