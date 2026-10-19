/* v0.5.2 localized archival notes; original.html remains untouched. */
import {mountPatchLanguage} from '../locale-runtime.js';
import introduction from './locale-part1.js';
import heroes from './locale-part2.js';
import encounters from './locale-part3.js';
import conclusion from './locale-part4.js';
const english={...introduction,...heroes,...encounters,...conclusion,
 'Abrir original preservado':'Open preserved original (Portuguese)'
};
mountPatchLanguage(english);
