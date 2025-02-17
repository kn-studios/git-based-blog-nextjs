---
title: How to get a contract role’s hash
description:
tags:
---

# How to get a contract role’s hash

At the current version (`5.10.1`), the SDK doesn’t export the method `getRoleHash` . If it ever does, the code below is all you need:

```tsx
import { getRoleHash } from "thirdweb/<something>";

const adminHash = getRoleHash("admin"); // "0x00000000..."
```

Otherwise, you can build a DIY version like this:

```tsx
import { isHex, padHex } from "thirdweb";
import { keccakId } from "thirdweb/utils";

const roleMap = {
  admin: "",
  transfer: "TRANSFER_ROLE",
  minter: "MINTER_ROLE",
  pauser: "PAUSER_ROLE",
  lister: "LISTER_ROLE",
  asset: "ASSET_ROLE",
  unwrap: "UNWRAP_ROLE",
  factory: "FACTORY_ROLE",
  signer: "SIGNER_ROLE",
  metadata: "METADATA_ROLE",
  revoke: "REVOKE_ROLE",
  migration: "MIGRATION_ROLE",
} as const;

type ThirdwebContractRole = keyof typeof roleMap;
type Hex = `0x${string}`; // the SDK @5.10.1 also doesn't export `type Hex`
type RoleInput = ThirdwebContractRole | Hex | (string & {});

export function getRoleHash(role: RoleInput) {
  if (isHex(role)) {
    return role;
  }
  // if it's a known thirdweb role, we convert it to the role hash
  if (isThirdwebContractRole(role)) {
    if (role === "admin") {
      return padHex("0x", { size: 32 });
    }
    return keccakId(roleMap[role]);
  }

  // otherwise we assume it's some other role and we pass it to keccakId to compute the role hash
  return keccakId(role);
  return roleHash;
}

// ---- Usage ----
const adminRoleHash = getRoleHash("admin"); // 0x00000...
const minterRoleHash = getRoleHash("minter");
```
