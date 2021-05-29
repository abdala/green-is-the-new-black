import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import AWS from 'aws-sdk'

const client = new AWS.DynamoDB.DocumentClient()

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.body === null) {
    throw new Error('Body is empty')
  }

  const request = JSON.parse(event.body) as {readonly amount?: number; readonly installments?: number}

  if (request.installments === undefined || request.amount === undefined) {
    throw new Error('Invalid value')
  }

  if (request.installments < 1 || request.amount < 1) {
    throw new Error('Invalid value')
  }

  const maxAllowedInstallment = await client
    .get({TableName: 'Configuration', Key: {name: 'maxAllowedInstallment'}})
    .promise()

  if (request.installments > maxAllowedInstallment.Item?.value) {
    throw new Error('Invalid installment')
  }

  const installments: {amount: number; installment: number}[] = []

  for (let i = 1; i <= request.installments; i++) {
    const amount = Math.floor(request.amount / request.installments)
    const installment = {amount, installment: i}

    installments.push(installment)

    await client
      .put({TableName: 'Installments', Item: installment})
      .promise()
  }

  return {
    statusCode: 200,
    body: JSON.stringify(installments)
  }
}
