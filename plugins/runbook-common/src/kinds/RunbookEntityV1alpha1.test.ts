import { runbookEntityV1alpha1Validator, RunbookEntityV1alpha1 } from './RunbookEntityV1alpha1';


describe('RunbookEntityV1alpha1Validator', () => {
  let entity: RunbookEntityV1alpha1;

  beforeEach(() => {
    entity = {
      apiVersion: 'backstage.io/v1alpha1',
      kind: 'Runbook',
      metadata: {
        name: 'test',
      },
      spec: {
        owner: 'me',
        steps: [
          {
            name: 'step1',
            description: 'Step 1',
            command: 'command1',
          },
          {
            name: 'step2',
            description: 'Step 2',
            command: 'command2',
          },
        ],
      },
    };
  });

  it('happy path: accepts valid data', async () => {
    expect(runbookEntityV1alpha1Validator(entity)).toBe(entity);
  });

  it('silently accepts v1beta1 as well', async () => {
    (entity as any).apiVersion = 'backstage.io/v1beta1';
    expect(runbookEntityV1alpha1Validator(entity)).toBe(entity);
  });

  it('ignores unknown apiVersion', async () => {
    (entity as any).apiVersion = 'backstage.io/v1beta0';
    expect(runbookEntityV1alpha1Validator(entity)).toBe(false);
  });

  it('ignores unknown kind', async () => {
    (entity as any).kind = 'Wizard';
    expect(runbookEntityV1alpha1Validator(entity)).toBe(false);
  });

  it('rejects missing owner', async () => {
    delete (entity as any).spec.owner;
    expect(() => runbookEntityV1alpha1Validator(entity)).toThrow(
      /owner/,
    );
  });

  it('rejects wrong owner', async () => {
    (entity as any).spec.owner = 7;
    expect(() => runbookEntityV1alpha1Validator(entity)).toThrow(
      /owner/,
    );
  });

  it('rejects missing steps', async () => {
    delete (entity as any).spec.steps;
    expect(() => runbookEntityV1alpha1Validator(entity)).toThrow(
      /steps/,
    );
  });

  it('rejects wrong steps', async () => {
    (entity as any).spec.steps = 7;
    expect(() => runbookEntityV1alpha1Validator(entity)).toThrow(
      /steps/,
    );
  });

  it('rejects empty steps', async () => {
    (entity as any).spec.steps = [];
    expect(() => runbookEntityV1alpha1Validator(entity)).toThrow(
      /steps/,
    );
  });

  it('accepts missing step name', async () => {
    delete (entity as any).spec.steps[0].name;
    expect(runbookEntityV1alpha1Validator(entity)).toBe(entity);
  });

  it('rejects wrong step name', async () => {
    (entity as any).spec.steps[0].name = 7;
    expect(() => runbookEntityV1alpha1Validator(entity)).toThrow(
      /name/,
    );
  });

  it('rejects missing step description', async () => {
    delete (entity as any).spec.steps[0].description;
    expect(() => runbookEntityV1alpha1Validator(entity)).toThrow(
      /description/,
    );
  });

  it('rejects wrong step description', async () => {
    (entity as any).spec.steps[0].description = 7;
    expect(() => runbookEntityV1alpha1Validator(entity)).toThrow(
      /description/,
    );
  });

  it('accepts missing step command', async () => {
    delete (entity as any).spec.steps[0].command;
    expect(runbookEntityV1alpha1Validator(entity)).toBe(entity);
  });

  it('rejects wrong step command', async () => {
    (entity as any).spec.steps[0].command = 7;
    expect(() => runbookEntityV1alpha1Validator(entity)).toThrow(
      /command/,
    );
  });
});