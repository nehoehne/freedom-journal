# CONTRIBUTING 

## Running the app

### Prerequisites 
* [Git](https://git-scm.com/downloads)
* [Node.js](https://nodejs.org/en) (version 18 or higher)
* [Rust](https://www.rust-lang.org/tools/install)
* [Tauri prerequisites](https://v1.tauri.app/v1/guides/getting-started/prerequisites/)

### Install, build and run  
```
git clone https://github.com/nehoehne/freedom-journal
npm install
npm run tauri dev
```

## VSCode setup (optional)
* Recommended Extensions:
	* See `.vscode/extensions.json`

* Add the following to .vscode/settings.json:
```
"files.readonlyInclude": {
	"**/.cargo/registry/src/**/*.rs": true,
	"**/.cargo/git/checkouts/**/*.rs": true,
	"**/lib/rustlib/src/rust/library/**/*.rs": true,
},
```

## Ticket workflow 
Make a branch from master: 
```
git checkout master 
git checkout -b feat/name-of-feature-branch
```
For bugs: 
```
git checkout master 
git checkout -b bug/name-of-bug-branch
```
Make any commits:
```
git add .
git commit -m "Commit message" 
```
Push changes to origin: 
```
git pull origin master
git push origin feat/name-of-feature-branch
```
Create a PR in GitHub to merge into master and request a review. Ensure to reference your work item in the PR description and specify if the issue should be considered done by the PR. 

## Code standards
* Use tabs not spaces
* Opening braces should be on the same line

### File structure
Wherever possible new files should follow the existing file structure: 


```
freedom-journal
├── docs
├── src
│   ├── backend
│   ├── lib	
│   │   ├── components
│   ├── objects
│   ├── stores
│   ├── util
│
├── src-tauri
    ├── src
```

* `docs` should all diagrams, UI designes  and documentation.
* `src` should contain all `.ts` files. 
* `src/backend` should contain all logic that directly accesses the database. 
* `src/lib` should contain all svelte components.
* `src/lib/components` should contain all the downloaded shadcn components.
* `src/objects` should contain all the data objects such as activities or journal entries. 
* `src/stores` should contain all svelte stores and functions for working with stores. 
* `src/util` should contain all utility functions and test files.
* `src-tauri/src` should contain all .rs files.

### Front-end general guidelines
* We heavily rely on [shadcn-svelte](https://www.shadcn-svelte.com/) which is a tailwind component library. All frontend styles should be consistent with this library. 
	* You can reference the [docs](https://www.shadcn-svelte.com/docs) to find out how to download new components into the project.
* Prudently reuse and repurpose existing components whenever possible. 

### Testing requirements 
Wherever possible, complex `.ts` logic should be refactored into a utility function and placed in `src/util/`. All utility functions are required to have 80% code coverage and 100% function coverage. 


