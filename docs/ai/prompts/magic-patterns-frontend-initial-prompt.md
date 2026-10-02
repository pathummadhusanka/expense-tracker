Create a polished, lightweight **Expense Tracker web application** using **React + TypeScript**.

This is a **frontend-only prototype**. Do not create or assume a backend, database, authentication system, API, or external services. Use realistic mock data and local frontend state so the entire UI is functional and interactive.

The frontend will later be connected to a Fastify REST API, so keep the data structures and components clean and easy to integrate with an API.

## Design Direction

Create a modern, clean, professional dashboard.

The UI should feel like a real productivity/finance application rather than a generic admin template.

Prioritize:

* Clean layout
* Good typography
* Clear visual hierarchy
* Spacious but compact design
* Responsive behavior
* Accessible controls
* Consistent components
* Practical interactions

Avoid excessive gradients, unnecessary animations, excessive rounded cards, and decorative elements that do not contribute to usability.

## Application Layout

Create a responsive application shell with:

### Sidebar

Navigation:

* Dashboard
* Expenses

At the bottom:

* Settings

Include a small application logo/name such as:

**ExpenseFlow**

The sidebar should collapse appropriately on smaller screens.

### Top Bar

Include:

* Current page title
* Search
* Notification icon
* User/profile area

Keep these elements functional where appropriate.

---

# Dashboard

Create a dashboard showing an overview of the user's expenses.

## Summary cards

Display:

* Total Expenses
* This Month
* Average Expense
* Number of Expenses

Example:

```text
Total Expenses
$2,845.50

This Month
$742.30

Average Expense
$118.56

Expenses
24
```

Use mock data for these values and calculate them from the mock expense dataset where practical.

## Spending by Category

Show a simple visual representation of spending by category.

Categories:

* Food
* Transport
* Shopping
* Bills
* Entertainment
* Health
* Education
* Other

A simple chart is enough. Do not overcomplicate it.

## Recent Expenses

Display the latest expenses with:

* Title
* Category
* Amount
* Date
* Payment method

Include a "View all expenses" action.

---

# Expenses Page

Create the main expense management page.

Header:

```text
Expenses

Track and manage your spending

[ + Add Expense ]
```

## Search

Provide a search input:

```text
Search expenses...
```

Search should work against:

* Expense title
* Description

## Filters

Provide:

* Category
* Payment method
* Date
* Clear filters

Filters should be combinable.

For example:

```text
Category: Food
Payment Method: Card
Search: coffee
```

should show only matching expenses.

## Sorting

Allow sorting by:

* Newest
* Oldest
* Highest amount
* Lowest amount

Make the selected sorting option clear.

---

# Expense List

Use a clean responsive table on desktop and an appropriate card/list layout on smaller screens.

Columns:

* Title
* Category
* Amount
* Date
* Payment Method
* Actions

Each row should provide:

* View
* Edit
* Delete

Use clear visual indicators for categories and payment methods.

Example:

```text
Coffee with team
Food
$12.50
Oct 01, 2026
Card
```

---

# Add Expense

Create a modal or dedicated form for adding an expense.

Fields:

### Title

Required text field.

### Description

Optional textarea.

### Amount

Required numeric input.

### Category

Select:

* Food
* Transport
* Shopping
* Bills
* Entertainment
* Health
* Education
* Other

### Date

Date input.

### Payment Method

Select:

* Cash
* Card
* Bank Transfer
* Digital Wallet

Buttons:

* Cancel
* Add Expense

## Validation

Implement frontend validation.

Rules:

* Title is required
* Amount is required
* Amount must be greater than 0
* Category is required
* Date is required
* Payment method is required
* Description is optional

Display useful validation messages beside the relevant fields.

---

# Edit Expense

Reuse the expense form for editing.

When editing:

* Populate existing values
* Allow values to be changed
* Validate the form
* Update the mock state

---

# Expense Details

Create a details view or modal.

Display:

* Title
* Description
* Amount
* Category
* Date
* Payment method

Actions:

* Edit
* Delete
* Close / Back

---

# Delete Confirmation

When the user clicks Delete, do not immediately remove the expense.

Display a confirmation dialog:

```text
Delete expense?

Are you sure you want to delete this expense?
This action cannot be undone.

[Cancel] [Delete]
```

The Delete button should actually remove the item from the local mock state.

---

# Notifications

Implement toast notifications for important actions.

Examples:

```text
Expense added successfully
Expense updated successfully
Expense deleted successfully
```

Also provide an error-style notification where appropriate.

---

# Empty States

Design a useful empty state for:

* No expenses
* No search results
* No filtered results

Example:

```text
No expenses found

Try changing your filters or add a new expense.

[ Add Expense ]
```

---

# Loading State

Include a simple loading/skeleton state that can be displayed while the application is loading mock data.

The component structure should make it easy to replace this later with real API loading states.

---

# Error State

Create a reusable error state component.

Example:

```text
Something went wrong

We couldn't load your expenses.

[ Try Again ]
```

The retry button can simply simulate a successful retry for now.

---

# Mock Data

Create approximately 10-15 realistic expenses.

Use different:

* Titles
* Descriptions
* Categories
* Amounts
* Dates
* Payment methods

Example expenses:

* Coffee with team
* Monthly internet bill
* Grocery shopping
* Bus ticket
* Online programming course
* Movie ticket
* Pharmacy purchase
* Restaurant dinner
* Software subscription
* Electricity bill
* New keyboard
* University books

Use realistic dates and amounts.

---

# Data Model

Use a clean TypeScript interface similar to:

```typescript
interface Expense {
  id: string;
  title: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  paymentMethod: string;
}
```

Keep the data model centralized so it can later map easily to a Fastify API response.

---

# Component Architecture

Keep the frontend reasonably modular.

Use reusable components for things such as:

* AppLayout
* Sidebar
* TopBar
* SummaryCard
* ExpenseTable
* ExpenseRow
* ExpenseForm
* ExpenseDetails
* DeleteConfirmation
* SearchBar
* FilterBar
* EmptyState
* LoadingState
* ErrorState
* Toast

Do not over-engineer the application with unnecessary abstractions.

---

# Important Future Integration Requirement

This frontend will later be connected to a **Fastify + TypeScript REST API**.

Therefore:

* Keep API-related logic separate from UI components where possible
* Do not put business logic directly into presentation components unnecessarily
* Keep the Expense type centralized
* Keep CRUD operations clearly separated
* Avoid tightly coupling components to mock data
* Make it easy to replace mock functions with API calls later

For now, however, use local state/mock data so the application works completely without a backend.

---

# Accessibility

Build the UI with accessibility in mind.

Use:

* Semantic HTML
* Proper labels
* Accessible buttons
* Keyboard-accessible dialogs
* Meaningful headings
* Accessible form controls
* Appropriate ARIA attributes when necessary

Important interactive elements should have clear accessible names because this application will later be tested extensively with **Playwright**.

Prefer UI structures that allow tests such as:

```typescript
page.getByRole('button', { name: 'Add Expense' })
page.getByLabel('Amount')
page.getByRole('textbox', { name: 'Title' })
```

Avoid relying on fragile CSS selectors.

Where appropriate, add stable `data-testid` attributes, but prefer semantic/user-facing locators first.

---

# Responsive Design

The application must work well on:

* Desktop
* Tablet
* Mobile

On mobile:

* Sidebar should collapse
* Expense table can become cards or a responsive list
* Forms should remain usable
* Filters should stack appropriately
* Modals should fit smaller screens

---

# Important Scope Constraint

Keep this project lightweight.

Do NOT implement:

* Authentication
* User registration
* Database
* Backend
* Fastify
* Payments
* AI
* Cloud services
* External APIs

The only goal at this stage is to produce a **high-quality, functional React frontend** that can later be connected to a Fastify backend and tested with Playwright.

Make all major interactions functional using mock/local state rather than creating static screens.
