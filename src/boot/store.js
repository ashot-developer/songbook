// eslint-disable-next-line import/no-mutable-exports
let storeInstance = null;

export default async ({ store }) => {
  storeInstance = store;
};

export { storeInstance };