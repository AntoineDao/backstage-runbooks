import React from 'react';
import { Typography, Grid, Chip, Accordion, AccordionSummary } from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore'
import {
  InfoCard,
} from '@backstage/core-components';
import { useEntity, useRelatedEntities } from '@backstage/plugin-catalog-react';
import { RELATION_USES_RUNBOOK, RunbookEntityV1alpha1 } from '@antoinedao/backstage-plugin-runbook-common';
import { RunbookSteps } from '../RunbookSteps';

export const EntityRunbooks = () => {
  const { entity } = useEntity()

  const { entities, loading } = useRelatedEntities(entity, { type: RELATION_USES_RUNBOOK })

  return (

    <Grid container spacing={3} direction="column">
      {loading && <Typography>Loading...</Typography>}
      {entities?.map((ent) => {
        const runbook = ent as RunbookEntityV1alpha1
        const tagChips = runbook.metadata.tags?.map(tag => <Chip key={tag} label={tag} variant='outlined' />)
        return (
          <Grid item key={runbook.metadata.uid}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Grid container justifyContent='space-between' direction="row">
                  <Grid item>
                    <Typography variant='h5'>{runbook.metadata.title || runbook.metadata.name}</Typography>
                    <Typography variant='subtitle1'>{runbook.metadata.description}</Typography>
                  </Grid>
                  <Grid item>
                    {tagChips}
                  </Grid>
                </Grid>
              </AccordionSummary>
              <InfoCard>
                <RunbookSteps runbook={runbook} />
              </InfoCard>
            </Accordion>
          </Grid>
        )
      })}
    </Grid>
  )
}
