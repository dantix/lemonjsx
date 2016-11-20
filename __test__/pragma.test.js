import h from '../src/index';

describe('pragma', () => {
  it('should return string', () => {
    const result = h('section');
    expect(typeof result).toBe('string');
  });

  it('should handle null as attribute parameter', () => {
    expect(() => h('section', null)).not.toThrow();
  });
});
