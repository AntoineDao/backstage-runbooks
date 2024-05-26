

import {
  ResourceEntity,
} from '@backstage/catalog-model';

/**
 * Backstage catalog Resource kind Entity. Represents infrastructure required to operate Components.
 *
 * @remarks
 *
 * See {@link https://backstage.io/docs/features/software-catalog/system-model}
 *
 * @public
 */
export interface ResourceEntityWithRunbooks extends ResourceEntity {
  spec: {
    type: string;
    owner: string;
    dependsOn?: string[];
    dependencyOf?: string[];
    system?: string;
    usesRunbooks?: string[];
  };
}
