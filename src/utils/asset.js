// Resolves a path inside /public/assets, honouring Vite's `base` setting.
export const asset = (path) => `${import.meta.env.BASE_URL}assets/${path}`;
export const publicUrl = (path) => `${import.meta.env.BASE_URL}${path}`;
