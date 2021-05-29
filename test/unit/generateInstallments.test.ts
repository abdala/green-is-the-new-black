import {identity, pipe} from 'fp-ts/lib/function'
import {Positive} from '../../src/domain'
import {generateInstallments} from '../../src/service'
import {getOrError, throwException} from '../../src/utils'
import * as E from 'fp-ts/lib/Either'

const positive = (value: number) => pipe(value, getOrError(Positive), E.fold(throwException, identity))

const testData = [
  {
    amount: positive(100),
    installments: positive(1),
    response: [
      {amount: 100, installment: 1},
    ],
  },
  {
    amount: positive(100),
    installments: positive(2),
    response: [
      {amount: 50, installment: 1},
      {amount: 50, installment: 2},
    ],
  },
  {
    amount: positive(100),
    installments: positive(3),
    response: [
      {amount: 33, installment: 1},
      {amount: 33, installment: 2},
      {amount: 34, installment: 3},
    ],
  }
]

describe.each(testData)('It round and distribute the value', (data) => {
  it(`Amount: ${data.amount}, installments: ${data.installments}`, () => {
    const response = generateInstallments(data.amount, data.installments)()
    expect(response).toStrictEqual(data.response)
  })
})
