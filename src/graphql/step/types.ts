export interface DayInput {
  order: number;
  name: string;
}

export interface StepInput {
  order: number;
  name: string;
  days?: DayInput[];
}

export interface CreateStepArgs {
  input: StepInput;
}

export interface UpdateStepArgs {
  id: string;
  input: StepInput;
}

export interface DeleteStepArgs {
  id: string;
}
