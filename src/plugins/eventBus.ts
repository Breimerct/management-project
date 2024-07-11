import { reactive } from 'vue';

interface EventBus {
  on(event: string, callback: Function): void;
  off(event: string, callback: Function): void;
  emit(event: string, payload?: any): void;
}

const eventBus = reactive(new Map<string, Function[]>());

const EventBus: EventBus = {
  on(event, callback) {
    if (!eventBus.has(event)) {
      eventBus.set(event, []);
    }
    eventBus.get(event)!.push(callback);
  },
  off(event, callback) {
    if (!eventBus.has(event)) return;
    const callbacks = eventBus.get(event)!;
    eventBus.set(
      event,
      callbacks.filter((cb) => cb !== callback),
    );
  },
  emit(event, payload) {
    if (!eventBus.has(event)) return;
    const callbacks = eventBus.get(event)!;
    callbacks.forEach((callback) => callback(payload));
  },
};

export default EventBus;
