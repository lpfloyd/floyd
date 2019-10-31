import AbstactProvider from '../provider';
import { TypeProvider } from '../../../types';

export class EthereumProvider extends AbstactProvider {
    constructor(options: TypeProvider) {
        super(options);
    }
    createProvider(options: Object): void {
        // throw new Error('Method not implemented.');
    }
}

export default EthereumProvider;