export type ComponentInputs = Record<string, any>;
export interface ModalProps {
  size?: {
    minWidth?: string;
    width?: string;
    maxWidth?: string;
    minHeight?: string;
    height?: string;
    maxHeight?: string;
  };
  inputs?: ComponentInputs;
}
