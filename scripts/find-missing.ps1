$html = (Invoke-WebRequest -Uri 'https://ipix.home.pl/autoinstalator/wordpress7/' -UseBasicParsing).Content
$matches = [regex]::Matches($html, 'https?://ipix\.home\.pl/[^"''>\s]+\.(jpg|jpeg|png|webp|svg)')
$urls = $matches | ForEach-Object { $_.Value } | Sort-Object -Unique

Write-Host "Checking missing team images:"
$names = @("heflich", "zycki", "strzyczkowski", "jung", "kulczycki", "jodkowski", "struzik")

foreach ($search in $names) {
    Write-Host "-- $search --"
    $found = $urls | Where-Object { $_ -match "(?i)$search" -and $_ -notmatch '-(1024|1536|300|600|768|846x|150x)' }
    foreach ($f in $found) { Write-Host $f }
}
