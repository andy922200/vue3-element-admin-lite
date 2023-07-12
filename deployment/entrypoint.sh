#!/bin/sh
JSON_STRING='window.configs = { \
  "VITE_APP_ENV_NAME":"'"${VITE_APP_ENV_NAME}"'", \
  "VITE_APP_BASE_API":"'"${VITE_APP_BASE_API}"'" \
}'
sed -i "s@// CONFIGURATIONS_PLACEHOLDER@${JSON_STRING}@" /usr/share/nginx/html/index.html
exec "$@"