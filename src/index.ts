import {parseJsonBody, parseBodyContent, throwException, resolveTask, toProxyResult} from './utils'
import {flow} from 'fp-ts/lib/function'
import {splitIntallments, saveInstallments} from './service'
import * as TE from 'fp-ts/lib/TaskEither'

export const handler = flow(
  parseJsonBody,
  parseBodyContent,
  TE.chain(splitIntallments),
  TE.chain(saveInstallments),
  TE.map(toProxyResult),
  TE.getOrElse(throwException),
  resolveTask,
)
