interface DayInput {
  order: number;
  name: string;
}

export interface StepInput {
  order: number;
  name: string;
  days?: DayInput[];
}

export interface ProposalInput {
  name: string;
  steps?: StepInput[];
}

export interface CreateProposalArgs {
  input: ProposalInput;
}

export interface UpdateProposalArgs {
  id: string;
  input: ProposalInput;
}

export interface DeleteProposalArgs {
  id: string;
}
