const Blockchain = require("./blockchain");
const bitcoin = new Blockchain([], []);

function mining(bitcoin) {
  const lastBlock = bitcoin.getLastBlock();

  const prevBlockHash = lastBlock["hash"];

  const currentBlockData = {
    transactions: bitcoin.pendingTransactions,
    index: lastBlock["index"] + 1
  }

  const nonce = bitcoin.proofOfWork(
    prevBlockHash,
    currentBlockData
  );

  const blockHash = bitcoin.hashBlock(
    nonce,
    prevBlockHash,
    currentBlockData
  );

  bitcoin.createNewBlock(
    nonce,
    prevBlockHash,
    blockHash
  )
}

bitcoin.createNewTransaction(
  100, 
  "YUKI0909SLKLKLAKJD", 
  "MAKI0912KKJSBAMSKD"
)

mining(bitcoin);

bitcoin.createNewTransaction(
 200,
 "YUKI0909SLKLKLAKJD",
 "JUN00198LKAJLDJNLK"
);

mining(bitcoin);

bitcoin.createNewTransaction(
 300,
 "MAKI0912KKJSBAMSKD",
 "YUKI0909SLKLKLAKJD"
);

mining(bitcoin);

console.log(bitcoin);