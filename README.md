# Velocity Core

Velocity Core is the Urban Velocity League Community OS bootstrap for the v0.1-alpha **Charlotte Hammer** release.

## Current MVP seed

- Flutter app shell with a live radar tower screen
- Facilitator mic action + standup prompt snackbar
- Repository structure for `core`, `facilitator`, `leagues`, and `p2p` modules

## If you are overwhelmed, start here

- Read: `docs/OPERATOR_NEXT_STEPS.md`
- Run: `make bootstrap`
- Launch: `make run`
- Validate before PR: `make analyze && make test`

## Prerequisites

Install Flutter 3.22+ and validate your toolchain:

```bash
flutter --version
flutter doctor -v
```

If this is your first Flutter setup, complete platform tooling for your targets:
- Android: Android Studio + SDK + emulator/device
- iOS/macOS: Xcode + CocoaPods (macOS only)
- Web: Chrome

## Quick start

```bash
make bootstrap
make run
```

`make bootstrap` is idempotent:
- creates missing platform folders (`android/`, `ios/`, `web/`) only when needed
- runs `flutter pub get`

If you prefer not to use Make:

```bash
./scripts/bootstrap.sh
flutter run
```

## Quality checks

```bash
make analyze
make test
```

## Build artifacts

### Android APK
```bash
make build-apk
```
Output: `build/app/outputs/flutter-apk/app-release.apk`

### Android App Bundle (Play Store)
```bash
make build-appbundle
```
Output: `build/app/outputs/bundle/release/app-release.aab`

### iOS (macOS only)
```bash
make build-ios
```
Then archive/sign in Xcode.

### Web
```bash
make build-web
```
Output: `build/web/`

## Available Make targets

Run `make help` to print commands.

```bash
make bootstrap   # setup platform folders and dependencies
make doctor      # flutter doctor -v
make run         # run app
make analyze     # static analysis
make test        # unit/widget tests
make build-apk   # Android APK release
make build-appbundle
make build-ios
make build-web
```

## What now? (next execution steps)

1. Run local bootstrap and launch once:
   ```bash
   make bootstrap
   make run
   ```
2. Open a PR with any feature change; GitHub Actions now runs format/analyze/test automatically.
3. Implement Sprint 14 goals in this order:
   - proximity reputation prototype (negative alignment weights)
   - timeline weave auto-recap for UVL rides
