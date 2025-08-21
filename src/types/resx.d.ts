/**
 * TypeScript declarations for .resx files
 * Following ODSP-web pattern for direct .resx imports
 */

declare module "*.resx" {
  const strings: Record<string, string>;
  export default strings;
}
