const Matchers = {
    compare(actual, expected) {
      actual.forEach((element) => {
        if (!expected.includes(element)) {
          return false;
        }
      });
      return true;
    },
  };
  module.exports = Matchers;