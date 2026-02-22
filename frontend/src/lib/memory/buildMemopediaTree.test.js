import test from 'node:test';
import assert from 'node:assert/strict';

import { buildMemopediaTree } from './buildMemopediaTree';

test('buildMemopediaTree builds nested tree from parent-child relations', () => {
  const pages = [
    { id: '1', parent_id: null, title: 'Root' },
    { id: '2', parent_id: '1', title: 'Child' },
    { id: '3', parent_id: '2', title: 'Grandchild' },
  ];

  const tree = buildMemopediaTree(pages);

  assert.equal(tree.length, 1);
  assert.equal(tree[0].id, '1');
  assert.equal(tree[0].children[0].id, '2');
  assert.equal(tree[0].children[0].children[0].id, '3');
});

test('buildMemopediaTree treats missing parent as root', () => {
  const pages = [
    { id: '1', parent_id: 'missing', title: 'Orphan' },
  ];

  const tree = buildMemopediaTree(pages);

  assert.equal(tree.length, 1);
  assert.equal(tree[0].id, '1');
});
