<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/secberus/secberus-app">
    <img src="../../packages/secberus-app/public/secberus-small-logo.png" alt="Logo" width="80" height="80">
  </a>

  <h2 align="center">Secberus Frontend Services</h2>
</p>

<h2>Table of Contents</h2>

- [Standard use](#standard-use)
  - [Prerequsites](#prerequsites)
  - [Building](#building)
  - [Contributing](#contributing)
    - [Conflicts](#conflicts)
- [Code Generation](#code-generation)
  - [Prerequisites](#prerequisites)
  - [Updating Open API Spec Files](#updating-open-api-spec-files)
  - [Building configurations](#building-configurations)
  - [Purpose](#purpose)


# Standard use

## Prerequsites
1. `node` and `yarn`

## Building
Simply run from the root of this package (PROJECT_ROOT/packages/services):
```sh
yarn build
```
Or, from the project monorepo:
```sh
yarn build:services
```

## Contributing
We leverage [RTK Query](https://redux-toolkit.js.org/) to create requests, cache responses, and create an accessible store for us to consume in any product.

### Conflicts
All git conflicts are to be handled as usual, **except**: 
- src/store/injections/*
- openapi/*

In these cases, we should override conflicts by running code generation again, and committing over the top. See [update Open API spec files](#updating-open-api-spec-files) and [building configurations](#building-configurations) for instructions.

---

# Code Generation

## Prerequisites
1. A configured AWS CLI environment.
    - [Internal engineering documentation on setting up the AWS CLI and configuring SSO](https://secberus.atlassian.net/wiki/spaces/ENG/pages/2793570305/Configuring+local+client+to+use+AWS+SSO)
2. `node` and `yarn`
3. `jq` (A command line JSON processor)
    - [JQ documentation](https://stedolan.github.io/jq/)
    - You can install JQ by running `brew install jq` with homebrew.

## Updating Open API Spec Files
1. Log in to AWS through the CLI into a development environment
2. In the root of the services package under `PROJECT_ROOT/packages/services`, you can run the following commands

To just fetch and update the Open API spec files:
```sh
make fetch_openapi
```
To fetch most up-to-date Open API specs, and run codegen:
```sh
make fetch_and_build
```

**Important note:** Only secberusApiGW.json Open API spec is updated automatically. The new api2 doesn't yet update automatically
and needs to be copied & pasted from here: https://github.com/secberus/secberus-api2/blob/dev/openapi/openapi.yaml

This will export all required OpenAPI specification files and place them under a local `./openapi/specs` directory.

## Building configurations
> Note: by default, code generation will **not** request and build new Open API Spec files. If you need new spec files, see [Updating Open API spec files](#updating-open-api-spec-files).
1. From this subdirectory (PROJECT_ROOT/packages/services):
```sh
make
```
This will execute `.PHONY build`, take all Open API specs under `./openapi/specs` which are pregenerated, and then generate `@rtk-query/openapi-codegen` configuration files. Then, each configuration will be executed with `npx`, with the new APIs populating `./src/store/injections` by their Open API spec filename.

## Purpose
At Secberus, many OpenAPI specifications are built through the backend team. These specifications (of any size) can be automatically collected and built into Redux Toolkit states/API layers.

This serves multiple purposes, not limited to:
1. Type Safety
    - With the aid of TypeScript, we receive immediate type errors wherever updates are made by the backend to API arguments, endpoints, specifications, or any other consumable entity, keeping us informed automatically.
2. Speed
    - By utilizing code generation, our product stays in sync with the backend automatically, allowing for rapid integration of new endpoints from various services. Previously, a considerable amount of time was spent on manual tasks such as building RTK slices, injecting endpoints, and updating changed endpoints. With this system in place, development time for services has been reduced significantly (up to 40%).