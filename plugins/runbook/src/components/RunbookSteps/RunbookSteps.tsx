import React from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider } from '@material-ui/core';
import { RunbookEntityV1alpha1 } from '@antoinedao/backstage-plugin-runbook-common';

interface RunbookStepsProps {
  runbook: RunbookEntityV1alpha1;
}

export const RunbookSteps = (props: RunbookStepsProps) => {
  const { runbook } = props;
  return (
    <List>
      {runbook.spec.steps.map((step, index) => (
        <>
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>
                {index + 1}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={step.name} secondary={
              <>
                <div>{step.description}</div>
                <pre>{step.command}</pre>
              </>
            } />
          </ListItem>
          <Divider variant='inset' component='li' />
        </>
      ))}
    </List>
  )
}
