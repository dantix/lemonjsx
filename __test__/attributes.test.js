import h from '../src/index';

describe('attributes', () => {
  describe('alignment', () => {
    it('should pass thorugh proper value', () => {
      expect(<section align="r" />).toMatchSnapshot();
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
  });
});
