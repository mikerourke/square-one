/* @flow */

/* External dependencies */
import { schema } from 'normalizr';

/**
 * Schema entity for a Lead with child Changes and Notes.
 */
const leadSchema = new schema.Entity('leads');
export const leadsSchema = [leadSchema];
