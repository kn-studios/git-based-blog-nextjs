---
title: How to transfer an NFTs with thirdweb SDK
description:
tags:
---

# How to transfer an NFTs with thirdweb SDK

## For ERC721:

You have 2 options: `transferFrom` and `safeTransferFrom`

Using `transferFrom` :

```tsx
import { transferFrom } from "thirdweb/extensions/erc721";
import { sendAndConfirmTransaction } from "thirdweb";

const transaction = transferFrom({
	contract, // the erc721 contract
	from: "0x-wallet-address-of-sender",
	to: "0x-recipient-address",
	tokenId: ..., // bigint - if you want to transfer tokenId=0 -> 0n
});

const transactionReceipt = await sendAndConfirmTransaction({
	wallet, // sender wallet
	transaction
});
```

Using `safeTransferFrom` :

```tsx
import { safeTransferFrom } from "thirdweb/extensions/erc721";
import { sendAndConfirmTransaction } from "thirdweb";

const transaction = safeTransferFrom({
	contract, // the erc721 contract
	from: "0x-wallet-address-of-sender",
	to: "0x-recipient-address",
	tokenId: ..., // bigint - if you want to transfer tokenId=0 -> 0n
});

const transactionReceipt = await sendAndConfirmTransaction({
	wallet, // sender wallet
	transaction
});
```

## For ERC1155

ERC1155 works in a similar way. However you must specify the quantity that you want to transfer, and an optional data parameter.

Using `safeTransferFrom` :

```tsx
import { safeTransferFrom } from "thirdweb/extensions/erc1155";
import { sendAndConfirmTransaction } from "thirdweb";

const quantity = 1n;
const optionalData = "0x";

const transaction = safeTransferFrom({
	contract, // the erc1155 contract
	from: ...,
	to: ...,
	tokenId: ...,
	value: quantity,
	data: optionalData,
});

const transactionReceipt = await sendAndConfirmTransaction({
	wallet, // sender wallet
	transaction
});
```

BONUS: If your contract supports the `safeBatchTransferFrom` method:

```tsx
import { safeBatchTransferFrom } from "thirdweb/extensions/erc1155";
import { sendAndConfirmTransaction } from "thirdweb";

// Sending 1 tokenId#0, 1 tokenId#1 and 4 tokenId#2
const _tokenIds = [0n, 1n, 2n];
const _values = [1n, 1n, 4n];

const transaction = safeBatchTransferFrom({
	contract, // the erc1155 contract
	from: ...,
	to: ...,
	tokenIds: _tokenIds,
	values: _values,
	data: ...,
});
```

The `safeBatchTransferFrom` method can be handy if you want to transfer tokens in batch!
