export const createStore = (payload) => {
    const listeners = {};
    const topicCache = {...payload};
  
    const publishToTopic = (topic, event) => {
      console.log('publish', topic, event);
      listeners[topic] = listeners[topic] || new Set();
      topicCache[topic] = event;
      listeners[topic].forEach(item => {
        item.listener(event);
      });
    };
  
    const subscribeToTopic = (eventEmitter, topic, listener) => {
      console.log('subscribe', topic, topicCache[topic]);
      listeners[topic] = listeners[topic] || new Set();
      listeners[topic].add({
        eventEmitter: eventEmitter,
        listener: listener,
      });
  
      // Send any cached event on this topic
      listener(topicCache[topic]);
  
      return () => unsubscribeFromTopic(eventEmitter, topic, listener);
    };
  
    const unsubscribeFromTopic = (eventEmitter, topic, listener) => {
      listeners[topic] = listeners[topic] || new Set();
      for (const item of listeners[topic]) {
        if (item.eventEmitter === eventEmitter && (!listener || item.listener === listener)) {
          console.log('unsubscribe', topic);
          listeners[topic].delete(item);
        }
      }
    };
  
    const unsubscribeFromAll = eventEmitter => {
      for (const topic in listeners) {
        unsubscribeFromTopic(eventEmitter, topic);
      }
    };
  
    return {
      publishToTopic,
      subscribeToTopic,
      unsubscribeFromTopic,
      unsubscribeFromAll,
    };
};
  

export const createEventEmitter = (store) => {
    const eventEmitter = {
      publish: (topic, event) => {
        return store.publishToTopic(topic, event);
      },
      subscribe: (topic, listener) => {
        return store.subscribeToTopic(eventEmitter, topic, listener);
      },
      unsubscribe: topic => {
        return store.unsubscribeFromTopic(eventEmitter, topic);
      },
      unsubscribeAll: () => {
        return store.unsubscribeFromAll(eventEmitter);
      },
    };
  
    return eventEmitter;
};
