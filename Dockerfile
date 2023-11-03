# syntax=docker/dockerfile:experimental

FROM node:lts-alpine as build-stage

WORKDIR /app

RUN npm i lerna -g --loglevel notice

ARG REACT_APP_LEGACY_API_URL=https://api-stg.secberus.com
ARG REACT_APP_DEPLOYED_ENV=local
ARG REACT_APP_API_URL=https://api-dev.secberus.io
ARG REACT_APP_COGNITO_DOMAIN=sso-dev.secberus.io
ARG REACT_APP_AWS_REGION=us-east-1
ARG REACT_APP_USER_POOL_ID=us-east-1_5TylwTY1h
ARG REACT_APP_USER_POOL_WEB_CLIENT_ID=5ss22c364r76pdupriub53d5j9
ARG REACT_APP_IDENTITY_POOL_ID=us-east-1:3a5e6c6a-bc7a-4fc9-9371-4c5850d2c9db
ARG REACT_APP_X_API_KEY=U3hQPFE25p9vVqMJYxok48XAo1L9FZcY3dLjtqLS
ARG REACT_APP_ROOT_URL=http://localhost:3000
ARG REACT_APP_RESET_ROOT_URL=https://stage.secberus.io
ARG REACT_APP_RECAPTCHA_SITE_KEY=6LfAC14aAAAAAMlQIX1eJu-cPsGUiDUzYhiDOAEB
ARG GENERATE_SOURCEMAP=true

ENV PLAYWRIGHT_BROWSERS_PATH=0
ENV REACT_APP_LEGACY_API_URL ${REACT_APP_LEGACY_API_URL}
ENV REACT_APP_DEPLOYED_ENV ${REACT_APP_DEPLOYED_ENV}
ENV REACT_APP_API_URL ${REACT_APP_API_URL}
ENV REACT_APP_COGNITO_DOMAIN ${REACT_APP_COGNITO_DOMAIN}
ENV REACT_APP_AWS_REGION ${REACT_APP_AWS_REGION}
ENV REACT_APP_USER_POOL_ID ${REACT_APP_USER_POOL_ID}
ENV REACT_APP_USER_POOL_WEB_CLIENT_ID ${REACT_APP_USER_POOL_WEB_CLIENT_ID}
ENV REACT_APP_IDENTITY_POOL_ID ${REACT_APP_IDENTITY_POOL_ID}
ENV REACT_APP_X_API_KEY ${REACT_APP_X_API_KEY}
ENV REACT_APP_ROOT_URL ${REACT_APP_ROOT_URL}
ENV REACT_APP_RESET_ROOT_URL ${REACT_APP_RESET_ROOT_URL}
ENV REACT_APP_RECAPTCHA_SITE_KEY ${REACT_APP_RECAPTCHA_SITE_KEY}
ENV GENERATE_SOURCEMAP ${GENERATE_SOURCEMAP}
ENV CACHE_BUSTING_ENABLED=1
# yarn workspaces hoists babel-loader up, which throws an error. We don't care.
ENV SKIP_PREFLIGHT_CHECK=true

COPY package.json .
COPY lerna.json .
COPY yarn.lock .
COPY packages/secberus-app ./packages/secberus-app
COPY packages/components ./packages/components
COPY packages/utils ./packages/utils
COPY packages/icons ./packages/icons
COPY packages/mock ./packages/mock

RUN --mount=type=cache,id=yarn-cache,target=/usr/local/share/.cache/yarn \
	--mount=type=cache,id=node_modules,target=node_modules \
	--mount=type=cache,id=app-modules,target=packages/secberus-app/node_modules \
	--mount=type=cache,id=app-build,target=packages/secberus-app/build \
	--mount=type=cache,id=app-eslintcache,target=packages/secberus-app/.eslintcache \
	--mount=type=cache,id=components-modules,target=packages/components/node_modules \
	--mount=type=cache,id=components-build,target=packages/components/build \
	--mount=type=cache,id=components-build,target=packages/components/sb-build \
	--mount=type=cache,id=icons-modules,target=packages/icons/node_modules \
	--mount=type=cache,id=icons-build,target=packages/icons/build \
	--mount=type=cache,id=mock-modules,target=packages/mock/node_modules \
	--mount=type=cache,id=mock-build,target=packages/mock/build \
	--mount=type=cache,id=utils-modules,target=packages/utils/node_modules \
	--mount=type=cache,id=utils-build,target=packages/utils/build \
	echo '!!! yarn install' && time yarn install --pure-lockfile --non-interactive && \
	echo '!!! yarn build' && time yarn build && \
	echo '!!! cp app-build' && time cp -r packages/secberus-app/build app-build
	# echo '!!! cp sb-build' && time cp -r packages/components/sb-build components-build

FROM nginx:stable-alpine as deploy-stage
COPY packages/secberus-app/nginx.conf ./nginx.conf
WORKDIR /app
COPY --from=build-stage /app/app-build .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;", "-c", "/nginx.conf"]

FROM nginx:stable-alpine as components
COPY packages/components/nginx.conf ./nginx.conf
WORKDIR /app
COPY --from=build-stage /app/components-build .
EXPOSE 9000
CMD ["nginx", "-g", "daemon off;", "-c", "/nginx.conf"]
