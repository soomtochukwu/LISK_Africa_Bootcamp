# Deliverables ✅

## Smart Contract(s)

- [**ArtNFT** NFT contract](https://sepolia-blockscout.lisk.com/token/0x43c73E1a22130737a0bA4B8e0825Be3347F565Df?tab=contract)
- [**CreatorRewad** token contract](https://sepolia-blockscout.lisk.com/token/0x6a5264A88a46412771119c49137A18aAcCf2EA76?tab=contract)

## Frontend App

- [**Cre8or**: front-end](https://cre8or.vercel.app/)

## GitHub Repo

- [**Cre8or**: repo](https://github.com/soomtochukwu/LISK_Africa_Bootcamp/tree/main/Assignments/week%206/lct%201%262/Cre8or)

---

## README

To the best of my knowledge, and based on my careful reading of the Week 6: Frontend Integration assignment memo/instructions, this submission fulfils all required deliverables.

---

## 🧠 Independent Decisions & Custom Implementations

In cases where the tutor did not provide explicit specifications, I made the following implementation decisions to ensure completeness and clarity:

### 1. 🖼️ Project Name

- **Cre8or**:   
  **Reason**: I decided to call this Assignment `Cre8or` - It sounds cool. The tutor also did not say anything about it.



### 2. 🖼️ Event Naming

- **Event Name**: `newArt`  
  **Reason**: The tutor did not specify a name for the event emitted when a new NFT is minted. I chose `newArt` for its clarity and relevance to the action.

### 3. 🎁 Creator Token Rewards

- **Reward Amount**: 26 `CT_AN`  
  **Reason**: Since the reward quantity was unspecified, I chose 26 to reflect the assignment's due date (26th of the month).

### 4. 🪙 Token Symbol Naming

- **NFT Symbol**: `AN` (ArtNFT)
- **ERC20 Symbol**: `CT_AN` (Creator Token for ArtNFT)  
  **Reason**: No specific symbols were given, so I selected intuitive and relevant identifiers for clarity and context.

### 5. 🛠️ Additional Custom Functions

- **Function Added**: `getAllMetadata()`  
  **Purpose**: Retrieves metadata for all minted NFTs and assists in fulfilling the deliverables effectively.

- **Function Added**: `updateArtNFTAddress(address _ArtNFT)`  
  **Purpose**: Allows the contract owner to update the address of the ArtNFT contract.

- **Function Added**: `setCreatorTokenAddress(address creatorToken_)`  
  **Purpose**: Enables the contract owner to set or update the CreatorToken contract address.
