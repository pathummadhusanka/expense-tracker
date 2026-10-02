import type { FastifyPluginAsync } from 'fastify';
import {
  createExpenseSchema,
  deleteExpenseSchema,
  getExpenseSchema,
  listExpensesSchema,
  updateExpenseSchema,
} from '../schemas/expense.schema.js';
import { expenseService } from '../services/expense.service.js';
import { CATEGORIES, PAYMENT_METHODS } from '../types/expense.js';
import type { CreateExpenseInput, UpdateExpenseInput } from '../types/expense.js';

interface IdParam {
  id: string;
}

export const expenseRoutes: FastifyPluginAsync = async (fastify) => {
  // List all expenses
  fastify.get('/expenses', { schema: listExpensesSchema }, async (_request, reply) => {
    const expenses = expenseService.getExpenses();
    return reply.status(200).send(expenses);
  });

  // Get single expense by ID
  fastify.get<{ Params: IdParam }>(
    '/expenses/:id',
    { schema: getExpenseSchema },
    async (request, reply) => {
      const { id } = request.params;
      const expense = expenseService.getExpenseById(id);

      if (!expense) {
        return reply.status(404).send({
          error: 'Not Found',
          message: `Expense with ID '${id}' not found`,
        });
      }

      return reply.status(200).send(expense);
    }
  );

  // Create new expense
  fastify.post<{ Body: CreateExpenseInput }>(
    '/expenses',
    { schema: createExpenseSchema },
    async (request, reply) => {
      const created = expenseService.createExpense(request.body);
      return reply.status(201).send(created);
    }
  );

  // Update existing expense
  fastify.put<{ Params: IdParam; Body: UpdateExpenseInput }>(
    '/expenses/:id',
    { schema: updateExpenseSchema },
    async (request, reply) => {
      const { id } = request.params;
      const updated = expenseService.updateExpense(id, request.body);

      if (!updated) {
        return reply.status(404).send({
          error: 'Not Found',
          message: `Expense with ID '${id}' not found`,
        });
      }

      return reply.status(200).send(updated);
    }
  );

  // Delete expense
  fastify.delete<{ Params: IdParam }>(
    '/expenses/:id',
    { schema: deleteExpenseSchema },
    async (request, reply) => {
      const { id } = request.params;
      const deleted = expenseService.deleteExpense(id);

      if (!deleted) {
        return reply.status(404).send({
          error: 'Not Found',
          message: `Expense with ID '${id}' not found`,
        });
      }

      return reply.status(204).send();
    }
  );

  // Reset expenses to initial demo data
  fastify.post('/expenses/reset', async (_request, reply) => {
    expenseService.resetExpenses();
    return reply.status(200).send({
      message: 'Expenses reset to initial demo state',
    });
  });

  // Supporting endpoints for categories and payment methods
  fastify.get('/categories', async (_request, reply) => {
    return reply.status(200).send(CATEGORIES);
  });

  fastify.get('/payment-methods', async (_request, reply) => {
    return reply.status(200).send(PAYMENT_METHODS);
  });
};
