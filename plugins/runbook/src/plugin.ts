import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const runbookPlugin = createPlugin({
  id: 'runbook',
  routes: {
    root: rootRouteRef,
  },
});

export const EntityRunbooks = runbookPlugin.provide(
  createRoutableExtension({
    name: 'EntityRunbooks',
    component: () =>
      import('./components/EntityRunbooks').then(m => m.EntityRunbooks),
    mountPoint: rootRouteRef,
  }),
);

export const RunbookStepsCard = runbookPlugin.provide(
  createRoutableExtension({
    name: 'RunbookStepsCard',
    component: () =>
      import('./components/RunbookStepsCard').then(m => m.RunbookStepsCard),
    mountPoint: rootRouteRef,
  }),
);