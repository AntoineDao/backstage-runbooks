import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { runbookPlugin, RunbookStepsCard } from '../src/plugin';

createDevApp()
  .registerPlugin(runbookPlugin)
  .addPage({
    element: <RunbookStepsCard />,
    title: 'Root Page',
    path: '/runbook',
  })
  .render();
