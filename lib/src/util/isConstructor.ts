function isConstructor (input: any) {
  try {
    // eslint-disable-next-line no-new
    new input()
    return true
  } catch {
    return false
  }
}

export default isConstructor
