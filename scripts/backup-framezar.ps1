param(
  [string]$DestinationRoot = "Y:\Public\Khumo Kitso media\websites"
)

$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupName = "Framezar.com-$timestamp"
$backupRoot = Join-Path $DestinationRoot "Framezar.com"
$backupFolder = Join-Path $backupRoot $backupName
$zipPath = Join-Path $backupRoot "$backupName.zip"
$stagingRoot = Join-Path $env:TEMP "FramezarBackup-$timestamp"
$stagingFolder = Join-Path $stagingRoot $backupName
$stagingZip = Join-Path $stagingRoot "$backupName.zip"

$excludedDirectories = @(
  ".git",
  ".next",
  "node_modules"
)

$excludedFiles = @(
  "tsconfig.tsbuildinfo",
  "dev-server.log",
  "dev-server.err.log"
)

if (-not (Test-Path $DestinationRoot)) {
  New-Item -ItemType Directory -Path $DestinationRoot | Out-Null
}

if (-not (Test-Path $backupRoot)) {
  New-Item -ItemType Directory -Path $backupRoot | Out-Null
}

New-Item -ItemType Directory -Path $stagingFolder | Out-Null

Get-ChildItem -LiteralPath $repoRoot -Force | ForEach-Object {
  if ($excludedDirectories -contains $_.Name) {
    return
  }

  if ($_.Name -like ".env*" -and $_.Name -ne ".env.example") {
    return
  }

  if ($excludedFiles -contains $_.Name) {
    return
  }

  Copy-Item -LiteralPath $_.FullName -Destination $stagingFolder -Recurse -Force
}

Compress-Archive -Path (Join-Path $stagingFolder "*") -DestinationPath $stagingZip -Force
Copy-Item -LiteralPath $stagingFolder -Destination $backupRoot -Recurse -Force
Copy-Item -LiteralPath $stagingZip -Destination $zipPath -Force
Remove-Item -LiteralPath $stagingRoot -Recurse -Force

Write-Host "Backup folder: $backupFolder"
Write-Host "Backup zip: $zipPath"
