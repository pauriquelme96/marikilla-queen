import { generateId, insertOne } from '../../lib/collection';
import { Create } from '../db-object/db-object.model';
import { UserModel } from './user.model';

export async function validateUser(user: Create<UserModel>) {
  const report: any = {
    name: { error: null, message: null },
  };

  // NAME
  // isString
  const isString = isType(user.name, String);

  report.name = {
    isString,
  };
}

function isType(value, type) {
  if (typeof value === 'object') {
    return value instanceof type;
  } else return typeof value === type.prototype.constructor.name.toLowerCase();
}

function emptyString(str: string): boolean {
  if (str === undefined || str === null || str === '') return true;
}

export async function createUser(user: Create<UserModel>) {
  return insertOne<UserModel>('users', {
    _id: generateId(),
    _createdAt: new Date(),
    _modifiedAt: new Date(),
    _deleted: false,
    ...user,
  });
}
