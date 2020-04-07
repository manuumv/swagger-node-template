import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDoc } from '../resolve';
import * as controllers from '../controllers';
import { connector } from 'swagger-routes-express';

export const swaggerInitialization = async (appDoc: Application) => {
  try {
    const doc = await swaggerDoc();
    const connect = connector(controllers, doc);
    connect(appDoc);
    appDoc.use('/', swaggerUi.serve, swaggerUi.setup(doc));
  } catch (error) {
    console.info(error);
  }
};
