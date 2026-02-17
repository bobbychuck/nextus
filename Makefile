.PHONY: help bootstrap doctor run test analyze build-apk build-appbundle build-ios build-web

help:
	@echo "Velocity Core make targets"
	@echo "  make bootstrap      Setup platform folders and dependencies"
	@echo "  make doctor         Run flutter doctor"
	@echo "  make run            Run the app"
	@echo "  make analyze        Run static analysis"
	@echo "  make test           Run tests"
	@echo "  make build-apk      Build Android APK"
	@echo "  make build-appbundle Build Android App Bundle"
	@echo "  make build-ios      Build iOS app"
	@echo "  make build-web      Build web bundle"

bootstrap:
	./scripts/bootstrap.sh

doctor:
	flutter doctor -v

run:
	flutter run

test:
	flutter test

analyze:
	flutter analyze

build-apk:
	flutter build apk --release

build-appbundle:
	flutter build appbundle --release

build-ios:
	flutter build ios --release

build-web:
	flutter build web --release
