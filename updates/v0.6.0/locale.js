/* Complete bilingual archive for v0.6.0. Portuguese source HTML is unchanged. */
import {mountPatchLanguage} from '../locale-runtime.js';
import part1 from './locale-part1.js';
import part2 from './locale-part2.js';
import part3 from './locale-part3.js';
import accessibility from './locale-accessibility.js';
const english={...part1,...part2,...part3,...accessibility};
mountPatchLanguage(english);
