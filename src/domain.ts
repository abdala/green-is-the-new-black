import * as t from 'io-ts'

interface PositiveBrand {
  readonly Positive: unique symbol
}

export const Positive = t.brand(
  t.number,
  (n: number): n is t.Branded<number, PositiveBrand> => n > 0,
  'Positive'
)

export type Positive = t.TypeOf<typeof Positive>

export const SplitInstallmentRequest = t.readonly(
  t.type({
    amount: Positive,
    installments: Positive,
  })
)

export type SplitInstallmentRequest = t.TypeOf<typeof SplitInstallmentRequest>

export interface Installment {
  amount: number,
  installment: number,
}