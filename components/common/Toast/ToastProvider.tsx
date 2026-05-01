'use client';

import { toast } from 'sonner';
import { CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';

const typeConfig = {
  success: {
    icon: <CheckCircle size={18} color="green" />,
    defaultTitle: 'Успіх',
  },
  error: {
    icon: <XCircle size={18} color="red" />,
    defaultTitle: 'Помилка',
  },
  info: {
    icon: <Info size={18} color="blue" />,
    defaultTitle: 'Інформація',
  },
  warning: {
    icon: <AlertTriangle size={18} color="orange" />,
    defaultTitle: 'Попередження',
  },
};

export const ToastProvider = {
  show: (
    type: 'success' | 'error' | 'info' | 'warning',
    message: string,
    description?: string
  ) => {
    const cfg = typeConfig[type];
    toast(message, {
      description: description ?? cfg.defaultTitle,
      icon: cfg.icon,
    });
  },

  success: (msg: string, desc?: string) => ToastProvider.show('success', msg, desc),
  error: (msg: string, desc?: string) => ToastProvider.show('error', msg, desc),
  info: (msg: string, desc?: string) => ToastProvider.show('info', msg, desc),
  warning: (msg: string, desc?: string) => ToastProvider.show('warning', msg, desc),
};
