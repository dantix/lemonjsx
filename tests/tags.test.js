import h from '../src/index';

describe('tags', () => {
  describe('attributes', () => {
    it('should omit unsupported attributes', () => {
      expect(<section wrong="value" />).toMatchSnapshot();
    });

    it('should omit unsupported attributes', () => {
      expect(<bar background="value" />).toMatchSnapshot();
    });
  });
});
