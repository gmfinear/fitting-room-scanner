const logOpts = {
    stage: 'prod',
    transports: ['apiGateway', 'piwik', 'console'],
    appName: 'Fitting Room Scanner',
    appVersion: '0.0.1',
    storeNumber: '5',
    deviceId: 'testDevice',
    piwikSiteId: 4,
    piwikApiKey: process.env.PIWIK_API_KEY,
    apiGatewayKey: process.env.API_GATEWAY_LOG_KEY,
  };
  
  const logger = VMLogger.browser(logOpts);

  export default logger;

  //EXAMPLE LOGS

  // logger.debug({
  //   source: 'app',
  //   type: 'init',
  //   description: 'App start-up',
  // });

    // logger.info({
  //   source: 'user',
  //   type: 'usage',
  //   description: 'App start-up',
  // });
