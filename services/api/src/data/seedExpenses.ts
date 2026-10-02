import type { Expense } from '../types/expense.js';

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getSeedExpenses(): Expense[] {
  return [
    {
      id: 'exp_015',
      title: 'Coffee with team',
      description: 'Morning sync at Blue Bottle — lattes and pastries for four.',
      amount: 12.5,
      category: 'Food',
      date: daysAgo(0),
      paymentMethod: 'Card',
    },
    {
      id: 'exp_014',
      title: 'Software subscription',
      description: 'Figma Professional, monthly seat.',
      amount: 15,
      category: 'Bills',
      date: daysAgo(0),
      paymentMethod: 'Card',
    },
    {
      id: 'exp_013',
      title: 'Grocery shopping',
      description: "Weekly groceries at Trader Joe's.",
      amount: 86.42,
      category: 'Food',
      date: daysAgo(2),
      paymentMethod: 'Digital Wallet',
    },
    {
      id: 'exp_012',
      title: 'Bus ticket',
      description: 'Single ride downtown for a client meeting.',
      amount: 2.75,
      category: 'Transport',
      date: daysAgo(3),
      paymentMethod: 'Cash',
    },
    {
      id: 'exp_011',
      title: 'Movie ticket',
      description: 'Evening IMAX showing with friends.',
      amount: 18.5,
      category: 'Entertainment',
      date: daysAgo(5),
      paymentMethod: 'Digital Wallet',
    },
    {
      id: 'exp_010',
      title: 'Pharmacy purchase',
      description: 'Allergy medication and vitamins.',
      amount: 27.8,
      category: 'Health',
      date: daysAgo(7),
      paymentMethod: 'Card',
    },
    {
      id: 'exp_009',
      title: 'Monthly internet bill',
      description: 'Fiber 500 Mbps plan.',
      amount: 64.99,
      category: 'Bills',
      date: daysAgo(9),
      paymentMethod: 'Bank Transfer',
    },
    {
      id: 'exp_008',
      title: 'Restaurant dinner',
      description: 'Anniversary dinner at Osteria Mozza.',
      amount: 142.6,
      category: 'Food',
      date: daysAgo(12),
      paymentMethod: 'Card',
    },
    {
      id: 'exp_007',
      title: 'New keyboard',
      description: 'Low-profile mechanical keyboard for the home office.',
      amount: 98,
      category: 'Shopping',
      date: daysAgo(15),
      paymentMethod: 'Card',
    },
    {
      id: 'exp_006',
      title: 'Electricity bill',
      description: 'Utility statement for last month’s usage.',
      amount: 88.35,
      category: 'Bills',
      date: daysAgo(19),
      paymentMethod: 'Bank Transfer',
    },
    {
      id: 'exp_005',
      title: 'Online programming course',
      description: 'TypeScript & Node.js fundamentals, lifetime access.',
      amount: 49.99,
      category: 'Education',
      date: daysAgo(23),
      paymentMethod: 'Card',
    },
    {
      id: 'exp_004',
      title: 'Ride to airport',
      description: 'Rideshare to the airport for the conference trip.',
      amount: 54.2,
      category: 'Transport',
      date: daysAgo(28),
      paymentMethod: 'Digital Wallet',
    },
    {
      id: 'exp_003',
      title: 'University books',
      description: 'Algorithms textbook and a used statistics book.',
      amount: 132.75,
      category: 'Education',
      date: daysAgo(34),
      paymentMethod: 'Card',
    },
    {
      id: 'exp_002',
      title: 'Gym membership',
      description: 'Quarterly membership at the neighborhood gym.',
      amount: 119,
      category: 'Health',
      date: daysAgo(41),
      paymentMethod: 'Card',
    },
    {
      id: 'exp_001',
      title: 'Birthday gift',
      description: "Gift card for Sam's birthday.",
      amount: 50,
      category: 'Other',
      date: daysAgo(47),
      paymentMethod: 'Cash',
    },
  ];
}
