export type HeaderStatus = 'success' | 'warning' | 'info';

export type HeaderProps = {
  title?: string;
  hideLocaleTime?: boolean;
  cardScore?: number;
  cardGrade?: string;
  cardGradeId?: number;
  certificateValue?: string;
  persistMenuButton?: boolean;
  status?: HeaderStatus;
  statusText?: string;
  isHighRisk?: boolean;
  cardId?: number;
  idleVerifyTime?: number;
  loading?: boolean;
};
