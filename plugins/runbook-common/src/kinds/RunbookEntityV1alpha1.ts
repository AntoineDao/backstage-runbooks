/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Entity, entityKindSchemaValidator } from '@backstage/catalog-model';
import schema from '../schema/kinds/Runbook.v1alpha1.schema.json';

/**
 * Backstage catalog Runbook kind Entity. Represents a documented process to resolve an incident or perform a task.
 * @public
 */
export interface RunbookEntityV1alpha1 extends Entity {
  apiVersion: 'backstage.io/v1alpha1' | 'backstage.io/v1beta1';
  kind: 'Runbook';
  spec: {
    owner: string;
    steps: {
      name?: string;
      description: string;
      command?: string;
    }[];
  };
}

/**
 * {@link KindValidator} for {@link RunbookEntityV1alpha1}.
 *
 * @public
 */
export const runbookEntityV1alpha1Validator = entityKindSchemaValidator(schema);
