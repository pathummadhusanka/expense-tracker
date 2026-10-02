export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export const initialNotifications: AppNotification[] = [
{
  id: 'n1',
  title: 'Internet bill due soon',
  body: 'Your monthly internet bill is due in 3 days.',
  time: '2h ago',
  read: false
},
{
  id: 'n2',
  title: 'Food spending is up',
  body: 'You spent 18% more on food this month than last month.',
  time: 'Yesterday',
  read: false
},
{
  id: 'n3',
  title: 'Monthly summary ready',
  body: 'Your spending summary for last month is available.',
  time: '3 days ago',
  read: true
}];