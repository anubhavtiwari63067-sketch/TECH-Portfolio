export function isWebGLAvailable() {
  if (typeof window === 'undefined') return true; // Assume true for SSR, check will happen on client
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}
