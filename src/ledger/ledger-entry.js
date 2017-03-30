/* @flow */
'use strict' // eslint-disable-line strict
const _ = require('lodash')
const utils = require('./utils')
const {validate} = utils.common
const parseLedgerEntry = require('./parse/ledger-entry')
import type {LedgerEntry} from './types.js'

function getLedgerEntry(index: string, options: ): Promise<LedgerEntry> {
  const request = {
    command: 'ledger_entry',
    index: index,
    binary: false
  }

  return this.connection.request(request)
    .then(parseLedgerEntry)
    .catch(error => {
      return convertError(this.connection, _options, error).then(_error => {
        throw _error
      })
    })
}

module.exports = getLedgerEntry
