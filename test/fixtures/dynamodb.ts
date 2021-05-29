import {DynamoDB} from 'aws-sdk'

export const maxAllowedInstallmentRequest = (): DynamoDB.GetItemInput => ({
  TableName: 'Configuration',
  Key: DynamoDB.Converter.marshall({
    name: 'maxAllowedInstallment',
  }),
})

export const maxAllowedInstallmentResponse = (installments: number): DynamoDB.GetItemOutput => ({
  Item: DynamoDB.Converter.marshall({
    name: 'maxAllowedInstallment',
    value: installments,
  }),
})

export const installmentsPutItemRequest = (item: Record<string, unknown>): DynamoDB.PutItemInput => ({
  TableName: 'Installments',
  Item: DynamoDB.Converter.marshall(item),
})
