export function verified(...values) {
  for (let val of values) {
    if (val === 0) {
      return true;
    }
  }
  return false;
}
