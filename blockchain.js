const sha256 = require("sha256");

class Blockchain {
  constructor(chain, pendingTransactions) {
    this.chain = chain;
    this.pendingTransactions = pendingTransactions;
    this.createNewBlock(100, "0", "0");
  }

  createNewBlock(nonce, prevBlockHash, hash) {
    const newBlock = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.pendingTransactions,
      nonce,
      hash,
      prevBlockHash
    }
  
    this.pendingTransactions = [];
    this.chain.push(newBlock);
  
    return newBlock;
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  createNewTransaction(amount, sender, recipient) {
    const newTransaction = {
      amount,
      sender,
      recipient
    };

    this.pendingTransactions.push(newTransaction);

    return this.getLastBlock()["index"] + 1;
  }

  hashBlock(nonce, prevBlockHash, currentBlockData) {
    const dataString = prevBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataString);

    return hash;
  }

  proofOfWork(prevBlockHash, currentBlockData) {
    let nonce = 0;
    let hash = this.hashBlock(nonce, prevBlockHash, currentBlockData);

    // itereate until the 4 digits from the top of the hash gets "0000"
    while (hash.substring(0, 4) !== "0000") {
      nonce++;
      hash = this.hashBlock(nonce, prevBlockHash, currentBlockData);
    }

    return nonce;
  }
}

module.exports = Blockchain;