$html = (Invoke-WebRequest -Uri 'https://ipix.home.pl/autoinstalator/wordpress7/' -UseBasicParsing).Content
$matches = [regex]::Matches($html, 'https?://ipix\.home\.pl/[^"''>\s]+\.(jpg|jpeg|png|webp|svg)')
$urls = $matches | ForEach-Object { $_.Value } | Sort-Object -Unique

$names = @("heflich", "zycki", "strzyczkowski", "jung", "kulczycki", "jodkowski", "struzik")
foreach ($search in $names) {
    Write-Host "-- $search --"
    $found = $urls | Where-Object { $_ -match "(?i)$search" }
    foreach ($f in $found) { Write-Host $f }
}
