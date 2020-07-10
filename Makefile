.PHONY=help

help: ## This help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

file-to-base64:	## Create a base64 with IN and OUT args. ex: make file-to-base64 IN=path/to/file OUT=path/to/output
	openssl base64 -in ${IN} -out ${OUT}

run: ## Run this project
	node src/index.js

start-server: ## Create a local webserver in 3000 port (optional arg: APP_PORT)
	node src/api.js
