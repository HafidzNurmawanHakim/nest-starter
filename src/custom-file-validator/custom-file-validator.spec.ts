import { CustomFileValidator } from './custom-file-validator';

describe('CustomFileValidator', () => {
  it('should be defined', () => {
    expect(new CustomFileValidator({fileType: []})).toBeDefined();
  });
});
