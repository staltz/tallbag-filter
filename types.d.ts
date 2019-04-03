import {Source} from 'tallbag';
import {Metadata} from 'shadow-callbag';

declare const filter: <I>(
  condition: (d: I) => boolean,
) => (source: Source<I, Metadata>) => Source<I, Metadata>;
export default filter;
