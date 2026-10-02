import React, { useId, useRef, useState } from 'react';
import { Button } from '../ui/Button';
import { FormField } from '../ui/FormField';
import { Select } from '../ui/Select';
import { inputClass } from '../../utils/styles';
import {
  FORM_FIELD_ORDER,
  createEmptyFormValues,
  formValuesToInput,
  validateExpenseForm } from
'../../utils/expenseValidation';
import { CATEGORIES, PAYMENT_METHODS } from '../../types/expense';
import type { ExpenseFormErrors, ExpenseFormValues, ExpenseInput } from '../../types/expense';

interface ExpenseFormProps {
  initialValues?: ExpenseFormValues;
  submitLabel: string;
  onSubmit: (input: ExpenseInput) => Promise<boolean>;
  onCancel: () => void;
}

type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export function ExpenseForm({ initialValues, submitLabel, onSubmit, onCancel }: ExpenseFormProps) {
  const uid = useId();
  const [values, setValues] = useState<ExpenseFormValues>(initialValues ?? createEmptyFormValues());
  const [errors, setErrors] = useState<ExpenseFormErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fieldRefs = useRef<Partial<Record<keyof ExpenseFormValues, FieldElement | null>>>({});

  const id = (field: keyof ExpenseFormValues) => `${uid}-${field}`;

  const update = <K extends keyof ExpenseFormValues,>(field: K, value: ExpenseFormValues[K]) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (attempted) setErrors(validateExpenseForm(next));
  };

  const fieldProps = (field: keyof ExpenseFormValues) => ({
    id: id(field),
    name: field,
    ref: (el: FieldElement | null) => {
      fieldRefs.current[field] = el;
    },
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `${id(field)}-error` : undefined
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    const nextErrors = validateExpenseForm(values);
    setErrors(nextErrors);
    const firstInvalid = FORM_FIELD_ORDER.find((f) => nextErrors[f]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }
    setSubmitting(true);
    const ok = await onSubmit(formValuesToInput(values));
    if (!ok) setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-label={submitLabel === 'Add Expense' ? 'Add expense' : 'Edit expense'}>
      <div className="space-y-4">
        <FormField id={id('title')} label="Title" error={errors.title}>
          <input
            {...fieldProps('title')}
            type="text"
            data-autofocus
            autoComplete="off"
            placeholder="e.g. Coffee with team"
            value={values.title}
            onChange={(e) => update('title', e.target.value)}
            className={inputClass(Boolean(errors.title), 'h-9 px-3')} />
          
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField id={id('amount')} label="Amount" error={errors.amount}>
            <div className="relative">
              <span
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted"
                aria-hidden="true">
                
                $
              </span>
              <input
                {...fieldProps('amount')}
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={values.amount}
                onChange={(e) => update('amount', e.target.value)}
                className={inputClass(Boolean(errors.amount), 'h-9 pl-7 pr-3 tabular-nums')} />
              
            </div>
          </FormField>

          <FormField id={id('date')} label="Date" error={errors.date}>
            <input
              {...fieldProps('date')}
              type="date"
              value={values.date}
              onChange={(e) => update('date', e.target.value)}
              className={inputClass(Boolean(errors.date), 'h-9 px-3')} />
            
          </FormField>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField id={id('category')} label="Category" error={errors.category}>
            <Select
              {...fieldProps('category')}
              invalid={Boolean(errors.category)}
              placeholder="Select a category"
              value={values.category}
              onChange={(e) => update('category', e.target.value as ExpenseFormValues['category'])}
              options={CATEGORIES.map((c) => ({ value: c, label: c }))} />
            
          </FormField>

          <FormField id={id('paymentMethod')} label="Payment method" error={errors.paymentMethod}>
            <Select
              {...fieldProps('paymentMethod')}
              invalid={Boolean(errors.paymentMethod)}
              placeholder="Select a method"
              value={values.paymentMethod}
              onChange={(e) => update('paymentMethod', e.target.value as ExpenseFormValues['paymentMethod'])}
              options={PAYMENT_METHODS.map((m) => ({ value: m, label: m }))} />
            
          </FormField>
        </div>

        <FormField id={id('description')} label="Description" optional error={errors.description}>
          <textarea
            {...fieldProps('description')}
            rows={3}
            placeholder="Add a note about this expense"
            value={values.description}
            onChange={(e) => update('description', e.target.value)}
            className={inputClass(Boolean(errors.description), 'resize-none px-3 py-2')} />
          
        </FormField>
      </div>

      <div className="-mx-5 -mb-5 mt-6 flex flex-col-reverse gap-2 border-t border-border px-5 py-4 sm:-mx-6 sm:flex-row sm:justify-end sm:px-6">
        <Button variant="secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" loading={submitting}>
          {submitLabel}
        </Button>
      </div>
    </form>);

}