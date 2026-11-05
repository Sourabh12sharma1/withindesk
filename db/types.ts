export type BetaRequestInput = {
  email: string;
  organization: string;
  role: string;
  useCase: string;
  consent: boolean;
};

export type BetaSaveResult = {
  ok: true;
  duplicate?: boolean;
};
