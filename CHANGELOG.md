# Changelog

## [0.1.8](https://github.com/ruby-dlee/quota-axi/compare/quota-axi-v0.1.7...quota-axi-v0.1.8) (2026-07-18)


### Features

* add release automation and public skill scaffolding ([#2](https://github.com/ruby-dlee/quota-axi/issues/2)) ([10b3c46](https://github.com/ruby-dlee/quota-axi/commit/10b3c46b2f0a3e1d8562b2a3e1d1dbfae09cb5da))
* **cli:** migrate CLI plumbing to axi-sdk-js ([#20](https://github.com/ruby-dlee/quota-axi/issues/20)) ([d59fc2a](https://github.com/ruby-dlee/quota-axi/commit/d59fc2ab4e8c94fda2e38f0bbf7fecb72dc60a56))
* harden managed provider isolation ([54dae3a](https://github.com/ruby-dlee/quota-axi/commit/54dae3a3003a59d5e9ce1ddc482621f45ca65604))
* honor Claude config homes in quota reads ([3da0054](https://github.com/ruby-dlee/quota-axi/commit/3da00546704a9d1fa03e166aba800dd63ecd2a1d))
* **providers:** add cursor copilot and grok quota reports ([#9](https://github.com/ruby-dlee/quota-axi/issues/9)) ([1cf7fd5](https://github.com/ruby-dlee/quota-axi/commit/1cf7fd5af7a376389f1943b12011e7d0c1200c55))
* **providers:** isolate managed Claude and Codex profiles ([962844a](https://github.com/ruby-dlee/quota-axi/commit/962844a52d611c5366fa535582fb72029dcd029c))


### Bug Fixes

* **ci:** allow verified manual release PRs ([385e598](https://github.com/ruby-dlee/quota-axi/commit/385e598c4b7f9fd32075e6daba15b50a1b4e1af5))
* **claude:** bind Keychain reads to exact account ([9943b39](https://github.com/ruby-dlee/quota-axi/commit/9943b39d5fa3a786a742a3306192fa00500b2ae2))
* **claude:** bind Keychain reads to exact macOS account ([d61cbcf](https://github.com/ruby-dlee/quota-axi/commit/d61cbcfcec08a79f5f48654b9bafd5e346c770da))
* **claude:** emit exact Keychain account ([b1b313c](https://github.com/ruby-dlee/quota-axi/commit/b1b313ce85c1fb7e4eae41a313db59ef01beefcd))
* **providers:** detect Grok OIDC auth records ([#11](https://github.com/ruby-dlee/quota-axi/issues/11)) ([7b33cc6](https://github.com/ruby-dlee/quota-axi/commit/7b33cc65abbfb923da9fa114a77da34ada9e6079))
* **render:** expose Keychain account in TOON ([a704a73](https://github.com/ruby-dlee/quota-axi/commit/a704a73b4792d7ef782b1283496f1c570ce9e1ae))
* reuse granted Claude Keychain access on plain calls ([#7](https://github.com/ruby-dlee/quota-axi/issues/7)) ([029f85f](https://github.com/ruby-dlee/quota-axi/commit/029f85fa1c450eaccbc64302a9c723f512081f4b))
* surface Claude Keychain access guidance ([#5](https://github.com/ruby-dlee/quota-axi/issues/5)) ([6d25e11](https://github.com/ruby-dlee/quota-axi/commit/6d25e11a3853fd55dab8a6e2668bb438c09c85e6))

## [0.1.7](https://github.com/ruby-dlee/quota-axi/compare/quota-axi-v0.1.6...quota-axi-v0.1.7) (2026-07-18)


### Features

* harden managed provider isolation ([54dae3a](https://github.com/ruby-dlee/quota-axi/commit/54dae3a3003a59d5e9ce1ddc482621f45ca65604))
* honor Claude config homes in quota reads ([3da0054](https://github.com/ruby-dlee/quota-axi/commit/3da00546704a9d1fa03e166aba800dd63ecd2a1d))
* **providers:** isolate managed Claude and Codex profiles ([962844a](https://github.com/ruby-dlee/quota-axi/commit/962844a52d611c5366fa535582fb72029dcd029c))


### Bug Fixes

* **claude:** bind Keychain reads to exact account ([9943b39](https://github.com/ruby-dlee/quota-axi/commit/9943b39d5fa3a786a742a3306192fa00500b2ae2))
* **claude:** bind Keychain reads to exact macOS account ([d61cbcf](https://github.com/ruby-dlee/quota-axi/commit/d61cbcfcec08a79f5f48654b9bafd5e346c770da))
* **claude:** emit exact Keychain account ([b1b313c](https://github.com/ruby-dlee/quota-axi/commit/b1b313ce85c1fb7e4eae41a313db59ef01beefcd))
* **render:** expose Keychain account in TOON ([a704a73](https://github.com/ruby-dlee/quota-axi/commit/a704a73b4792d7ef782b1283496f1c570ce9e1ae))

## [0.1.6](https://github.com/kunchenguid/quota-axi/compare/quota-axi-v0.1.5...quota-axi-v0.1.6) (2026-07-17)


### Features

* **cli:** migrate CLI plumbing to axi-sdk-js ([#20](https://github.com/kunchenguid/quota-axi/issues/20)) ([d59fc2a](https://github.com/kunchenguid/quota-axi/commit/d59fc2ab4e8c94fda2e38f0bbf7fecb72dc60a56))

## [0.1.5](https://github.com/kunchenguid/quota-axi/compare/quota-axi-v0.1.4...quota-axi-v0.1.5) (2026-07-08)


### Bug Fixes

* **providers:** detect Grok OIDC auth records ([#11](https://github.com/kunchenguid/quota-axi/issues/11)) ([7b33cc6](https://github.com/kunchenguid/quota-axi/commit/7b33cc65abbfb923da9fa114a77da34ada9e6079))

## [0.1.4](https://github.com/kunchenguid/quota-axi/compare/quota-axi-v0.1.3...quota-axi-v0.1.4) (2026-07-08)


### Features

* **providers:** add cursor copilot and grok quota reports ([#9](https://github.com/kunchenguid/quota-axi/issues/9)) ([1cf7fd5](https://github.com/kunchenguid/quota-axi/commit/1cf7fd5af7a376389f1943b12011e7d0c1200c55))

## [0.1.3](https://github.com/kunchenguid/quota-axi/compare/quota-axi-v0.1.2...quota-axi-v0.1.3) (2026-07-08)


### Bug Fixes

* reuse granted Claude Keychain access on plain calls ([#7](https://github.com/kunchenguid/quota-axi/issues/7)) ([029f85f](https://github.com/kunchenguid/quota-axi/commit/029f85fa1c450eaccbc64302a9c723f512081f4b))

## [0.1.2](https://github.com/kunchenguid/quota-axi/compare/quota-axi-v0.1.1...quota-axi-v0.1.2) (2026-07-07)


### Bug Fixes

* surface Claude Keychain access guidance ([#5](https://github.com/kunchenguid/quota-axi/issues/5)) ([6d25e11](https://github.com/kunchenguid/quota-axi/commit/6d25e11a3853fd55dab8a6e2668bb438c09c85e6))

## [0.1.1](https://github.com/kunchenguid/quota-axi/compare/quota-axi-v0.1.0...quota-axi-v0.1.1) (2026-07-07)


### Features

* add release automation and public skill scaffolding ([#2](https://github.com/kunchenguid/quota-axi/issues/2)) ([10b3c46](https://github.com/kunchenguid/quota-axi/commit/10b3c46b2f0a3e1d8562b2a3e1d1dbfae09cb5da))

## Changelog
