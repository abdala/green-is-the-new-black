import {Installment, Positive, SplitInstallmentRequest} from './domain'
import {getInstallmentConfiguration, saveInstallment} from './repository'
import {pipe} from 'fp-ts/lib/function'
import * as A from 'fp-ts/lib/Array'
import * as TE from 'fp-ts/lib/TaskEither'

const validateMaxInstallments = (installments: Positive) =>
  TE.fromPredicate(
    (maxAllowedInstallment: number) => installments <= maxAllowedInstallment,
    () => new Error('Invalid installment'),
  )

const addRemainderToLastAmount = (amount: Positive) => (installments: Installment[]) => pipe(
  installments,
  A.reduce(0, (accumulator, current) => accumulator + current.amount),
  (total) => amount - total,
  (remainder) => {
    const lastIndex = installments.length - 1
    const lastItem = installments[lastIndex]
    return A.unsafeUpdateAt(lastIndex, {
      amount: lastItem.amount + remainder, 
      installment: lastItem.installment,
    }, installments)
  }
)

export const generateInstallments = (amount: Positive, installments: Positive) => (): Installment[] =>
  pipe(
    A.makeBy(installments, (installment) => ({
      amount: Math.floor(amount / installments),
      installment: installment + 1,
    })),
    addRemainderToLastAmount(amount),
  )

export const splitIntallments = (request: SplitInstallmentRequest): TE.TaskEither<Error, Installment[]> => {
  return pipe(
    getInstallmentConfiguration(),
    TE.chain(validateMaxInstallments(request.installments)),
    TE.map(generateInstallments(request.amount, request.installments)),
  )
}

export const saveInstallments = (installments: Installment[]): TE.TaskEither<Error, Installment[]> => {
  return pipe(
    installments,
    A.map(saveInstallment),
    A.sequence(TE.ApplicativeSeq),
    TE.map(() => installments),
  )
}
