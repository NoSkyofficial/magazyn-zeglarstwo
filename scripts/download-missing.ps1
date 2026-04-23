$base = "https://ipix.home.pl/autoinstalator/wordpress7/wp-content/uploads"
$client = New-Object System.Net.WebClient

function DL($url, $dest) {
    Write-Host "  $dest"
    try { $client.DownloadFile($url, $dest); Write-Host "    OK" }
    catch { Write-Host "    FAIL: $_" }
}

# --- Missing topic: jachty-i-zaglowce ---
DL "$base/2023/12/ZAGLOWCE_2-1024x640.png" "public\uploads\topics\jachty-i-zaglowce.png"

# --- Replace wiedza-i-nauka with correct version ---
DL "$base/2023/12/WIEDZA-I-NAUKA_2-1024x640.png" "public\uploads\topics\wiedza-i-nauka.png"

# --- Felietony is jpg not png on WP ---
DL "$base/2023/12/Felietony-1024x640.jpg" "public\uploads\topics\felietony.jpg"

# --- Team photos (correct 2023 paths from HTML) ---
$teamFiles = @(
    @("waldemar-heflich",    "2023/01/Waldemar_Heflich_1.jpg"),
    @("dominik-zycki",       "2023/01/Dominik_Zycki_1.jpg"),
    @("kuba-strzyczkowski",  "2023/01/Kuba_Strzyczkowski_1.jpg"),
    @("milka-jung",          "2023/01/Milka_Jung_1.jpg"),
    @("piotr-kulczycki",     "2023/01/Piotr_Kulczycki_1.jpg"),
    @("piotr-jodkowski",     "2023/01/Piotr_Jodkowski_1.jpg"),
    @("marek-slodownik",     "2023/12/Marek_Slodownik_1.jpg"),
    @("adam-struzik",        "2023/01/Adam_Struzik_1.jpg"),
    @("monika-witkowska",    "2023/12/Monika-Witkowska.jpg"),
    @("tomasz-maracewicz",   "2023/01/Tomasz_Maracewicz_1.jpg"),
    @("krzysztof-romanski",  "2023/12/Krzysztof-Romanski_v2.jpg"),
    @("olga-sabok",          "2023/12/Olga_Sabok_846.jpg"),
    @("aleksandra-rapp",     "2023/12/Aleksandra_Rapp_1.jpg"),
    @("andrzej-minkiewicz",  "2023/12/Andrzej_Minkiewicz_0.jpg"),
    @("malgorzata-talar",    "2023/12/Malgorzata_Talar_1.jpg"),
    @("marek-zwierz",        "2023/01/Marek_Zwierz_1.jpg"),
    @("robert-smagon",       "2023/12/Robert_Smagon_2.jpg"),
    @("stefan-ekner",        "2023/12/Stefan_Ekner_0.jpg")
)
foreach ($t in $teamFiles) {
    DL "$base/$($t[1])" "public\uploads\team\$($t[0]).jpg"
}

# --- Distributor logos ---
DL "$base/2023/11/the-warsaw-store_logo_h100px.png" "public\uploads\distributors\the-warsaw-store.png"
DL "$base/2023/11/inmedio_logo_h100px.png" "public\uploads\distributors\inmedio.png"
DL "$base/2023/11/RELAY_logo_h100px.png" "public\uploads\distributors\relay.png"
DL "$base/2023/11/1-minute_logo_h100px.png" "public\uploads\distributors\1minute.png"
DL "$base/2023/01/EMPIK_logo_150x50.png" "public\uploads\distributors\empik.png"

# --- EMPIK may be elsewhere, try alt paths ---
DL "$base/2023/11/empik_logo_h100px.png" "public\uploads\distributors\empik-alt.png"

Write-Host "`nDone!"
