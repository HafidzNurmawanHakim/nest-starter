import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector))
    );
    await app.listen(process.env.PORT || 3333);
}
bootstrap();
