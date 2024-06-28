import { types } from "mobx-state-tree";

export const betSizeModel = types.model({
  _id: types.maybeNull(types.string),
  name: types.maybeNull(types.string),
  amount: types.maybeNull(types.number),
});

export const defaultSettingsModel = types.model({
  _id: types.maybeNull(types.string),
  defaultLoginPage: types.maybeNull(types.string),
  createdAt: types.maybeNull(types.number),
  updatedAt: types.maybeNull(types.number),
});
