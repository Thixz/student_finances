import { Decimal } from "@prisma/client/runtime/library";

export function serializeDecimal<T extends object>(data: T): T {
  const result: any = {};

  for (const key in data) {
    const value = data[key];
    result[key] = value instanceof Decimal ? value.toNumber() : value;
  }

  return result;
}

export function serializeDecimalArray<T extends object>(data: T[]): T[] {
  return data.map(serializeDecimal);
}
