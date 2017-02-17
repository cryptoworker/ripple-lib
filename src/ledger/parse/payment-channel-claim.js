/* @flow */
'use strict' // eslint-disable-line strict
const assert = require('assert')
const utils = require('./utils')
const parseAmount = require('./amount')
const claimFlags = utils.txFlags.PaymentChannelClaim

function parsePaymentChannelClaim(tx: Object): Object {
  assert(tx.TransactionType === 'PaymentChannelClaim')

  return utils.removeUndefined({
    channel: tx.Channel,
    balance: tx.Balance && parseAmount(tx.Balance),
    amount: tx.Amount && parseAmount(tx.Amount),
    signature: tx.Signature,
    publicKey: tx.PublicKey,
    renew: Boolean(tx.Flags & claimFlags.Renew),
    close: Boolean(tx.Flags & claimFlags.Close)
  })
}

module.exports = parsePaymentChannelClaim
