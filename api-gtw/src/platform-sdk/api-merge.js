const fs = require('fs');
const _ = require('lodash');
const axios = require('axios');
const dotenv = require('dotenv');
const exec = require('child-process-promise').exec;

dotenv.config();
const serviceNameTribeMap = {
  shield: 'IAM',
  marketo: 'CMS',
  revenue: 'RMS',
  stay: 'GMS',
  villa: 'PMS',
  finance: 'FMS',
};

dotenv.config();
const service = process.argv[2];
const key = `${
  serviceNameTribeMap[service]
}_SERVICE_${service.toUpperCase()}_URL`;

const baseURL = process.env[key] || process.env.PLATFORM_GATEWAY_URL;
console.log({ baseURL });
const sdk = axios.create({ baseURL });

const fetch = async () => {
  console.log({ service });

  const response = await sdk.get(`/services/${service}/api/docs-json`);

  const swaggerJsonFilePath = `src/platform-sdk/open-api-spec.${service}.json`;
  fs.writeFileSync(swaggerJsonFilePath, JSON.stringify(response.data));

  const outputFolder = `src/platform-sdk/${service}`;
  exec(
    `./node_modules/.bin/openapi --input ${swaggerJsonFilePath} --output ${outputFolder} --postfixServices 'API' --client axios`,
  );
};

fetch();
