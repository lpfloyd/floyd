interface InterfaceTransactionOptions {
  nonce?: number;
  value?: number;
  gasPrice?: number;
  gas?: number;
}

interface InterfaceEthereumTransactionOptions
  extends InterfaceTransactionOptions {
  from: string;
  to?: string;
  data?: string;
}

interface InterfaceVechainTransactionOptions
  extends InterfaceTransactionOptions {
  blockRef?: string;
  expiration?: number;
  dependsOn?: string;
  chainTag?: number;
  clauses: Array<{
    to: string;
    value: number;
    data: string;
  }>;
}

interface InterfaceBinanceTransactionOptions
  extends InterfaceTransactionOptions {}

export {
  InterfaceTransactionOptions,
  InterfaceEthereumTransactionOptions,
  InterfaceVechainTransactionOptions,
  InterfaceBinanceTransactionOptions
};