/**
 * tallbag-filter
 * --------------
 *
 * Tallbag operator that conditionally lets data pass through. Works on either
 * pullable or listenable sources.
 *
 * `npm install tallbag-filter`
 *
 * Example:
 *
 *     const fromIter = require('callbag-from-iter');
 *     const iterate = require('callbag-iterate');
 *     const filter = require('tallbag-filter');
 *
 *     const source = filter(x => x % 2)(fromIter([1,2,3,4,5]));
 *
 *     iterate(x => console.log(x))(source); // 1
 *                                           // 3
 *                                           // 5
 */

const makeShadow = require('shadow-callbag').default;

const filter = condition => source => (start, sink) => {
  if (start !== 0) return;
  let talkback;
  let shadow;
  source(0, (t, d, s) => {
    if (t === 0) {
      shadow = makeShadow('filter', s);
      talkback = d;
      sink(0, talkback, shadow);
    } else if (t === 1) {
      if (condition(d)) {
        shadow(t, d);
        sink(t, d);
      } else talkback(1);
    } else sink(t, d);
  });
};

module.exports = filter;
