import { Types } from "mongoose";

/**
 * Recursively traverse input and convert Mongoose ObjectId instances
 * or any object that implements a custom `toJSON()` to their plain JS values.
 *
 * Notes:
 * - For ObjectId instances the function returns the hex string (via toString()).
 * - For objects with a custom `toJSON()` implementation the function returns the
 *   result of calling `toJSON()`.
 * - Arrays and nested objects are traversed.
 * - Circular references are protected with a WeakSet.
 */
export default function convertObjectIds<T = unknown>(input: T): T {
  const seen = new WeakSet<object>();

  function _convert(value: unknown): unknown {
    if (value === null || value === undefined) return value;

    // Arrays -> map each item
    if (Array.isArray(value)) return value.map((v) => _convert(v));

    // Primitives -> return as-is
    const valueType = typeof value;
    if (
      valueType === "string" ||
      valueType === "number" ||
      valueType === "boolean" ||
      valueType === "bigint" ||
      valueType === "symbol" ||
      valueType === "function"
    ) {
      return value;
    }

    // Objects
    if (valueType === "object") {
      const obj = value as object;
      // protect against recursion/cycles
      if (seen.has(obj)) return value;
      seen.add(obj);

      // Mongoose ObjectId instances
      try {
        if (Types && Types.ObjectId && (obj as unknown) instanceof Types.ObjectId) {
          // toString() gives the hex representation, toJSON() usually does the same
          const coerced = obj as { toString: () => string };
          return coerced.toString();
        }
      } catch {
        // instanceof checks can throw in some cross-realm cases — fallthrough
      }

      // Objects that implement a custom toJSON (not the plain Object.prototype.toJSON)
      // Detect custom toJSON implementations.
      const maybeRecord = obj as Record<string, unknown>;
      const toJsonProp = maybeRecord["toJSON"];
      if (typeof toJsonProp === "function") {
        try {
          const toJsonFn = toJsonProp as () => unknown;
          return toJsonFn.call(obj);
        } catch {
          // if toJSON throws, fall back to traversing props
        }
      }

      // Plain object -> traverse keys
      const out: Record<string, unknown> = {};
      const record = obj as Record<string, unknown>;
      for (const key of Object.keys(record)) {
        out[key] = _convert(record[key]);
      }
      return out;
    }

    // Fallback: return original
    return value;
  }

  return _convert(input) as T;
}
