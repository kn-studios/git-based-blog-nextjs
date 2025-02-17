---
title: How to get contract metadata using thirdweb SDK
description:
tags:
---

# How to get contract metadata using thirdweb SDK

All thirdweb contracts have a read method called `contractURI`. It returns an IPFS URI (string). You can fetch the data from that location using `thirdweb/storage` ’s `download` module. The result should be a JSON object containing the metadata about the contract.

You, however, do not have to go through all the steps above. The metadata can be loaded using the following code snippet:

```tsx
import { getContractMetadata } from "thirdweb/extensions/common";
const metadata = await getContractMetadata({ contract });
```

An example of the metadata:

```tsx
{
	name: "Bored Ape Yatch Club",
	symbol: "APE",
	description: "Not the official BAYC collection"
}
```

There isn’t a guaranteed format standard for the contract’s metadata as it can be set arbitrarily by users.