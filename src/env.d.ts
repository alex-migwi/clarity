/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user?: {
      id: string;
      displayName: string;
      emails?: Array<{ value: string; verified?: boolean }>;
      photos?: Array<{ value: string }>;
      provider: string;
    } | null;
  }
}
