type InlineObjProps = {
  data: string;
  mimeType: string;
};

type IValidateInput = {
  inlineData: InlineObjProps;
  customer_code: string;
  measure_datetime: string;
  measure_type: string;
};

const isInlineObjProps = (obj: any): obj is InlineObjProps => {
  return (
    obj &&
    typeof obj === 'object' &&
    'data' in obj &&
    typeof obj.data === 'string' &&
    'mimeType' in obj &&
    typeof obj.mimeType === 'string'
  );
};

export const validateInput = (data: IValidateInput): boolean => {
  const { inlineData, customer_code, measure_datetime, measure_type } = data;

  if (!isInlineObjProps(inlineData)) return false;
  if (!customer_code || typeof customer_code !== 'string') return false;
  if (!measure_datetime || isNaN(Date.parse(measure_datetime))) return false;
  if (!measure_type || !['WATER', 'GAS'].includes(measure_type)) return false;

  return true;
};
