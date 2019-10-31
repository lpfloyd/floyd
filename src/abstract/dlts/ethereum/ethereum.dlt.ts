import AbstractDLT from "../dlt";
import { TypeDLT } from "../../../types/sdk";

class Ethereum extends AbstractDLT {
  /** @inheritdoc */
  name: string = "ethereum";
  
  /** @inheritdoc */
  symbol: string = "eth";

  /** @inheritdoc */
  constructor(sdk: any, options: TypeDLT) {
    super(sdk, options);
  }
}

export default Ethereum;
