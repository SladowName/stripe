const test = {
  obj: 1,
  id: 2,
}

const test2 = {
  test,
  name: 'qwe',
};

test.test2 = test2;

console.log(JSON.stringify(test));
