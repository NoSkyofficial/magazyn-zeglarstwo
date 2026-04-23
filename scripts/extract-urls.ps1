$html = (Invoke-WebRequest -Uri 'https://ipix.home.pl/autoinstalator/wordpress7/' -UseBasicParsing).Content
$allMatches = [regex]::Matches($html, 'https?://ipix\.home\.pl/[^"''>)\s]+\.(jpg|jpeg|png|webp|svg)')
$urls = $allMatches | ForEach-Object { $_.Value } | Sort-Object -Unique
foreach ($u in $urls) { Write-Output $u }
