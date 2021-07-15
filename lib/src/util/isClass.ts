function isClass (input: any) {
  return typeof input === 'function' &&
    typeof input.prototype === 'object' &&
    input.toString().substring(0, 5) === 'class'
}

export default isClass
