/* @flow */
'use strict' // eslint-disable-line strict
const _ = require('lodash')
const {removeUndefined, dropsToXrp} = require('./utils')
import type {LedgerEntry} from './types.js'

function parseLedgerEntry (entry: Object): LedgerEntry {
  const ledgerVersion = parseInt(entry.ledger_index || entry.seqNum, 10)
  return removeUndefined({
    ledgerVersion: ledgerVersion,
    ledgerHash: entry.hash || entry.ledger_hash,
    ledgerEntryType: entry.node.LedgerEntryType,
    amount: dropsToXrp(entry.node.Amount),
    balance: dropsToXrp(entry.node.Balance),
    account: entry.node.Account,
    destination: entry.node.Destination,
    flags: entry.node.Flags,
    ownerNode: entry.node.OwnerNode,
    previousTransactionId: entry.node.PreviousTxnID,
    previousTransactionLedgerSequence: entry.node.PreviousTxnLgrSeq,
    publicKey: entry.node.PublicKey,
    settleDelay: entry.node.SettleDelay,
    sourceTag: entry.node.SourceTag,
    index: entry.node.index
  })
}

module.exports = parseLedgerEntry
