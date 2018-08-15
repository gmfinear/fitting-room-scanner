import React from 'react';
import ReactDOM from 'react-dom';
import FittingRoom from './components/FittingRoom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const logOpts = {
  stage: 'prod',
  transports: ['apiGateway', 'piwik', 'console'],
  appName: 'Fitting Room Scanner',
  appVersion: '0.0.1',
  storeNumber: '805',
  deviceId: 'testDevice',
  piwikSiteId: 4,
  piwikApiKey: process.env.PIWIK_API_KEY,
  apiGatewayKey: process.env.API_GATEWAY_LOG_KEY,
};

const logger = VMLogger.browser(logOpts);

logger.debug({
  source: 'app',
  type: 'init',
  description: 'App start-up',
});

ReactDOM.render(<FittingRoom />, document.getElementById('app'))