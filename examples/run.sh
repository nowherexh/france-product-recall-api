#!/usr/bin/env bash
# Run France Product Recall API — RappelConso & Barcodes on Apify and print the results as JSON.
# export APIFY_TOKEN=your_token && bash run.sh
set -euo pipefail
curl -sS -X POST "https://api.apify.com/v2/acts/jet_mythology~france-product-recalls/run-sync-get-dataset-items?token=${APIFY_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"lastNDays": 7, "categories": ["alimentation"], "departments": ["33"]}'
