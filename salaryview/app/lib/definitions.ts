export type User = {
  id: string;
  name: string;
  email: string;
};

export type Salary = {
  id: number;
  user: User;
  local_currency: string | null;
  local_salary: number | null;
  salary_eur: number | null;
  commission_eur: number;
  displayed_salary?: number;
};
