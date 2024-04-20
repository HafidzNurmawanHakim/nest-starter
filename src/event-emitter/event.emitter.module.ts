import { Global, Module } from '@nestjs/common';
import { TypedEventEmitter } from './event-emitter';

@Global()
@Module({
    providers: [TypedEventEmitter],
    exports: [TypedEventEmitter]
})
export class TypedEventEmitterModule {}
