import { DbObject } from '../db-object/db-object.model';

export interface UserModel extends DbObject {
  name: string;
  email: string;
}
