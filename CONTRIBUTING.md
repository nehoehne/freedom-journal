NVM - https://github.com/coreybutler/nvm-windows/releases download nvm-setup.exe

C:\Users\kalen>nvm --version
1.2.2

NodeJS
^18.0.0

```
nvm install 20.10.0
nvm use 20.10.0
```

PS C:\Users\kalen\Git\freedom-journal> npm --version
7.24.0

Install Rust
https://www.rust-lang.org/tools/install

VSCode
- Open root directory

VSCode Extensions
(recommended by VSCode)
- rust-analyzer
- Svelte for VS Code
- Tauri

Add to settings.json
```
"files.readonlyInclude": {
	"**/.cargo/registry/src/**/*.rs": true,
	"**/.cargo/git/checkouts/**/*.rs": true,
	"**/lib/rustlib/src/rust/library/**/*.rs": true,
},
```

run
```
cargo update
```
in src-tauri

Run
```
npm install
npm run tauri dev
```
from the root folder
