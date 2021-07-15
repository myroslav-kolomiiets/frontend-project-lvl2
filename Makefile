install:
	yarn
compare-files:
	node bin/gendiff.js
publish:
	yarn publish --dry-run
lint:
	yarn eslint .
test:
	yarn test
