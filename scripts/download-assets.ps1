# PowerShell script to download all assets from the original WordPress site
$base = "https://ipix.home.pl/autoinstalator/wordpress7/wp-content/uploads"

# Create directories
New-Item -ItemType Directory -Force -Path "public\uploads\topics" | Out-Null
New-Item -ItemType Directory -Force -Path "public\uploads\team" | Out-Null
New-Item -ItemType Directory -Force -Path "public\uploads\distributors" | Out-Null
New-Item -ItemType Directory -Force -Path "public\uploads\logo" | Out-Null
New-Item -ItemType Directory -Force -Path "public\uploads\hero" | Out-Null

$client = New-Object System.Net.WebClient

function Download($url, $dest) {
    Write-Host "Downloading $dest..."
    try {
        $client.DownloadFile($url, $dest)
        Write-Host "  OK: $dest"
    } catch {
        Write-Host "  FAILED: $url -> $_"
    }
}

# Logo
Download "$base/2023/01/Z-E-G-L-A-R-S-T-W-O_FLAT_CIEN_MINI-300x38.png" "public\uploads\logo\logo.png"
Download "$base/2023/01/cropped-Z-E-G-L-A-R-S-T-W-O_FLAT_CIEN_MINI-1024x131.png" "public\uploads\logo\logo-wide.png"

# Hero background
Download "http://ipix.home.pl/autoinstalator/wordpress7/wp-content/uploads/2023/12/ZEGLARSTWO_WWW_glowne.jpg" "public\uploads\hero\hero.jpg"

# Topics (slug -> filename mapping)
$topics = @(
    @{ slug = "ku-przestrodze";    file = "2023/11/KU-PRZESTRODZE-1024x640.png" },
    @{ slug = "wielkie-regaty";    file = "2023/11/WIELKIE-REGATY-1024x640.png" },
    @{ slug = "rozmowy-i-wywiady"; file = "2023/11/ROZMOWY-I-WYWIADY-1024x640.png" },
    @{ slug = "akweny-i-miejsca";  file = "2023/11/CIEKAWE-MIEJSCA-1024x640.png" },
    @{ slug = "wiedza-i-nauka";    file = "2023/11/WIEDZA-I-NAUKA-1024x640.png" },
    @{ slug = "kultura-i-sztuka";  file = "2023/11/KULTURA-I-SZTUKA-1024x640.png" },
    @{ slug = "jachty-i-zaglowce"; file = "2023/11/ZAGLOWCE-1024x640.png" },
    @{ slug = "sail-training";     file = "2023/11/SAIL-TRAINING-1024x640.png" },
    @{ slug = "felietony";         file = "2023/11/FELIETONY-1024x640.png" }
)
foreach ($t in $topics) {
    Download "$base/$($t.file)" "public\uploads\topics\$($t.slug).png"
}

# Team photos
$team = @(
    @{ name = "waldemar-heflich";     file = "2024/12/Waldemar_Heflich_846-scaled.jpg" },
    @{ name = "dominik-zycki";        file = "2024/12/Dominik_Zycki_846.jpg" },
    @{ name = "kuba-strzyczkowski";   file = "2023/12/5-Kuba-Strzyczkowski-846x846-1.jpg" },
    @{ name = "milka-jung";           file = "2024/12/Milka-Jung-2-scaled.jpg" },
    @{ name = "piotr-kulczycki";      file = "2023/01/Piotr_Kulczycki_1.jpg" },
    @{ name = "piotr-jodkowski";      file = "2023/12/2-Piotr-Jodkowski-846x846-1.jpg" },
    @{ name = "marek-slodownik";      file = "2024/12/Marek_Slodownik_846.jpg" },
    @{ name = "adam-struzik";         file = "2024/12/Adam_Struzik_846.jpg" },
    @{ name = "monika-witkowska";     file = "2023/12/Monika-Witkowska.jpg" },
    @{ name = "tomasz-maracewicz";    file = "2024/12/Tomasz_Maracewicz_1.jpg" },
    @{ name = "krzysztof-romanski";   file = "2024/12/Krzysztof-Romanski_v2.jpg" },
    @{ name = "olga-sabok";           file = "2024/12/Olga_Sabok_846.jpg" }
)
foreach ($m in $team) {
    $ext = [System.IO.Path]::GetExtension($m.file)
    Download "$base/$($m.file)" "public\uploads\team\$($m.name)$ext"
}

# Distributor logos
$dist = @(
    @{ name = "the-warsaw-store"; file = "2023/12/logo_the_warsaw_store.png" },
    @{ name = "inmedio";          file = "2023/12/logo_inmedio.png" },
    @{ name = "relay";            file = "2023/12/logo_relay.png" },
    @{ name = "1minute";          file = "2023/12/logo_1minute.png" },
    @{ name = "empik";            file = "2023/12/logo_empik.png" }
)
foreach ($d in $dist) {
    Download "$base/$($d.file)" "public\uploads\distributors\$($d.name).png"
}

Write-Host "`nAll downloads complete."
