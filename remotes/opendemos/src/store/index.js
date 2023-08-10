export const createStore = (initialDataStore) => {
  const listeners = {};
  const dataStore = { ...initialDataStore };

  function getItem(key) {
    return dataStore[key];
  }

  function setItem(key, value) {
    dataStore[key] = value;
    const eventType = 'storage';
    const event = {
      source: null,
      target: null,
      type: eventType,
      key: key,
      value,
    };
    dispatchEvent(event);
  }

  function dispatchEvent(event) {
    const eventType = event.type;
    listeners[eventType] = listeners[eventType] || new Set();
    listeners[eventType].forEach(item => {
      if (!event.target || event.target === item.target) {
        item.listener(event);
      }
    });
  }

  function addEventListener(
    target,
    eventType,
    listener
  ) {
    listeners[eventType] = listeners[eventType] || new Set();
    listeners[eventType].add({
      target: target,
      listener: listener,
    });

    return () => removeEventListener(target, eventType, listener);
  }

  function removeEventListener(
    target,
    eventType,
    listener
  ) {
    listeners[eventType] = listeners[eventType] || new Set();
    for (const item of listeners[eventType]) {
      if (item.target === target && (!listener || item.listener === listener)) {
        listeners[eventType].delete(item);
      }
    }
  }

  function removeAllListeners(target) {
    for (const eventType in listeners) {
      removeEventListener(target, eventType);
    }
  }

  const store = {
    getItem,
    setItem,

    dispatchEvent,
    addEventListener,
    removeAllListeners,
  };

  return store;
};


export const createEventEmitter = (store, scope) => {
  const eventEmitter = {
    get: (storeKey) => {
      return store.getItem(storeKey);
    },
    emit: (eventType, value) => {
      const event = {
        source: eventEmitter,
        target: null,
        scope: scope,
        type: eventType,
        value: value,
      };
      store.dispatchEvent(event);
    },
    listen: (eventType, listener) => {
      return store.addEventListener(eventEmitter, eventType, listener);
    },
    detach: () => {
      return store.removeAllListeners(eventEmitter);
    },
  };

  return eventEmitter;
};
