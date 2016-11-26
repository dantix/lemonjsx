import h from '../src/index';

describe('tags', () => {
  describe('general', () => {
    it('should not throw on unknown tag', () => {
      expect(() => <someShittyTag />).not.toThrow();
    });

    it('should return string on unknown tag', () => {
      const result = <someShittyTag />;
      expect(typeof result).toBe('string');
    });

    it('should omit unknown tags', () => {
      expect(<someShittyTag />).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should omit unsupported attributes', () => {
      expect(<section wrong="value" />).toMatchSnapshot();
    });

    it('should omit unsupported attributes', () => {
      expect(<bar background="value" />).toMatchSnapshot();
    });
  });

  describe('reverse colors', () => {
    it('should be rendered properly', () => {
      expect((
        <section foreground="#fff" background="#000">
          before content
          <reverse-colors>
            reversed content
          </reverse-colors>
          after content
        </section>
      )).toMatchSnapshot();
    });
  });
});
