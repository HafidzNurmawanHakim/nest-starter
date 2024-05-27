import { Test, TestingModule } from '@nestjs/testing';
import { Otp } from './otp';

describe('Otp', () => {
  let provider: Otp;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Otp],
    }).compile();

    provider = module.get<Otp>(Otp);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
