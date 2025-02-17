---
title: How to get all tokenIds from an NFT contract
description:
tags: nft

---

# How to get all tokenIds from an NFT contract

The code snippet below looks for the `startTokenId` of the contract (which is usually `0`) and the current largest tokenId (`maxId`). You will get all the tokenIds of the given contract by getting all the `bigint` from `startTokenId` to `maxId`

Credit: [thirdweb SDK v5](https://github.com/thirdweb-dev/js/blob/main/packages/thirdweb/src/extensions/erc721/read/getNFTs.ts#L51)

```typescript
// Example for an ERC-721 contract
const options = {
  contract: theNftContract,
};
const [startTokenId_, maxSupply] = await Promise.allSettled([
  startTokenId(options),
  nextTokenIdToMint(options),
  totalSupply(options),
]).then(([_startTokenId, _next, _total]) => {
  // default to 0 if startTokenId is not available
  const startTokenId__ =
    _startTokenId.status === "fulfilled" ? _startTokenId.value : 0n;
  let maxSupply_: bigint;
  // prioritize nextTokenIdToMint
  if (_next.status === "fulfilled") {
    // because we always default the startTokenId to 0 we can safely just always subtract here
    maxSupply_ = _next.value - startTokenId__;
  }
  // otherwise use totalSupply
  else if (_total.status === "fulfilled") {
    maxSupply_ = _total.value;
  } else {
    throw new Error(
      "Contract requires either `nextTokenIdToMint` or `totalSupply` function available to determine the next token ID to mint",
    );
  }
  return [startTokenId__, maxSupply_] as const;
});

const maxId = maxSupply + startTokenId_;
const allTokenIds:bigint[] = [];
for (let i = startTokenId_; i < maxId; i++) {
  allTokenIds.push(i);
}

console.log(allTokenIds); // [startTokenId_, 1n, 2n, ... maxId]
```



