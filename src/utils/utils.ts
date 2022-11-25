import dayjs from 'dayjs';
import Big from 'big.js';
import {
  RelatedTransaction,
  RelatedTransactionType,
  RPCTransactionHarmony,
  TransactionExtraMark,
} from '../types';
import { getAddress } from './getAddress/GetAddress';
import { bridgeTokensMap } from 'src/config';

export const getQueryVariable = (variable: string, query: string) => {
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
};

export const isTokenBridged = (address: string) => !!bridgeTokensMap[address];

export const copyTextToClipboard = (value: string) => {
  const copyTextareaInput = document.createElement('textarea');
  copyTextareaInput.value = value;
  document.body.appendChild(copyTextareaInput);

  copyTextareaInput.focus();
  copyTextareaInput.select();

  try {
    document.execCommand('copy');
  } catch {
  } finally {
    document.body.removeChild(copyTextareaInput);
  }
};

export const mapBlockchainTxToRelated = (
  tx: RPCTransactionHarmony,
  type: RelatedTransactionType = 'transaction'
): RelatedTransaction => {
  const resultedTx = {
    ...tx,
    transactionType: type,
    address: '',
    transactionHash: tx.ethHash || tx.hash,
    timestamp: dayjs(+tx.timestamp * 1000).toString(),
    extraMark: TransactionExtraMark.normal,
  };
  if (tx.from) {
    resultedTx.from = getAddress(tx.from).basicHex;
  }
  if (tx.to) {
    resultedTx.to = getAddress(tx.to).basicHex;
  }
  if (typeof tx.value !== 'undefined') {
    resultedTx.value = Big(tx.value).toString();
  }
  return resultedTx;
};
