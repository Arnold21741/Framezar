param(
  [string]$TaskName = "Framezar Daily Website Backup",
  [string]$At = "22:00",
  [string]$DestinationRoot = "Y:\Public\Khumo Kitso media\websites"
)

$ErrorActionPreference = "Stop"

$backupScript = Resolve-Path (Join-Path $PSScriptRoot "backup-framezar.ps1")
$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$time = [datetime]::ParseExact($At, "HH:mm", $null)

$arguments = "-NoProfile -ExecutionPolicy Bypass -File `"$backupScript`" -DestinationRoot `"$DestinationRoot`""
$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument $arguments -WorkingDirectory $repoRoot
$trigger = New-ScheduledTaskTrigger -Daily -At $time
$settings = New-ScheduledTaskSettingsSet `
  -AllowStartIfOnBatteries `
  -DontStopIfGoingOnBatteries `
  -StartWhenAvailable `
  -MultipleInstances IgnoreNew

Register-ScheduledTask `
  -TaskName $TaskName `
  -Action $action `
  -Trigger $trigger `
  -Settings $settings `
  -Description "Backs up the Framezar website source to NAS every day." `
  -Force | Out-Null

Write-Host "Registered scheduled task: $TaskName"
Write-Host "Runs daily at: $At"
Write-Host "Backup script: $backupScript"
Write-Host "Destination: $DestinationRoot"
