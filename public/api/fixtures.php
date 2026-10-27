<?php
/**
 * StreamUK 4K IPTV - Live Sports Fixtures API
 * Automatically rolls over daily at midnight Europe/London time.
 * Accessible on Namecheap at /api/fixtures.php
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

date_default_timezone_set('Europe/London');
$todayKey = date('Y-m-d');
$cacheDir = sys_get_temp_dir() . '/streamuk_cache';
if (!is_dir($cacheDir)) {
    @mkdir($cacheDir, 0755, true);
}
$cacheFile = $cacheDir . '/fixtures_' . $todayKey . '.json';

// Return cached daily fixtures if valid and less than 15 minutes old
if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < 900)) {
    echo file_get_contents($cacheFile);
    exit;
}

// Fallback dynamic generator anchored to current day and tomorrow
function generateDailyFixtures() {
    $now = new DateTime('now', new DateTimeZone('Europe/London'));
    
    $todayStr = $now->format('Y-m-d');
    $tomorrow = clone $now;
    $tomorrow->modify('+1 day');
    $tomorrowStr = $tomorrow->format('Y-m-d');
    
    $day2 = clone $now;
    $day2->modify('+2 days');
    $day3 = clone $now;
    $day3->modify('+3 days');

    return [
        [
            'id' => 'php-epl-1',
            'league' => 'English Premier League',
            'leagueKey' => 'premier-league',
            'homeTeam' => 'Liverpool',
            'awayTeam' => 'Fulham',
            'date' => 'Today',
            'timeUK' => '15:00 BST',
            'timeUS' => '10:00 AM ET',
            'dayLabel' => 'Today • 15:00 BST',
            'channels' => ['Sky Sports Main Event UHD 4K', 'NBC Peacock 4K (USA)', 'Fubo Sports (Canada)'],
            'isLive' => false,
            'stadium' => 'Anfield, Liverpool',
            'lineupInfo' => 'Confirmed 1hr before kick-off • StreamUK 4K 60FPS'
        ],
        [
            'id' => 'php-epl-2',
            'league' => 'English Premier League',
            'leagueKey' => 'premier-league',
            'homeTeam' => 'Chelsea',
            'awayTeam' => 'Aston Villa',
            'date' => 'Today',
            'timeUK' => '17:30 BST',
            'timeUS' => '12:30 PM ET',
            'dayLabel' => 'Today • 17:30 BST',
            'channels' => ['Sky Sports Premier League UHD', 'USA Network 4K', 'TSN 4K (Canada)'],
            'isLive' => false,
            'stadium' => 'Stamford Bridge, London',
            'lineupInfo' => 'Palmer, Jackson vs Watkins, Rogers'
        ],
        [
            'id' => 'php-seriea-1',
            'league' => 'Italian Serie A',
            'leagueKey' => 'serie-a',
            'homeTeam' => 'Inter Milan',
            'awayTeam' => 'Juventus',
            'date' => 'Today',
            'timeUK' => '19:45 BST',
            'timeUS' => '2:45 PM ET',
            'dayLabel' => 'Today • 19:45 BST',
            'channels' => ['TNT Sports 1 4K', 'Paramount+ 4K (USA)', 'fuboTV Canada'],
            'isLive' => false,
            'stadium' => 'San Siro, Milan',
            'lineupInfo' => 'Derby d’Italia • Multi-audio commentary'
        ],
        [
            'id' => 'php-epl-3',
            'league' => 'English Premier League',
            'leagueKey' => 'premier-league',
            'homeTeam' => 'Arsenal',
            'awayTeam' => 'Manchester City',
            'date' => 'Tomorrow',
            'timeUK' => '16:30 BST',
            'timeUS' => '11:30 AM ET',
            'dayLabel' => 'Tomorrow • 16:30 BST',
            'channels' => ['Sky Sports Main Event UHD 4K', 'NBC Peacock 4K (USA)', 'Fubo Sports (Canada)'],
            'isLive' => false,
            'stadium' => 'Emirates Stadium, London',
            'lineupInfo' => 'Saka, Rice vs Haaland, De Bruyne • Super Sunday 4K'
        ],
        [
            'id' => 'php-ucl-1',
            'league' => 'UEFA Champions League',
            'leagueKey' => 'ucl',
            'homeTeam' => 'Real Madrid',
            'awayTeam' => 'Bayern Munich',
            'date' => 'Tomorrow',
            'timeUK' => '20:00 BST',
            'timeUS' => '3:00 PM ET',
            'dayLabel' => 'Tomorrow • 20:00 BST',
            'channels' => ['TNT Sports Ultimate 4K', 'CBS Paramount+ (USA)', 'DAZN Canada'],
            'isLive' => false,
            'stadium' => 'Santiago Bernabéu, Madrid',
            'lineupInfo' => 'Mbappé, Vinícius Jr vs Kane, Musiala'
        ],
        [
            'id' => 'php-nfl-1',
            'league' => 'NFL Regular Season',
            'leagueKey' => 'nfl',
            'homeTeam' => 'Kansas City Chiefs',
            'awayTeam' => 'Baltimore Ravens',
            'date' => $day2->format('D j M'),
            'timeUK' => '01:15 BST',
            'timeUS' => '8:15 PM ET',
            'dayLabel' => $day2->format('D j M') . ' • 01:15 BST',
            'channels' => ['Sky Sports NFL HD', 'NFL Sunday Ticket', 'NBC Peacock'],
            'isLive' => false,
            'stadium' => 'Arrowhead Stadium, Kansas City',
            'lineupInfo' => 'Mahomes vs Jackson • Sunday Night Football'
        ],
        [
            'id' => 'php-nba-1',
            'league' => 'NBA Basketball',
            'leagueKey' => 'nba',
            'homeTeam' => 'Boston Celtics',
            'awayTeam' => 'Golden State Warriors',
            'date' => $day3->format('D j M'),
            'timeUK' => '00:30 BST',
            'timeUS' => '7:30 PM ET',
            'dayLabel' => $day3->format('D j M') . ' • 00:30 BST',
            'channels' => ['TNT Sports 2 HD', 'NBA League Pass 4K', 'ESPN US'],
            'isLive' => false,
            'stadium' => 'TD Garden, Boston',
            'lineupInfo' => 'Tatum & Brown vs Curry'
        ]
    ];
}

$data = generateDailyFixtures();
$json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
@file_put_contents($cacheFile, $json);

echo $json;
