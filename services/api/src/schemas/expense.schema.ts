import { CATEGORIES, PAYMENT_METHODS } from '../types/expense.js';

export const expenseSchema = {
  type: 'object',
  required: ['id', 'title', 'amount', 'category', 'date', 'paymentMethod'],
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
    amount: { type: 'number' },
    category: { type: 'string', enum: [...CATEGORIES] },
    date: { type: 'string' },
    paymentMethod: { type: 'string', enum: [...PAYMENT_METHODS] },
  },
} as const;

export const listExpensesSchema = {
  response: {
    200: {
      type: 'array',
      items: expenseSchema,
    },
  },
};

export const getExpenseSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', minLength: 1 },
    },
  },
  response: {
    200: expenseSchema,
  },
};

export const createExpenseSchema = {
  body: {
    type: 'object',
    required: ['title', 'amount', 'category', 'date', 'paymentMethod'],
    additionalProperties: false,
    properties: {
      title: { type: 'string', minLength: 1, maxLength: 100 },
      description: { type: 'string', maxLength: 500 },
      amount: { type: 'number', minimum: 0.01, maximum: 1000000 },
      category: { type: 'string', enum: [...CATEGORIES] },
      date: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
      paymentMethod: { type: 'string', enum: [...PAYMENT_METHODS] },
    },
  },
  response: {
    201: expenseSchema,
  },
};

export const updateExpenseSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', minLength: 1 },
    },
  },
  body: {
    type: 'object',
    minProperties: 1,
    additionalProperties: false,
    properties: {
      title: { type: 'string', minLength: 1, maxLength: 100 },
      description: { type: 'string', maxLength: 500 },
      amount: { type: 'number', minimum: 0.01, maximum: 1000000 },
      category: { type: 'string', enum: [...CATEGORIES] },
      date: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
      paymentMethod: { type: 'string', enum: [...PAYMENT_METHODS] },
    },
  },
  response: {
    200: expenseSchema,
  },
};

export const deleteExpenseSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', minLength: 1 },
    },
  },
};
