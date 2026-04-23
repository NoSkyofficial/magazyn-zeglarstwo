$allMedia = @()
$page = 1
do {
    Write-Host "Fetching page $page..."
    try {
        $resp = Invoke-RestMethod -Uri "https://ipix.home.pl/autoinstalator/wordpress7/wp-json/wp/v2/media?per_page=100&page=$page"
        $allMedia += $resp
        $page++
    } catch {
        break
    }
} while ($resp.Count -gt 0)

$allMedia | ForEach-Object { $_.source_url } > e:\ZEGLARSTWO\scripts\media.txt
Write-Host "Saved $($allMedia.Count) URLs to media.txt"
