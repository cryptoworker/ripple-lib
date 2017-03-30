'use strict' // eslint-disable-line strict

function verifyPaymentChannelClaim(options: Object): Object {
  const channelId = options.channelId
  const signature = options.signature
  const claim = options.claim
  const amount = options.amount /* should this be extracted or autofilled from the claim? */

  
}
