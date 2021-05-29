import nock from 'nock'
import AWS from 'aws-sdk'

AWS.config.update({maxRetries: 0})

nock.disableNetConnect()

export const hasPendingInterceptors = (): void => {
  if (! nock.isDone()) {
    console.log(nock.pendingMocks())
    throw new Error('Not all nock interceptors were used!')
  }
}

const partialBodyCheck = (expected) => (body: unknown) => {
  expect(body).toMatchObject(expected)
  return true
}

export const getItem = (request: AWS.DynamoDB.GetItemInput, response: AWS.DynamoDB.GetItemOutput): void => {
  nock('https://dynamodb.eu-west-1.amazonaws.com')
    .post('/', partialBodyCheck(request)).reply(200, response)
}

export const putItem = (request: AWS.DynamoDB.PutItemInput, response: AWS.DynamoDB.PutItemOutput = {}): void => {
  nock('https://dynamodb.eu-west-1.amazonaws.com')
    .post('/', partialBodyCheck(request)).reply(200, response)
}
