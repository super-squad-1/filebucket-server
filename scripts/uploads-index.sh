#!/bin/bash

API="http://localhost:4741"
URL_PATH="/uploads"
TOKEN='z3kSS6hBADL+sZ8L3Lqn54eq1Kl0ISeN6NzlTE5gJY4=--nty6M+CeYA+ePNQsuPe4gWHY0dlmE66qMiDLhwAmtq0='

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \

echo
