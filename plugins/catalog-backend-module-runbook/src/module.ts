import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';
import { catalogProcessingExtensionPoint } from '@backstage/plugin-catalog-node/alpha';
import { RunbookEntityProcessor } from './processor';

export const catalogModuleRunbook = createBackendModule({
  pluginId: 'catalog',
  moduleId: 'runbook',
  register(reg) {
    reg.registerInit({
      deps: {
        logger: coreServices.logger,
        catalog: catalogProcessingExtensionPoint,
      },
      async init({ logger, catalog }) {
        logger.info('Starting the catalog runbook module');
        catalog.addProcessor(new RunbookEntityProcessor({ logger }));
      },
    });
  },
});
