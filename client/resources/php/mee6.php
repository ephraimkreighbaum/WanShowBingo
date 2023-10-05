<?php
class Mee6LevelsApi {
    private $apiBaseUrl = "https://mee6.xyz/api/plugins/levels/leaderboard/";

    public function getLeaderboardPage($guild, $limit = 1000, $page = 0) {
        $url = $this->apiBaseUrl . "{$guild}?limit={$limit}&page={$page}";
        $response = $this->fetchData($url);
        return $response['players'] ?? [];
    }

    private function fetchData($url) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($ch);
        curl_close($ch);
        return json_decode($result, true);
    }
}

// Usage example
$mee6Api = new Mee6LevelsApi();
$guildId = "1089016305094500392"; // Your server ID
$leaderboardPage = $mee6Api->getLeaderboardPage($guildId);

// Output the leaderboard data as JSON
echo json_encode($leaderboardPage);
?>
