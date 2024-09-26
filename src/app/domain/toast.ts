export type TipoToast = 'success' | 'error';
export type ToastModel = {
  duration?: number;
  message: string;
  type: TipoToast;
};
