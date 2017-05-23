#!/bin/bash

# Let's test authorization
# - sign-up
# - sign-in
# - sign-out
# - change-password

# generate random string for account name
uname=`cat /dev/random | LC_ALL=C tr -dc "[:alpha:]" | head -c 8`

# sign-up - need a random account name so as not to get a "duplicate" error
echo ">>>testing sign-up"
EMAIL="$uname@test.com" PASSWORD="test" ./sign-up.sh &>/tmp/result.txt

echo ">>>testing sign-in"
EMAIL="$uname@test.com" PASSWORD="test" ./sign-in.sh > /tmp/token.txt

id=`grep token /tmp/token.txt | cut -d '"' -f6`
token=`grep token /tmp/token.txt | cut -d '"' -f22`
# echo $token

echo ">>>testing change-password"
TOKEN="$token" ID="$id" OLDPW="test" NEWPW="test2" ./change-password.sh

#
# #needs a token ./sign-out.sh
echo ">>>testing sign-out"
TOKEN="$token"  ID="$id" ./sign-out.sh
#
# #sign-in with new password
echo ">>>testing sign-in with new password"
EMAIL="$uname@test.com" PASSWORD="test2" ./sign-in.sh
