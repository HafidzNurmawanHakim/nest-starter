import { EventEmitter } from './event-emitter';

describe('EventEmitter', () => {
  it('should be defined', () => {
    expect(new EventEmitter()).toBeDefined();
  });
});
