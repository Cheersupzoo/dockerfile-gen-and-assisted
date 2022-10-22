export interface FrameworkSignature {
  framework: string;

  checkFramework(path: string): boolean;
}
