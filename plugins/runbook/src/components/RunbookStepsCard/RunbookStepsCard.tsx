import React from 'react';
import {
  InfoCard,
} from '@backstage/core-components';
import {
  useEntity,
} from '@backstage/plugin-catalog-react';
import { RunbookSteps } from '../RunbookSteps';
import { RunbookEntityV1alpha1 } from '@antoinedao/backstage-plugin-runbook-common';

export const RunbookStepsCard = () => {
  const { entity } = useEntity();

  return (
    <InfoCard
      title="Runbook Steps"
      subheader="Steps to follow in to complete the runbook"
    >
      <RunbookSteps runbook={entity as RunbookEntityV1alpha1} />
    </InfoCard>
  )
}
