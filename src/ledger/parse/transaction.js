/* @flow */
'use strict' // eslint-disable-line strict
const assert = require('assert')
const utils = require('./utils')
const parsePayment = require('./payment')
const parseTrustline = require('./trustline')
const parseOrder = require('./order')
const parseOrderCancellation = require('./cancellation')
const parseSettings = require('./settings')
<<<<<<< HEAD
const parseEscrowCreation = require('./escrow-creation')
const parseEscrowExecution = require('./escrow-execution')
const parseEscrowCancellation = require('./escrow-cancellation')
=======
const parseSuspendedPaymentCreation = require('./suspended-payment-creation')
const parseSuspendedPaymentExecution = require('./suspended-payment-execution')
const parseSuspendedPaymentCancellation =
  require('./suspended-payment-cancellation')
const parsePaymentChannelCreate = require('./payment-channel-create')
const parsePaymentChannelFund = require('./payment-channel-fund')
const parsePaymentChannelClaim = require('./payment-channel-claim')
>>>>>>> Add transactions for payment channels
const parseFeeUpdate = require('./fee-update')
const parseAmendment = require('./amendment')

function parseTransactionType(type) {
  const mapping = {
    Payment: 'payment',
    TrustSet: 'trustline',
    OfferCreate: 'order',
    OfferCancel: 'orderCancellation',
    AccountSet: 'settings',
    SetRegularKey: 'settings',
<<<<<<< HEAD
    EscrowCreate: 'escrowCreation',
    EscrowFinish: 'escrowExecution',
    EscrowCancel: 'escrowCancellation',
=======
    SuspendedPaymentCreate: 'suspendedPaymentCreation',
    SuspendedPaymentFinish: 'suspendedPaymentExecution',
    SuspendedPaymentCancel: 'suspendedPaymentCancellation',
    PaymentChannelCreate: 'paymentChannelCreate',
    PaymentChannelFund: 'paymentChannelFund',
    PaymentChannelClaim: 'paymentChannelClaim',
>>>>>>> Add transactions for payment channels
    SignerListSet: 'settings',
    SetFee: 'feeUpdate',          // pseudo-transaction
    EnableAmendment: 'amendment'  // pseudo-transaction
  }
  return mapping[type] || null
}

function parseTransaction(tx: Object): Object {
  const type = parseTransactionType(tx.TransactionType)
  const mapping = {
    'payment': parsePayment,
    'trustline': parseTrustline,
    'order': parseOrder,
    'orderCancellation': parseOrderCancellation,
    'settings': parseSettings,
<<<<<<< HEAD
    'escrowCreation': parseEscrowCreation,
    'escrowExecution': parseEscrowExecution,
    'escrowCancellation': parseEscrowCancellation,
=======
    'suspendedPaymentCreation': parseSuspendedPaymentCreation,
    'suspendedPaymentExecution': parseSuspendedPaymentExecution,
    'suspendedPaymentCancellation': parseSuspendedPaymentCancellation,
    'paymentChannelCreate': parsePaymentChannelCreate,
    'paymentChannelFund': parsePaymentChannelFund,
    'paymentChannelClaim': parsePaymentChannelClaim,
>>>>>>> Add transactions for payment channels
    'feeUpdate': parseFeeUpdate,
    'amendment': parseAmendment
  }
  const parser = mapping[type]
  assert(parser !== undefined, 'Unrecognized transaction type')
  const specification = parser(tx)
  const outcome = utils.parseOutcome(tx)
  return utils.removeUndefined({
    type: type,
    address: tx.Account,
    sequence: tx.Sequence,
    id: tx.hash,
    specification: utils.removeUndefined(specification),
    outcome: outcome ? utils.removeUndefined(outcome) : undefined
  })
}

module.exports = parseTransaction
