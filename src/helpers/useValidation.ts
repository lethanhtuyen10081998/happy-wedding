/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldConfigType, InputType } from 'src/types/field';
import * as yup from 'yup';

const getValidationForm = (data: FieldConfigType[]): yup.ObjectSchema<any> => {
  const result: any = {};

  data.forEach((item) => {
    let validation = yup.string() as any; // Khởi tạo validation riêng cho từng trường

    item.rulesList.forEach((rule) => {
      validation = validation.matches(RegExp(rule.rule), rule.label);
    });

    if (item.input === InputType.CHECKBOX) {
      validation = validation.not(['false', ''], `${item.label} không được để trống`);
    }

    // Nếu là bắt buộc, thêm .required()
    if (item.rulesList.some((rule) => rule.rule === '^(?!\\s*$).+')) {
      validation = validation.required(`${item.label} không được để trống`);
    }

    item?.extraRules?.forEach((rule) => {
      validation = validation.oneOf([yup.ref(rule.targetField)], rule.label);
    });

    result[item.fieldName] = validation;
  });

  return yup.object().shape(result);
};

const useValidation = (data: FieldConfigType[]) => getValidationForm(data);

export default useValidation;
