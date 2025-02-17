---
title: How to migrate from v4 read-only React hooks to v5
description:
tags: typescript, sdk
---

# How to migrate from v4 read-only React hooks to v5

With SDK v5, we won’t be having distinctive hooks like v4. Which means you can no longer import read-only hooks such as `useNFTs`, `useOwnedNFTs`, or `useBalance` etc.

This change is to ensure good performance and a slim final bundle for your apps.

This article will help you replace those v4 hooks with v5 syntaxes.

Let’s say you want a hook for a read-method of a contract. There are 2 scenarios:

* That method has been indexed by us
* That method has _not_ been indexed by us

To get the list of built-in extensions (methods), go here:

[thirdweb TypeScript SDK](https://portal.thirdweb.com/typescript/v5/extensions/built-in)

In case 1, you can pair the extension with the `useReadContract` in the following format:

```tsx
const { data, isLoading, error } = useReadContract(
	<extensionMethod>,
	{
		contract: yourContract,
		...<extensionMethodParams>
	}
);
```

Example 1: Replacing `useOwnedNFTs` for ERC721

```tsx
import { getOwnedNFTs } from "thirdweb/extensions/erc721";

// This should replace useOwnedNFTs
const { data, isLoading, error } = useReadContract(getOwnedNFTs, {
  contract: erc721Contract,
  owner: 'owner-address',
  ... // other optional params
})
```

Example 2: Replacing `useNFTs` for ERC721

```tsx
import { getNFTs } from "thirdweb/extensions/erc721";

// This should replace useNFTs (for ERC721)
const { data, isLoading, error } = useReadContract(getNFTs, {
  contract: erc721Contract,
  start: 0,
  count: 50,
  includeOwner: true,
});
```

If the extensions you are looking for are not built into our SDK (this is a common case for custom contracts), you can use `useReadContract` like this:

```tsx
const { data, isLoading, error } = useReadContract({
  contract: yourCustomContract,
  method: "function myCustomFunction(uint256 paramName) returns (string)",
  params: [1n], // the value for paramName (which is bigint in this case)
});
```

Alternatively, you can generate your own extensions. Please refer to this link to learn more:

[thirdweb TypeScript SDK](https://portal.thirdweb.com/typescript/v5/extensions/generate)

or write one your own:

[thirdweb TypeScript SDK](https://portal.thirdweb.com/typescript/v5/extensions/create)
