import React from 'react';
import { BanknoteIcon, CreditCardIcon, LandmarkIcon, SmartphoneIcon } from 'lucide-react';
import type { PaymentMethod } from '../../types/expense';

const methodIcons: Record<PaymentMethod, typeof CreditCardIcon> = {
  Cash: BanknoteIcon,
  Card: CreditCardIcon,
  'Bank Transfer': LandmarkIcon,
  'Digital Wallet': SmartphoneIcon
};

export function PaymentMethodBadge({ method }: {method: PaymentMethod;}) {
  const Icon = methodIcons[method];
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm text-muted">
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      {method}
    </span>);

}