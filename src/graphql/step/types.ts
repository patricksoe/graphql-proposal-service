export interface StepInput {
  order: number;
  name: string;
  proposalId: number;
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
