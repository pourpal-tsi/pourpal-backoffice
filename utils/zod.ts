export function above(value: number, min: number) {
  return value > min;
}

export function below(value: number, min: number) {
  return value < min;
}

export function between(value: number, min: number, max: number) {
  return min <= value && value <= max;
}
