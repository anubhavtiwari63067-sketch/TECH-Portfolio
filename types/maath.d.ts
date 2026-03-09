declare module 'maath/random/dist/maath-random.esm' {
  export function inSphere(buffer: Float32Array, sphere?: { radius?: number; center?: [number, number, number] }): Float32Array;
  export function inCircle(buffer: Float32Array, circle?: { radius?: number; center?: [number, number] }): Float32Array;
  export function onSphere(buffer: Float32Array, sphere?: { radius?: number; center?: [number, number, number] }): Float32Array;
  export function inBox(buffer: Float32Array, box?: { sides?: number | [number, number, number]; center?: [number, number, number] }): Float32Array;
  export function inRect(buffer: Float32Array, rect?: { sides?: number | [number, number]; center?: [number, number] }): Float32Array;
  export function onCircle(buffer: Float32Array, circle?: { radius?: number; center?: [number, number] }): Float32Array;
  export function onRect(buffer: Float32Array, rect?: { sides?: number | [number, number]; center?: [number, number] }): Float32Array;
  export const noise: any;
}
