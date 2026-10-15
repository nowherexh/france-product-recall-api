# France Product Recall API — RappelConso & Barcodes

**Know the same day when a product you sell, deliver or list is recalled in France.** Paste your barcodes or schedule a daily run: you get only the recalls that concern you, with the official notice.

> 🇫🇷 Rappels de produits en France (RappelConso) : API, alertes quotidiennes et vérification par code-barres. Les exemples ci-dessous sont en anglais ; les données restent en français.

**[▶ Run it on Apify](https://apify.com/jet_mythology/france-product-recalls)** — no installation, no scraping, official data only.

## Use it without code

1. Open the [Actor page](https://apify.com/jet_mythology/france-product-recalls) and click **Try for free**.
2. Paste one of the inputs below (or use the form).
3. Click **Start**, then **Export** the results as **Excel, CSV or JSON**, or send them to Google Sheets, Make, Zapier or n8n.

Schedule it (daily or weekly) to get only what changed since the last run.

## Sample output

```json
{
  "publishedDate": "2026-10-09",
  "title": "crevettes entières cuites réfrigérées élevage penaeus monodon 300g calibre 30/40",
  "brand": "signature du poissonnier",
  "category": "alimentation",
  "subCategory": "produits de la pêche et d'aquaculture",
  "gtins": [
    "3700156962272"
  ],
  "reason": "présence listéria monocytogènes",
  "risks": "listeria monocytogenes (agent responsable de la listériose)",
  "saleArea": [
    "france entière"
  ],
  "distributors": "worldmarechal",
  "url": "https://rappel.conso.gouv.fr/fiche-rappel/23743/interne"
}
```

*Real result from 9 October 2026 (abridged).* Full field list below.

## Use it from code

Get your API token in [Apify Console → Settings → API & Integrations](https://console.apify.com/settings/integrations).

**Python** (`pip install apify-client`) — see [`examples/run.py`](examples/run.py)

```python
from apify_client import ApifyClient

client = ApifyClient("YOUR_APIFY_TOKEN")
run = client.actor("jet_mythology/france-product-recalls").call(run_input={"lastNDays": 7, "categories": ["alimentation"], "departments": ["33"]})
for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(item)
```

**JavaScript** (`npm install apify-client`) — see [`examples/run.mjs`](examples/run.mjs)

```js
import { ApifyClient } from "apify-client";

const client = new ApifyClient({ token: "YOUR_APIFY_TOKEN" });
const run = await client.actor("jet_mythology/france-product-recalls").call({"lastNDays": 7, "categories": ["alimentation"], "departments": ["33"]});
const { items } = await client.dataset(run.defaultDatasetId).listItems();
console.log(items);
```

**curl** — one call, results returned directly — see [`examples/run.sh`](examples/run.sh)

```bash
curl -X POST "https://api.apify.com/v2/acts/jet_mythology~france-product-recalls/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"lastNDays": 7, "categories": ["alimentation"], "departments": ["33"]}'
```

## Example inputs

**Food recalls of the last 7 days sold in Gironde or nationwide**
```json
{"lastNDays": 7, "categories": ["alimentation"], "departments": ["33"]}
```

**Check a product list by barcode**
```json
{"gtins": ["3700156962272", "3289660022561", "0012345678905"]}
```

**Daily alert for Listeria and Salmonella recalls**
```json
{"keywords": ["listeria", "salmonelle"], "monitorNewRecalls": true, "monitorKey": "food-safety", "lastNDays": 7}
```

## Who uses it

- **Retailers, marketplaces and e-shops**: check your catalogue against official recalls and react the same day.
- **Grocery, delivery and price-comparison apps**: show recall warnings on product pages.
- **Quality, compliance and insurance teams**: keep an auditable log of recalls in your sector.
- **Journalists and researchers**: analyse recalls by category, reason or brand.

## What you get

| Field | Description |
|---|---|
| `ficheNumber`, `version`, `isUpdate` | Official notice number and version |
| `publishedAt`, `publishedDate` | Publication date |
| `title`, `brand`, `category`, `subCategory` | Product identity |
| `gtins` | Recalled barcodes, normalised to 13 digits (empty when the notice lists none) |
| `modelsOrReferences`, `productIdentification`, `packaging` | Batches, use-by dates, references |
| `marketingStart`, `marketingEnd` | When the product was on sale |
| `saleArea`, `departments`, `nationwide` | Where it was sold (parsed département codes) |
| `distributors` | Shops and chains concerned |
| `reason`, `risks`, `healthAdvice` | Why it is recalled and what the risk is |
| `consumerActions`, `compensation`, `recallEndDate` | What consumers must do, refund terms |
| `imageUrls`, `posterPdfUrl`, `url` | Product photos, official poster, official notice |

A run summary (counts by category and brand, barcodes with a recall) is saved under `OUTPUT` in the key-value store.

## Pricing

Pay per result on Apify: you only pay for the items returned, nothing for what is filtered out. In monitor mode you only pay for new or changed items. Current prices are on the [Actor page](https://apify.com/jet_mythology/france-product-recalls).

## Good to know

- Data comes from the two official RappelConso V2 datasets published by the French Ministry of Economy (DGCCRF) on data.gouv.fr, refreshed daily.
- Barcodes are only available when the manufacturer entered them; some notices identify products by batch or description only. Barcode checks therefore complement, but do not replace, reading the notices in your sector.
- By default only the latest version of each notice is returned (`allVersions` to get them all).
- Text fields are kept as published (French, lower case).

## Source and licence

RappelConso, Ministère de l'Économie (DGCCRF), via data.gouv.fr, under Licence Ouverte / Open Licence 2.0. This Actor is independent and not affiliated with the French administration.

The code examples in this repository are under the MIT licence. This repository contains usage examples only; the Actor itself runs on [Apify](https://apify.com/jet_mythology/france-product-recalls).

---

More French public data Actors by the same author: [apify.com/jet_mythology](https://apify.com/jet_mythology)
