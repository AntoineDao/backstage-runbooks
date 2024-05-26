import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { runbookPlugin, RunbookPage } from '../src/plugin';

createDevApp()
  .registerPlugin(runbookPlugin)
  .addPage({
    element: <RunbookPage />,
    title: 'Root Page',
    path: '/runbook',
  })
  .render();
