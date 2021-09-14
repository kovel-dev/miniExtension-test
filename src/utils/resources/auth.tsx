import { FieldSet } from 'airtable';

export interface Auth {
  id: number;
  name: FieldSet[keyof FieldSet];
  students: FieldSet[keyof FieldSet];
  studentName: FieldSet[keyof FieldSet][];
}
