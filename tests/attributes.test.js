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
          underline="#000"
        />
      );

      expect(section).toMatchSnapshot();
    });

    it('should pass thorugh #rrggbb value', () => {
      const section = (
        <section
          background="#ffffff"
          foreground="#ffffff"
          underline="#Ff3acb"
        />
      );

      expect(section).toMatchSnapshot();
    });

    it('should pass thorugh #aarrggbb value', () => {
      const section = (
        <section
          background="#ffffffff"
          foreground="#ffffffff"
          underline="#AbCdeF12"
        />
      );

      expect(section).toMatchSnapshot();
    });

    it('should omit invalid color value', () => {
      const section = (
        <section
          background="#1234f"
          foreground="#badcolor"
          underline="#wrongcolor"
        />
      );

      expect(section).toMatchSnapshot();
    });
  });

  describe('font', () => {
    it('should pass through proper value', () => {
      expect(<section font={1} />).toMatchSnapshot();
    });

    it('should pass through proper value', () => {
      expect(<section font="3" />).toMatchSnapshot();
    });

    it('should omit invalid value', () => {
      expect(<section font="Ubuntu" />).toMatchSnapshot();
    });

    it('should omit invalid value', () => {
      expect(<section font={6} />).toMatchSnapshot();
    });
  });

  describe('offset', () => {
    it('should pass through proper value', () => {
      expect(<section offset={150} />).toMatchSnapshot();
    });

    it('should omit invalid value', () => {
      expect(<section offset={-100} />).toMatchSnapshot();
    });

    it('should omit invalid value', () => {
      expect(<section offset="some gibberish" />).toMatchSnapshot();
    });
  });
});
