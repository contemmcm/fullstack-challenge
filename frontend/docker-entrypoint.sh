#!/usr/bin/env sh
set -eu

envsubst '${BACKEND_API_URL}' < /etc/nginx/http.d/default.conf.template > /etc/nginx/http.d/default.conf

exec "$@"
