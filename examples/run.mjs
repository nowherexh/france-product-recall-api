// Run France Product Recall API — RappelConso & Barcodes on Apify.
// npm install apify-client
// APIFY_TOKEN=your_token node run.mjs
import { ApifyClient } from "apify-client";

const input = {
  "lastNDays": 7,
  "categories": [
    "alimentation"
  ],
  "departments": [
    "33"
  ]
};

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });
const run = await client.actor("jet_mythology/france-product-recalls").call(input);
const { items } = await client.dataset(run.defaultDatasetId).listItems();
console.log(`${items.length} items`);
console.log(JSON.stringify(items.slice(0, 3), null, 2));
