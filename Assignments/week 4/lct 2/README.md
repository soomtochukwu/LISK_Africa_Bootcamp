> # Week 4 – Lecture 2 Assignment

> **Title:** Escrow Smart Contract?  
> **Assignment:** Using a simple escrow smart contract, write mocks for unit tests and Fuzz testing of the smart contract.
> **Instruction(s):**Submit a github repo of your smart contract and test files

---

## 🧠 What Is an Escrow?

In traditional finance, an **escrow** is a legal arrangement where a third party, known as an **arbiter** temporarily holds funds or assets on behalf of two other parties involved in a transaction. The third party only releases the assets once all predefined conditions are met. Escrow is often used in real estate, freelancing, marketplaces, and more to build trust between parties who may not fully know each other.

---

## 💡 What Is an Escrow Smart Contract?

An **escrow smart contract** is a blockchain-based version of a traditional escrow system. It replaces the need for a centralized third party by using **smart contract logic** on the blockchain to securely hold and release funds based on certain predefined rules or conditions.

This contract is typically written in Solidity (for Ethereum) and can:

- Accept funds from a payer (e.g., a buyer or client).
- Lock those funds securely on-chain.
- Release the funds to the payee (e.g., a seller or freelancer) **only** when both parties agree or when conditions (such as delivery confirmation) are met.
- Optionally return the funds if the terms are violated or the deal fails.

---

## 🎯 Why Use Escrow Smart Contracts?

- **Trustless Transactions**: No need to trust a centralized escrow service.
- **Transparency**: All logic is visible and verifiable on the blockchain.
- **Automation**: Reduces the risk of fraud or disputes, as execution is automatic.
- **Low Cost**: No middleman fees except gas costs.

---

## 💼 Example Use Case

A freelance marketplace where clients deposit funds into an escrow smart contract. The freelancer completes the job. If the client confirms the work is done, the contract releases the payment. If there’s a dispute, the smart contract can involve an arbitrator or refund the client depending on the outcome.

---
