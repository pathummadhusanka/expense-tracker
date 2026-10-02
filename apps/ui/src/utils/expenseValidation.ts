import { todayISO } from './format';
import type { Expense, ExpenseFormErrors, ExpenseFormValues, ExpenseInput } from '../types/expense';

export const FORM_FIELD_ORDER: (keyof ExpenseFormValues)[] = [
'title',
'amount',
'date',
'category',
'paymentMethod',
'description'];


export function createEmptyFormValues(): ExpenseFormValues {
  return {
    title: '',
    description: '',
    amount: '',
    category: '',
    date: todayISO(),
    paymentMethod: ''
  };
}

export function expenseToFormValues(expense: Expense): ExpenseFormValues {
  return {
    title: expense.title,
    description: expense.description,
    amount: String(expense.amount),
    category: expense.category,
    date: expense.date,
    paymentMethod: expense.paymentMethod
  };
}

export function validateExpenseForm(values: ExpenseFormValues): ExpenseFormErrors {
  const errors: ExpenseFormErrors = {};
  const title = values.title.trim();

  if (!title) errors.title = 'Title is required';else
  if (title.length > 100) errors.title = 'Title must be 100 characters or fewer';

  if (values.amount.trim() === '') {
    errors.amount = 'Amount is required';
  } else {
    const amount = Number(values.amount);
    if (Number.isNaN(amount)) errors.amount = 'Enter a valid amount';else
    if (amount <= 0) errors.amount = 'Amount must be greater than 0';else
    if (amount > 1_000_000) errors.amount = 'Amount must be less than $1,000,000';
  }

  if (!values.category) errors.category = 'Category is required';
  if (!values.date) errors.date = 'Date is required';
  if (!values.paymentMethod) errors.paymentMethod = 'Payment method is required';
  if (values.description.length > 500) {
    errors.description = 'Description must be 500 characters or fewer';
  }

  return errors;
}

/** Assumes values passed validation. */
export function formValuesToInput(values: ExpenseFormValues): ExpenseInput {
  return {
    title: values.title.trim(),
    description: values.description.trim(),
    amount: Math.round(Number(values.amount) * 100) / 100,
    category: values.category as ExpenseInput['category'],
    date: values.date,
    paymentMethod: values.paymentMethod as ExpenseInput['paymentMethod']
  };
}