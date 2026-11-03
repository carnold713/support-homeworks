#!/usr/bin/env bash
# Downloads the images and icons used by the prototype from the Figma design
# (Support-Overhaul-UI). Run once from the project root:  bash scripts/fetch-figma-assets.sh
# The links come from Figma's MCP export and expire about a week after 2026-11-03.
set -uo pipefail
cd "$(dirname "$0")/.."
A=https://www.figma.com/api/mcp/asset
get() { mkdir -p "$(dirname "public/assets/$1")"; curl -fsSL -o "public/assets/$1" "$A/$2" && echo "ok   $1" || echo "FAIL $1"; }
get products/palladiom-keypad.png  728871e6-e759-40b4-9a22-5cc19f5c944c.png
get products/alisse-keypad.png  044926e9-6db0-41a9-b515-d93488942795.png
get products/aviena-keypad.png  bb235ad9-44eb-4457-82de-df9e6434f8f7.png
get products/d2-remodeler-downlight.png  c508e98b-e322-41e5-9bf5-87bdaf7c5d0d.png
get products/d2-new-construction-downlight.png  358a742d-887e-404a-b6ca-cbc7f78c94ef.png
get products/rania-tape-light.png  a952a658-90d0-4a0b-adc8-eaeb1bf3a492.png
get products/a20-lamp.png  12374a3c-6726-43ea-a9c5-8582f3efe964.png
get products/wired-processor.png  0eefa07f-e06f-4cef-9afa-d8e6e3b1cd43.png
get products/triathlon-select-roller.png  3a9900ec-3c0f-492f-be95-faf5541d5cdd.png
get products/sivoia-roller-in-recessed-pocket.png  a5fd0102-69d8-4a5a-be64-1d6951a6c2b7.png
get products/palladiom-wire-free-roller.png  dfaa6bf1-a5b9-43a0-819c-09810e9d9844.png
get products/maestro-dimmers.png  e681a802-50c8-4a53-abd0-f65f4d6e951f.png
get products/sunnata-dimmer.png  80210cc9-c951-42fa-8c6a-f2f9f396ec1b.png
get products/plug-in-dimmer.png  fc3304af-844b-4906-97c2-bcef4e4cf41d.png
get products/homeworks-maestro-companion-switch.png  99802d9f-e235-4817-9c12-9f5b6ddae9fb.png
get products/sivoia-roman-fabrication-kit.png  da107323-e126-4659-83c0-557dcc978bc4.png
get products/architrave-keypad.png  0ee404bf-3379-480c-925b-4673cf18bf10.png
get products/sivoia-qs-drapery.png  93efb661-6925-4f1e-b0ce-93d351fce2ee.png
get products/sivoia-qs-wood-blinds.png  a4763f17-6174-4a4e-9174-383af7046b04.png
get products/maestro-fan-control.png  065216f8-8f0d-45f2-bb0f-8d76858f920a.png
get products/designer-wallplates.png  044a48da-6c0b-4411-a6e7-b1d0c6615fc0.png
get products/radio-powr-savr-occupancy-sensor.png  f8a8b21d-5b6a-4193-b174-cf196b04c7aa.png
get products/light-management-hub-qp5.png  3a19d636-796f-418b-869e-495b7544dbb7.png
get products/light-management-hub-qp6.png  69933dc8-236a-451f-aa99-7e314bb2eb25.png
get products/din-rail-processor.png  2302442d-2844-4ac6-8938-aca6debd79dd.png
get products/athena-wireless-processor.png  a1af1b19-f2f5-4b80-bceb-c6a27a55bfa7.png
get products/legacy-panel-interface-ua-cs-lx.png  bd9ac462-9d87-4878-874a-aef356dbf939.png
get products/qs-sensor-module.png  72339032-570b-4a39-b6ad-5901ffb7ab12.png
get products/lutron-startup-service-lte-modem.png  d070705e-ac13-450f-b5df-988bfcc2b380.png
get photos/education-1.png  283b8706-5649-4cb6-806b-f7b6df013d82.png
get photos/education-2.png  b24c1bce-ad59-4f35-9a96-b7af37501d41.png
get photos/contact.png      2d29ae65-2afc-4867-a5c3-57646d38c8ee.png
get icons/lutron-logo.svg   2a0efe8f-33be-4591-85f6-ef00a173e202.svg
get icons/switch.svg        4f1bda25-5889-433a-9acb-4a68df43f42a.svg
get icons/wiring.svg        99ca3697-25dc-4e40-8e79-70aa846f02ea.svg
get icons/lights.svg        dee0baf7-f6db-42e1-9c2e-8382f67d7190.svg
get icons/shop.svg          57430880-8151-40a2-9413-941830ce8fd6.svg
get icons/si-0.svg          df80b33e-9b9a-40c2-ac50-ccb14557c24c.svg
get icons/si-1.svg          65607bfd-c314-4cdf-bc7e-7ee7a5317ba7.svg
get icons/si-2.svg          afc6422e-bb23-4e07-94fe-60fb0ffebcb5.svg
get icons/si-3.svg          6592d5a2-8287-40b3-ae68-5591e5eaec09.svg
get icons/si-4.svg          5fd96c7a-3bd7-4c77-a558-9a23edc7f03c.svg
get icons/si-5.svg          005038d6-98ab-4a1f-bf16-86a540e3d66f.svg
get icons/si-6.svg          2adfafc8-4402-45e1-a387-e98d9b5cfc6d.svg
get icons/si-7.svg          8bd059ef-83b5-4d83-85a1-f6649c3afaf5.svg
get icons/si-8.svg          a31a27f3-c023-45a6-adf1-567b7fc6c877.svg
get icons/si-9.svg          a9798543-9dfe-4391-b4c4-5943d4d75bce.svg
get icons/si-10.svg         75cdd01b-2f7a-4790-b600-24fb3a8b5048.svg
get icons/si-11.svg         607d7ca3-d4be-4d15-a6ad-eab6f334ac0f.svg
