# 🚀 Dispatches - Decentralized Logistics Platform

## 📌 Overview
**Dispatches** is a Web3-powered decentralized logistics platform that enables **instant** and **scheduled** deliveries with **on-chain tracking, lower fees, and secure transactions** via smart contracts on **Scroll Sepolia**.

Traditional logistics platforms suffer from **high fees, lack of transparency, and security concerns** due to centralization. **Dispatches eliminates intermediaries** by leveraging **blockchain technology, Filebase (IPFS alternative), and decentralized smart contracts.**

---

## 🎯 Problem Statement
Current delivery platforms have major issues:
- 🚚 **High fees** due to centralized intermediaries.
- 🔍 **Lack of transparency** in tracking and payments.
- 🔒 **Security risks** and data privacy concerns.
- ⚡ **No decentralized solution** for direct payments and fair transactions.

**Dispatches solves these issues by introducing a trustless, transparent, and efficient delivery system powered by blockchain technology.**

---

## 💡 Features
### 🛠 Core Features
✅ **Instant & Scheduled Deliveries** – Users can select their preferred delivery mode.
✅ **Smart Contract-Powered Logistics** – Ensuring tamper-proof tracking & payment automation.
✅ **Decentralized Order Storage** – Order details are stored securely on **Filebase (IPFS alternative)**.
✅ **Transparent Pricing** – No hidden fees, real-time cost calculation based on distance & delivery type.
✅ **Escrow System** – Smart contracts hold payments until delivery confirmation.
✅ **On-Chain Rider Reputation System** – Verifiable, blockchain-based ratings for delivery partners.

### 🔒 Security & Transparency
- **End-to-End Smart Contracts** – Immutable, verifiable transaction records.
- **Decentralized Payments** – Crypto payments processed on **Scroll Sepolia**.
- **Tamper-Proof Order Data** – Stored securely using **Filebase (IPFS alternative)**.

---

## 🔄 How It Works
1️⃣ **User selects** **Instant** or **Scheduled Delivery** and enters pickup/drop-off locations.
2️⃣ **Delivery details are hashed & stored** on **Filebase**.
3️⃣ **Smart contract processes** payment and assigns riders.
4️⃣ **Order is updated** as it progresses, **trackable on-chain**.
5️⃣ **Funds are released** to the rider **upon successful delivery confirmation**.

---

## 🏗 Technical Architecture
### 🔹 Tech Stack
| Layer | Technology |
|---|---|
| **Frontend** | React Native, Wagmi SDK |
| **Backend** | Smart Contracts on Scroll Sepolia |
| **Storage** | Filebase (IPFS Alternative) |
| **Payments** | Crypto Transactions via Smart Contracts |

### 🔹 Smart Contract Functions
```solidity
function registerOrder(string memory orderID, string memory ipfsHash) public;
function assignRider(string memory orderID, address riderAddress) public;
function confirmDelivery(string memory orderID) public;
function refundUser(string memory orderID) public;
```
---

## 🔗 Blockchain & Smart Contract Details
- **Network**: Scroll Sepolia
- **Contract Address**: `0xD5d1f49dACf70b30f27d363BF2cE66A464b2b5e3`
- **Explorer**: [View on Scroll Sepolia Explorer](https://sepolia.scroll.io/)
- **Filebase Storage**: Decentralized order storage

---

## 🏁 Getting Started
### 🔧 Prerequisites
Ensure you have the following installed:
- **Node.js** (v18+)
- **Yarn** or **npm**
- **React Native**
- **Metamask / WalletConnect**
- **Scroll Sepolia Faucet for test funds**

### 🚀 Installation & Setup
Clone the repository:
```bash
git clone https://github.com/dispaches/reactNative.git
cd dispatches
```

Install dependencies:
```bash
yarn install   # or npm install
```

Run the application:
```bash
expo start   # For React Native development
```

### 🔗 Connecting to Scroll Sepolia
1. **Get test funds** from [Scroll Sepolia Faucet](https://sepolia.scroll.io/).
2. **Add Scroll Sepolia** to Metamask.
3. **Deploy smart contract** using Hardhat/Remix.

---

## 📡 Deployment
### 🔴 Deploying Smart Contract
Run the following command to deploy the contract to **Scroll Sepolia**:
```bash
yarn hardhat run scripts/deploy.js --network sepolia
```

### 🌍 Deploying Frontend
Use Expo for deployment:
```bash
expo build:android   # Android build
expo build:ios       # iOS build
npx expo start
```
---

## 📌 Future Enhancements
- 🌎 **Multi-chain support** (Ethereum, Polygon, Base)
- 🎟 **NFT-based delivery tracking**
- 🤖 **AI-powered route optimization**
- 💳 **Fiat & crypto payment integration**

---

## 📞 Contact & Contributions
💡 Found an issue? **Open a pull request** or **report a bug**!
📩 Email: `covenantekundayo@gmail.com `
🐙 GitHub: [Dispatches Repository](https://github.com/dispaches/reactNative.git)
🔗 Scroll Sepolia Explorer: [View Contract](https://sepolia.scrollscan.com/address/0xD5d1f49dACf70b30f27d363BF2cE66A464b2b5e3)

🚀 **Join us in revolutionizing logistics with Web3!**

