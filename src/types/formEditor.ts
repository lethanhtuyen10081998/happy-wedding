export type FormEditorProps<T> = {
  onSubmit(values: T): Promise<void>;
  loading: boolean;
  title?: string;
  buttonLalel: string;
  defaultValues?: T;
  mode?: FormMode;
};

export enum FormMode {
  EDIT = 'edit',
  CREATE = 'create',
}
