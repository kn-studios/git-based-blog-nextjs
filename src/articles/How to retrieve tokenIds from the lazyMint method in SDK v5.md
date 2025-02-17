---
title: How to retrieve tokenIds from the lazyMint method in SDK v5
description: 
tags: typescript, sdk, nft
---
# How to retrieve tokenIds from the lazyMint method in SDK v5
```typescript
import { getContract, parseEventLogs } from "thirdweb";
import { lazyMint, tokensLazyMintedEvent } from "thirdweb/extensions/erc721";


const contract = getContract({
	client: yourThirdwebClient,
	address: "your-contract-address",
	chain: yourChain
});
const sampleMetadata = [
 { name: "nft test" },
 { name: "nft test 2" }
];
const transaction = await lazyMint({
  contract,
  nfts: sampleMetadata,
});
const data = await sendAndConfirmTransaction({
  account: wallet, // could be a private key wallet
  transaction,
});
const event = parseEventLogs({
  logs: data.logs,
  events: [tokensLazyMintedEvent],
});

const startingIndex = event[0].args.startTokenId;
const endingIndex = event[0].args.endTokenId;
const result: bigint[] = 
  [...Array(Number(endingIndex - startingIndex + 1))]
    .map((_, i) => startingIndex + BigInt(i));
// -- end of code -- //


// Note that if you are using ethers v5, you can try this instead:
const results = [];
for (let id = startingIndex; id.lte(endingIndex); id = id.add(1)) {
  results.push(id);
}
```

