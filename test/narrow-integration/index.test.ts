import {handler} from '../../src'
import {event} from '../fixtures/api-gateway-proxy-event'
import {response} from '../fixtures/api-response'
import {
  maxAllowedInstallmentRequest,
  maxAllowedInstallmentResponse,
  installmentsPutItemRequest,
} from '../fixtures/dynamodb'
import * as netmock from './network-mock'

afterEach(netmock.hasPendingInterceptors)

test('It splits the amount', async () => {
  netmock.getItem(maxAllowedInstallmentRequest(), maxAllowedInstallmentResponse(2))

  netmock.putItem(installmentsPutItemRequest(response[0]))
  netmock.putItem(installmentsPutItemRequest(response[1]))

  await expect(handler(event)).resolves.toStrictEqual({
    statusCode: 200,
    body: JSON.stringify(response)
  })
})

test('It throws an exception for empty body', async () => {
  await expect(handler({...event, body: null})).rejects.toThrowError('Body is empty')
})

test('It throws an exception for invalid body', async () => {
  const body = '{"a": 1, "b": 1}'
  await expect(handler({...event, body})).rejects.toThrowError('Invalid value')
})

test('It throws an exception for non-positive values', async () => {
  const body = '{"amount": 0, "installments": 0}'
  await expect(handler({...event, body})).rejects.toThrowError()
})

test('It throws an exception when exceed max number of installments', async () => {
  netmock.getItem(maxAllowedInstallmentRequest(), maxAllowedInstallmentResponse(1))
  await expect(handler(event)).rejects.toThrowError('Invalid installment')
})
