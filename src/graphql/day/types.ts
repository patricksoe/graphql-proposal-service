export interface DayInput {
  order: number;
  name: string;
  proposalId: number;
  stepId: number;
}

export interface CreateDayArgs {
  input: DayInput;
}

export interface UpdateDayArgs {
  id: string;
  input: DayInput;
}

export interface DeleteDayArgs {
  id: string;
}
