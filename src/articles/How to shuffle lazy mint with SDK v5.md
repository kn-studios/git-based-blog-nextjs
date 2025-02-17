---
title: How to shuffle items when lazy minting with SDK v5
description:
tags: nft, erc71, sdk, typescript

---

# How to shuffle items when lazy minting with SDK v5 

The shuffling feature is not a part of the SDK. What you need to do is shuffle the array of items (`NFTInput[]`) yourself, then pass the randomized result to the `lazyMint` method.

```typescript
const shuffleData = (array: NFTInput[]) =>
  array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

const nftsToLazyMint: NFTInput[] = [
  { name: "token 1" },
  { name: "token 2" },
  { name: "token 3" },
];

const shuffled: NFTInput[] = shuffleData(nftsToLazyMint);

const mint = await lazyMint({
  contract: yourNftContract,
  nfts: shuffled,
});
```

