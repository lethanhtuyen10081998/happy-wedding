export interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export interface TabItem {
  index: number;
  label: string;
  value: string;
}

export const initTabItem: TabItem = {
  index: 0,
  label: 'PROOF',
  value: 'cardIsProof',
};

export interface TabProps {
  children?: React.ReactNode;
  tabs: TabItem[];
  onChange: (value: TabItem) => void;
  classTabs?: string;
}

export interface Props {}

export interface State {}
