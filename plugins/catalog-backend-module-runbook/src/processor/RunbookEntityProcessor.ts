import {
  CatalogProcessor,
  CatalogProcessorEmit,
  processingResult,
} from '@backstage/plugin-catalog-node';
import {
  LoggerService,
} from '@backstage/backend-plugin-api';
import {
  Entity,
  parseEntityRef,
  getCompoundEntityRef,
  RELATION_OWNED_BY,
  RELATION_OWNER_OF,
} from '@backstage/catalog-model';
import { LocationSpec } from '@backstage/plugin-catalog-common';
import {
  RunbookEntityV1alpha1,
  runbookEntityV1alpha1Validator,
  ComponentEntityWithRunbooks,
  ResourceEntityWithRunbooks,
  RELATION_RUNBOOK_USED_BY,
  RELATION_USES_RUNBOOK
} from '@antoinedao/backstage-plugin-runbook-common';


// A processor that reads from the fictional System-X
export class RunbookEntityProcessor implements CatalogProcessor {
  logger: LoggerService;

  constructor(options: { logger: LoggerService }) {
    this.logger = options.logger;
  }

  getProcessorName(): string {
    return 'RunbookEntityProcessor';
  }

  validateEntityKind(entity: Entity): Promise<boolean> {
    return Promise.resolve(runbookEntityV1alpha1Validator(entity) === entity);
  }

  async postProcessEntity(
    entity: Entity,
    _location: LocationSpec,
    emit: CatalogProcessorEmit,
  ): Promise<Entity> {
    const selfRef = getCompoundEntityRef(entity);

    /*
     * Utilities
     */

    function doEmit(
      targets: string | string[] | undefined,
      context: { defaultKind?: string; defaultNamespace: string },
      outgoingRelation: string,
      incomingRelation: string,
    ): void {
      if (!targets) {
        return;
      }
      for (const target of [targets].flat()) {
        const targetRef = parseEntityRef(target, context);
        emit(
          processingResult.relation({
            source: selfRef,
            type: outgoingRelation,
            target: {
              kind: targetRef.kind,
              namespace: targetRef.namespace,
              name: targetRef.name,
            },
          }),
        );
        emit(
          processingResult.relation({
            source: {
              kind: targetRef.kind,
              namespace: targetRef.namespace,
              name: targetRef.name,
            },
            type: incomingRelation,
            target: selfRef,
          }),
        );
      }
    }

    /*
     * Emit relations for the Runbook kind
     */
    if (entity.kind === 'Runbook') {
      const runbook = entity as RunbookEntityV1alpha1;
      doEmit(
        runbook.spec.owner,
        { defaultKind: 'Group', defaultNamespace: selfRef.namespace },
        RELATION_OWNED_BY,
        RELATION_OWNER_OF,
      );
    }

    /*
     * Emit relations for the Component kind
     */
    if (entity.kind === 'Component') {
      const component = entity as ComponentEntityWithRunbooks;
      doEmit(
        component.spec.usesRunbooks,
        { defaultKind: 'Runbook', defaultNamespace: selfRef.namespace },
        RELATION_USES_RUNBOOK,
        RELATION_RUNBOOK_USED_BY,
      );
    };

    /*
 * Emit relations for the Resource kind
 */
    if (entity.kind === 'Resource') {
      const resource = entity as ResourceEntityWithRunbooks;
      doEmit(
        resource.spec.usesRunbooks,
        { defaultKind: 'Runbook', defaultNamespace: selfRef.namespace },
        RELATION_USES_RUNBOOK,
        RELATION_RUNBOOK_USED_BY,
      );
    };

    return entity;
  }

}