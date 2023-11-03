# You need a few things to run this makefile.
# AWS, Yarn, and JQ are required. AWS must be logged in and prepped.

# You can install JQ with brew. run:
# brew install jq

# To configure an AWS environment to login, use "aws configure [--profile profile-name]"

.DEFAULT_GOAL := all
bold := $(shell tput bold)
sgr0 := $(shell tput sgr0)
AWS := $(shell which aws)
YARN := $(shell which yarn)
JQ := $(shell which jq)
NPX := $(shell which npx)
NODE := $(shell which node)
SCRIPTS_PATH := $(realpath scripts)
BUILD_CONFIGS := $(SCRIPTS_PATH)/build-configs.script.js
BUILD_INDEX := $(SCRIPTS_PATH)/rewrite-index.script.js
RTK_CODE_GEN_EXE := @rtk-query/codegen-openapi
ROOT := $(realpath .)
SPEC_DIR := $(ROOT)/openapi/specs
SPEC_TEMP_DIR := $(SPEC_DIR)/temp
CONFIG_DIR := $(ROOT)/openapi/configs


all: build

# Any API gateway exports we need
.PHONY: fetch_openapi
fetch_openapi:
	@printf "\033[92m\n$(bold)#### Fetching Open API spec files from configured sources$(sgr0)\n\033[0m"
	mkdir -p $(SPEC_DIR)
	mkdir -p $(SPEC_TEMP_DIR)
	@printf "\033[92m\n$(bold)#### Requesting API Gateway $(sgr0)\n\033[0m"
	$(AWS) apigateway get-export --rest-api-id lnrj7io761 --stage-name final --export-type oas30 --profile secberus-dev $(SPEC_TEMP_DIR)/secberusApiGW.json --no-cli-pager
	$(JQ) '.paths |= with_entries(.value |= with_entries(select(.key != "options")))' $(SPEC_TEMP_DIR)/secberusApiGW.json > $(SPEC_DIR)/secberusApiGW.json
	@printf "\033[92m\n$(bold)#### Cleanup $(sgr0)\n\033[0m"
	rm -rf $(SPEC_TEMP_DIR)

# Builds RTK Query configs for builds
.PHONY: configs
configs:
	@printf "\033[92m\n$(bold)#### Building config files for each Open API spec$(sgr0)\n\033[0m"
	$(NODE) $(BUILD_CONFIGS)

# Executes codegen per config
.PHONY: codegen
codegen:
	@printf "\033[92m\n$(bold)#### Generating code from configs$(sgr0)\n\033[0m"
	for file in $(CONFIG_DIR)/*; do \
		echo "\033[92m#### Executing codegen on $${file}\033[0m" ; \
		$(NPX) $(RTK_CODE_GEN_EXE) $${file} ; \
	done

# .PHONY: rewriteindex
# rewriteindex:
# 	@printf "\n$(bold)#### Rebuilding src/store/injections/index.ts$(sgr0)\n"
# 	$(NODE) $(BUILDINDEX)

.PHONY: cleanup
cleanup:
	@printf "\033[92m\n$(bold)#### Cleaning up old config files$(srg0)\n\033[0m"
	rm -rf $(CONFIG_DIR)
	mkdir -p $(CONFIG_DIR)

# orchestra noises
.PHONY: build
build: configs codegen cleanup
	@printf "\033[92m\n$(bold)#### Complete! $(sgr0)\n\033[0m"

.PHONY: fetch_and_build
fetch_and_build: fetch_openapi build
