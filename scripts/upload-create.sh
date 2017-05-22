#!/bin/bash

API="http://localhost:4741"
URL_PATH="/upload"
TOKEN='8AAZL1AbJECBPR1fc0UgoFKlqQxo+eGT5DIr5Vbl/K4=--+EDEkva68/v5FjCJT4ctGa7LTI8hGMnxt2NxiVDzPiI='
URL='test'
NAME='name'
OWNER='owner'

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "url": "'"${URL}"'",
    "name": "'"${NAME}"'",
    "owner": "'"${OWNER}"'"
  }'

echo
