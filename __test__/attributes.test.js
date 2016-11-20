import h from '../src/index';

describe('attributes', () => {
  describe('general', () => {
    it('should not create section with empty attributes', () => {
      expect(<section />).toMatchSnapshot();
    });
  });

  describe('alignment', () => {
    it('should pass thorugh proper value', () => {
      expect(<section align="r" />).toMatchSnapshot();
    });

    it('should omit invalid value', () => {
      expect(<section align="right" />).toMatchSnapshot();
    });
  });

  describe('colors', () => {
    it('should pass thorugh #rgb value', () => {
      const section = (
        <section
          background="#fff"
          foreground="#fff"
        />
      );

      expect(section).toMatchSnapshot();
    });

    it('should pass thorugh #rrggbb value', () => {
      const section = (
        <section
          background="#ffffff"
          foreground="#ffffff"
        />
      );

      expect(section).toMatchSnapshot();
    });

    it('should pass thorugh #aarrggbb value', () => {
      const section = (
        <section
          background="#ffffffff"
          foreground="#ffffffff"
        />
      );

      expect(section).toMatchSnapshot();
    });

    it('should omit invalid color value', () => {
      const section = (
        <section
          background="#1234f"
          foreground="#badcolor"
        />
      );

      expect(section).toMatchSnapshot();
    });
  });
});
