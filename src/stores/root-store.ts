import { applySnapshot, getSnapshot, Instance, types } from "mobx-state-tree";
import { useMemo } from "react";
import { initUser, user } from "./user/user";
import { initSetting, setting } from "./setting/setting";

import { initBet, bet } from "./bet/bet";

const RootStore = types
  .model({
    user,
    setting,
    bet,
  })
  .actions((self) => {
    let initialState = {};
    return {
      afterCreate: () => {
        initialState = getSnapshot(self);
      },
      reset: () => {
        applySnapshot(self, initialState);
      },
    };
  });

export type RootStoreType = Instance<typeof RootStore>;

let store: RootStoreType;

export function resetStore() {
  store.reset();
}

export function initializeStore(snapshot = null) {
  const _store =
    store ??
    RootStore.create({
      user: initUser(),
      setting: initSetting(),
      bet: initBet()
    });
  if (snapshot) {
    applySnapshot(_store, snapshot);
  }
  if (typeof window === "undefined") {
    return _store;
  }

  if (!store) {
    store = _store;
  }
  // makeInspectable(store);
  return _store;
}

export function useStore(
  initialState: null | undefined
): Instance<typeof RootStore> {
  return useMemo(() => initializeStore(initialState), [initialState]);
}
