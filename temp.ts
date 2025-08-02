const isString = (value: any): value is string => {
  return typeof value === 'string';
};

const isNumber = (value: any): value is number => {
  return typeof value === 'number';
};

console.log(isString(10));
console.log(isNumber('hello'));
