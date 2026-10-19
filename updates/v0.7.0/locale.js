/* Astraforge Idle v0.7.0 archive in English and Portuguese. */
import { mountPatchLanguage } from '../locale-runtime.js';
import part1 from './locale-part1.js';
import part2 from './locale-part2.js';
import part3 from './locale-part3.js';
import part4 from './locale-part4.js';
import accessibility from './locale-part5.js';

const english={...part1,...part2,...part3,...part4,...accessibility};
for(const [source,target] of Object.entries(english)){
  if(!source.startsWith('Ampliar: '))english['Ampliar: '+source]='Enlarge: '+target;
}
mountPatchLanguage(english);
