export type Create<T> = Omit<
  Omit<Omit<Omit<T, '_id'>, '_createdAt'>, '_modifiedAt'>,
  '_deleted'
>;

export interface DbObject {
  _id: string;
  _createdAt: Date;
  _modifiedAt: Date;
  _deleted: boolean;
}
