#!/usr/bin/env bash
set -o errexit
set -o nounset

if [ "$#" -eq 0 ]; then
  exec node /usr/src/app/bin/app
else
  exec node /usr/src/app/bin/app  $@
fi