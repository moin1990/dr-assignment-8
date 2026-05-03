declare module "daisyui" {
  const plugin: import("tailwindcss").Config["plugins"][number];
  export default plugin;
}
