import {getOrError} from './utils'
import {Installment, Positive} from './domain'
import {pipe} from 'fp-ts/lib/function'
import AWS from 'aws-sdk'
import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'

const client = new AWS.DynamoDB.DocumentClient()

export const getInstallmentConfiguration = (): TE.TaskEither<Error, number> => {
  return pipe(
    TE.tryCatch(async () => {
      return client.get({
        TableName: 'Configuration', 
        Key: {name: 'maxAllowedInstallment'}
      }).promise()
    }, E.toError),
    TE.chainEitherK((v) => getOrError(Positive)(v.Item?.value)),
  )
}

export const saveInstallment = (installment: Installment): TE.TaskEither<Error, void> => {
  return TE.tryCatch(async () => {
    await client.put({TableName: 'Installments', Item: installment}).promise()
  }, E.toError)
}
