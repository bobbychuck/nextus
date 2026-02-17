# Velocity Core — What to do with all of this

If you're looking at this repo and asking "what now?", do this in order.

## 1) Get it running locally (10 minutes)

```bash
make bootstrap
make run
```

If Flutter is missing, install it first and re-run `make bootstrap`.

## 2) Confirm quality checks pass before any PR

```bash
make analyze
make test
```

## 3) Pick one scoped task (do NOT boil the ocean)

Start with Sprint 14 priorities:

1. **Governance first:** proximity reputation prototype (negative alignment weights)
2. **Legacy second:** timeline weave auto-recap for UVL rides

## 4) Work branch flow

```bash
git checkout -b feat/<short-topic>
# code
make analyze && make test
git commit -m "<clear message>"
```

## 5) Definition of done for each change

- App still boots (`make run`)
- Static checks pass (`make analyze`)
- Tests pass (`make test`)
- PR explains: **why**, **what changed**, **how validated**

## 6) If you are blocked

- Toolchain issue: run `make doctor`
- Flutter missing: install Flutter 3.22+, then retry bootstrap
- CI failure: reproduce locally with `make analyze && make test`
