import fetch from 'node-fetch'
import {response} from '../fixtures/api-response'
import {event} from '../fixtures/api-gateway-proxy-event'

const endpoint = 'https://someaddress.io/split'

test('It splits the amount', async () => {
  await expect(fetch(endpoint, {
    method: 'POST',
    body: String(event.body),
  })).resolves.toStrictEqual(response)
})