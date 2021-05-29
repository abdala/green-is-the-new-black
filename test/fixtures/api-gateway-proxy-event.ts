import {APIGatewayProxyEvent} from 'aws-lambda'

export const event: APIGatewayProxyEvent = {
  resource: '/',
  path: '/',
  httpMethod: 'GET',
  requestContext: {
    authorizer: {},
    protocol: 'HTTP',
    requestTimeEpoch: 1583817383220,
    path: '/dev/',
    accountId: '125002137610',
    resourceId: 'qdolsr1yhk',
    stage: 'dev',
    requestId: '0f2431a2-6d2f-11e7-b799-5152aa497861',
    identity: {
      apiKeyId: '',
      principalOrgId: '',
      cognitoIdentityPoolId: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      apiKey: '',
      sourceIp: '50.129.117.14',
      accessKey: null,
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
      user: null,
    },
    resourcePath: '/',
    httpMethod: 'POST',
    apiId: 'j3azlsj0c4',
  },
  headers: {
    accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding': 'gzip, deflate, br',
    Host: '70ixmpl4fl.execute-api.us-east-2.amazonaws.com',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
    'X-Amzn-Trace-Id': 'Root=1-5e66d96f-7491f09xmpl79d18acf3d050',
  },
  multiValueHeaders: {
    accept: [
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    ],
    'accept-encoding': ['gzip, deflate, br'],
  },
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  body: `{"amount": 100.00, "installments": 2}`,
  isBase64Encoded: false,
}
