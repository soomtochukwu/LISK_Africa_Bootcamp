> # 📄 My Escrow Smart Contract Documentation

**Assignment:** Using a simple escrow smart contract, write mocks for unit tests and Fuzz testing of the smart contract. <br>
**Instruction(s):** Submit a github repo of your smart contract and test files  
**Author:** MaziOfW3b

---

## 🧠 Overview

This smart contract represents a unique form of **escrow protocol** tailored to a contract-based asset sale. It facilitates secure peer-to-peer transfers of ownership using Ethereum, under the supervision of an **arbiter**. The contract manages ownership, buyer interest, price enforcement, and secure fund release or refund.

---

## 🔐 Roles

- **Owner:** The current holder of the contract/asset (initially the contract deployer).
- **Buyer:** A new user interested in purchasing the asset.
- **Arbiter:** A trusted third party responsible for releasing or refunding funds.

---

## 💵 Workflow

### 1. **Deployment**

- The contract is deployed by the `owner`, who also sets the `arbiter`.

### 2. **Buyer Interaction**

- A user (not owner or arbiter) sends **exactly 0.003 ETH** via `buyTheContractFor0_003ETH()` to signal intent to buy.
- Buyer’s address is recorded and funds are held in escrow.
- Buyer can confirm or cancel their interest using `stillInterested()` or `noLongerInterested()`.

### 3. **Ownership Transfer**

- The current `owner` calls `sellEscrowContract()`, which:
  - Checks if the buyer still has interest.
  - Transfers ownership to the buyer.
  - Stores the previous owner.

### 4. **Escrow Completion**

- If all conditions are met, the **arbiter** can:
  - Call `releaseFunds()` → funds go to `prevOwner` (old owner).
  - Call `refundBuyer()` → funds go back to `buyer` if interest is canceled.

---

## 🔐 Access Control

| Function               | Access       | Description                           |
| ---------------------- | ------------ | ------------------------------------- |
| `buyTheContract...()`  | Buyer only   | Pays 0.003 ETH and sets buyer address |
| `stillInterested()`    | Buyer only   | Marks interest = true                 |
| `noLongerInterested()` | Buyer only   | Marks interest = false                |
| `setPrice()`           | Owner only   | Updates the asking price              |
| `sellEscrowContract()` | Owner only   | Transfers ownership to buyer          |
| `releaseFunds()`       | Arbiter only | Sends escrow to prevOwner             |
| `refundBuyer()`        | Arbiter only | Refunds buyer if they lost interest   |

---

## 💡 Key Variables

- `owner`: current contract owner.
- `prevOwner`: former owner who should receive funds.
- `buyer`: current interested party.
- `arbiter`: trusted third-party.
- `price`: cost of the contract (fixed at 0.003 ETH).
- `interest`: true/false indicator for buyer's intent.
- `isFunded`: true if buyer has sent funds.
- `isReleased`: true if funds have been released.

---

## 📌 Notes

- Buyers **must** be different from both owner and arbiter.
- Funds are only released if buyer's interest remains true.
- The arbiter acts as a safeguard for fair execution.

---

## ✅ Summary

This escrow smart contract mimics a digital asset sale where the current owner sells the contract to an interested buyer. The logic ensures funds are only released after all conditions are met, with a neutral arbiter mediating the transfer. It's a simplified but practical exercise in understanding conditional fund locking and role-based smart contract design in Web3.
