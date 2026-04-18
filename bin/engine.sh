#!/bin/bash

# Ensure executed from root
if [ ! -d "storage" ]; then
  echo '{"error": "Must run from project root (where storage/ exists)"}'
  exit 1
fi

COMMAND=$1
DOMAIN=$2

if [ -z "$COMMAND" ] || [ -z "$DOMAIN" ]; then
  echo '{"error": "Usage: bin/engine.sh <issue|verify|show> <domain>"}'
  exit 1
fi

ACME_BIN="./bin/acme.sh/acme.sh"
STORAGE_DIR="$(pwd)/storage"
LOG_FILE="/tmp/acme_${DOMAIN}_$$.log"

# Default to Let's Encrypt for stability.
SERVER_ARG="--server letsencrypt"

if [ "$COMMAND" = "issue" ]; then
  # run acme.sh manually
  # Added --force to allow re-issuing even if a valid cert exists locally.
  $ACME_BIN --home "$STORAGE_DIR" --issue -d "$DOMAIN" --dns \
    --yes-I-know-dns-manual-mode-enough-go-ahead-please \
    --force \
    $SERVER_ARG > "$LOG_FILE" 2>&1
  
  # Extract DNS record info
  DNS_DOMAIN=$(grep "Domain: '_acme-challenge" "$LOG_FILE" | head -n 1 | awk -F"'" '{print $2}')
  TXT_VALUE=$(grep "TXT value: " "$LOG_FILE" | head -n 1 | awk -F"'" '{print $2}')

  if [ -n "$DNS_DOMAIN" ] && [ -n "$TXT_VALUE" ]; then
    echo "{\"success\": true, \"challenge_domain\": \"$DNS_DOMAIN\", \"txt_value\": \"$TXT_VALUE\"}"
  elif grep -q "already verified" "$LOG_FILE" || grep -q "Cert success" "$LOG_FILE" || grep -q "Success" "$LOG_FILE"; then
    # If already verified or successfully issued (e.g. from cache), we can skip DNS setup.
    echo "{\"success\": true, \"already_verified\": true}"
  else
    # Error getting challenge
    ERROR_MSG=$(tail -n 15 "$LOG_FILE" | jq -Rs .)
    echo "{\"success\": false, \"error\": \"Failed to retrieve DNS challenge.\", \"details\": $ERROR_MSG}"
  fi
  rm -f "$LOG_FILE"
  exit 0
fi

if [ "$COMMAND" = "verify" ]; then
  $ACME_BIN --home "$STORAGE_DIR" --renew -d "$DOMAIN" \
    --yes-I-know-dns-manual-mode-enough-go-ahead-please \
    --force \
    $SERVER_ARG > "$LOG_FILE" 2>&1

  # if successful, it mentions "Cert success" or similar.
  if grep -q "Cert success" "$LOG_FILE" || grep -q "Success" "$LOG_FILE" || grep -q "already verified" "$LOG_FILE"; then
    echo "{\"success\": true}"
  else
    ERROR_MSG=$(tail -n 15 "$LOG_FILE" | jq -Rs .)
    echo "{\"success\": false, \"error\": \"Verification failed.\", \"details\": $ERROR_MSG}"
  fi
  rm -f "$LOG_FILE"
  exit 0
fi

if [ "$COMMAND" = "show" ]; then
  # Acme.sh usually defaults to ECC nowadays
  CERT_DIR="$STORAGE_DIR/${DOMAIN}_ecc"
  if [ ! -d "$CERT_DIR" ]; then
    CERT_DIR="$STORAGE_DIR/$DOMAIN"
  fi

  if [ ! -d "$CERT_DIR" ]; then
    echo "{\"success\": false, \"error\": \"Certificate directory not found for $DOMAIN\"}"
    exit 1
  fi

  # Filenames in acme.sh v3+
  CERT_FILE="$CERT_DIR/$DOMAIN.cer"
  KEY_FILE="$CERT_DIR/$DOMAIN.key"
  CA_FILE="$CERT_DIR/ca.cer"
  FULL_FILE="$CERT_DIR/fullchain.cer"

  # Safely read file content as JSON string
  read_file_to_json() {
    if [ -f "$1" ]; then
      jq -Rs . "$1"
    else
      echo '""'
    fi
  }

  CERT_STR=$(read_file_to_json "$CERT_FILE")
  KEY_STR=$(read_file_to_json "$KEY_FILE")
  CA_STR=$(read_file_to_json "$CA_FILE")
  FULL_STR=$(read_file_to_json "$FULL_FILE")

  echo "{\"success\": true, \"cert\": $CERT_STR, \"key\": $KEY_STR, \"ca\": $CA_STR, \"fullchain\": $FULL_STR}"
  exit 0
fi

echo "{\"success\": false, \"error\": \"Unknown command\"}"
exit 1
