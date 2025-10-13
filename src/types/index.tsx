import type { ReactNode } from "react";

export interface IBasicFCProps{
    children?:ReactNode,
    className?: string,
}

export type Option = {
  value: string;
  label: string;
  description?: string;
  model?: string;
};