import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import {pipe} from 'fp-ts/lib/function'
import {Decoder} from 'io-ts'
import {Task} from 'fp-ts/lib/Task'
import {failure} from 'io-ts/lib/PathReporter'
import {SplitInstallmentRequest} from './domain'
import {EOL} from 'os'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import * as J from 'fp-ts/lib/Json'

export const parseJsonBody = (event: APIGatewayProxyEvent): E.Either<Error, J.Json> => 
  pipe(
    event.body, 
    E.fromNullable(new Error('Body is empty')), 
    E.chain(J.parse), 
    E.mapLeft(E.toError)
  )

export const getOrError =
  <I, T>(decoder: Decoder<I, T>) =>
  (body: I): E.Either<Error, T> =>
    pipe(
      decoder.decode(body),
      E.mapLeft((e) => new Error(failure(e).join(EOL))),
    )

export const parseBodyContent = TE.fromEitherK(E.chain(getOrError(SplitInstallmentRequest)))

export const throwException = (e: Error): never => {
  throw e
}

export const toProxyResult = <T> (t: T): APIGatewayProxyResult => ({
  statusCode: 200,
  body: JSON.stringify(t),
})

export const resolveTask = <T> (t: Task<T>): Promise<T> => t()
