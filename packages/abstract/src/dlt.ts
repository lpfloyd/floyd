import {
  InterfaceTransactionOptions,
  InterfaceTransaction,
  InterfaceTransactionReceipt,
  InterfaceContractOptions,
  InterfaceContractDeployOptions,
  TypeAccount,
  TypeProvider,
  TypeDLT
} from "@floyd/utils";
import FloydSDK from "@floyd/core";
import AbstractProvider from "./provider";

/**
 * This class serves as the base class that maintains all implementation
 * details related to the blockchain.
 *
 * It handles accounts, subscriptions, transactions and contracts.
 *
 * @author Jeevan Pillay
 */
abstract class AbstractDLT {
  /** Provider configuration for the DLT */
  public provider: AbstractProvider;

  /** Name of the DLT */
  public name: string;

  /** Symbol used by the DLT */
  public symbol: string;

  /** Instance of the FloydSDK  */
  public sdk: any;

  /** This handles all the accounts in the DLT, whereby, the key is the address */
  public accounts: TypeAccount[] = new Array<TypeAccount>();

  /**
   * @param {FloydSDK} sdk
   * @param {TypeProvider} options
   */
  constructor(sdk: FloydSDK, options: TypeDLT) {
    this.sdk = sdk;
    this.provider = this.loadProvider(options.name, options.provider);
  }

  /**
   * Load the dlt to the Overledger SDK
   * @param {name} string
   * @param {provider} TypeProvider
   * @return {AbstractProvider}
   */
  public loadProvider(name: string, provider: TypeProvider): AbstractProvider {
    try {
      const dltprovider = require(`../../abstract/dlts/${name}/${name}.provider`)
        .default;
      return new dltprovider(provider);
    } catch (e) {
      if (e.code === "MODULE_NOT_FOUND") {
        throw new Error(
          `[Provider] The Provider for this DLT is not present, please add the provider for ${name} manually.`
        );
      } else {
        throw e;
      }
    }
  }

  /**
   * Build the transaction
   * // TODO: remove to and message params they should be included in TransactionOptions
   * @param {string} to
   * @param {string} message
   * @param {TransactionOptions} options
   */
  public abstract buildTransaction(
    options: InterfaceTransactionOptions
  ): InterfaceTransaction;

  /**
   * Sends a singed transaction to the blockchain
   * @param {string | Buffer} signature if string, must be prefixed with 0x, buffers will be automatically converted
   * @return {Promise<InterfaceTransactionReceipt>}
   */
  public abstract sendSignedTransaction(
    signature: string | Buffer
  ): Promise<InterfaceTransactionReceipt>;

  /**
   * Sends a transaction to the blockchain
   * @param {InterfaceTransaction} transaction
   * @return {Promise<InterfaceTransactionReceipt>}
   */
  public abstract sendTransaction(
    transaction: InterfaceTransaction
  ): Promise<InterfaceTransactionReceipt>;

  /**
   * Signs a transaction with the private key
   * @param {InterfaceTransaction} transaction the transaction to sign
   * @param {string | Buffer} pk the private key
   * @return {string} the raw transaction in string with 0x prefixed in front of it
   */
  public abstract signTransaction(
    transaction: InterfaceTransaction,
    pk: string | Buffer
  ): string;

  /**
   * Creates a new contract
   * // TODO: should return a standarised interface
   * @return {InterfaceContract}
   */
  public abstract createContract(options: InterfaceContractOptions): any;

  /**
   * Deploys the contract
   * // TODO: should not return promise any instead a defined interface
   * @return {any}
   */
  public abstract deployContract(
    args: InterfaceContractDeployOptions
  ): Promise<any>;

  /**
   * Creates a new account
   * @return {TypeAccount}
   */
  public abstract createAccount(): TypeAccount;

  /**
   * Convert private key to account
   * @return {TypeAccount}
   */
  public abstract privateKeyToAccount(pk: string): TypeAccount;

  /**
   * Adds account to the wallet manager
   * @param {TypeAccount?} account
   * @return {TypeAccount}
   */
  public abstract addAccount(account?: TypeAccount): TypeAccount;

  /**
   * Subscribe to certain blockchain events
   * @param {event} string
   * @return {boolean}
   */
  public abstract subscribe(event: string): boolean;

  /**
   * Clear all the subscriptions
   */
  public abstract clearSubscriptions(): boolean;
}

export default AbstractDLT;