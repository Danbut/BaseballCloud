import cloneDeep from 'lodash/cloneDeep';

const renameKeyName = (
  obj: Record<string, unknown>,
  oldName: string,
  newName: string
): Record<string, unknown> => {
  const clone = cloneDeep(obj);
  const keyVal = clone[oldName];

  delete clone[oldName];
  clone[newName] = keyVal;

  return clone;
};

export default renameKeyName;
