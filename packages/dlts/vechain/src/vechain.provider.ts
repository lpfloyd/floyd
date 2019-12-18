import { AbstactProvider } from "@floyd/abstract";
import { TypeProvider } from "@floyd/utils";
import Web3 from "web3";
import { thorify } from "thorify";

export class VechainProvider extends AbstactProvider {
  /** @inheritdoc */
  constructor(options: TypeProvider) {
    super(options);
  }

  /** @inheritdoc */
  setProvider(url: string, timeout: number): void {
    this.instance = thorify(new Web3(url), url, timeout);
  }
}

export default VechainProvider;