import { InlineObjProps, IValidateInput, ValidImageMimeType } from './types';
const isBase64 = require('is-base64');

const validImageMimeTypes: ValidImageMimeType[] = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/heic',
  'image/heif'
];

const isInlineObjProps = (obj: any): obj is InlineObjProps => {
  return (
    obj &&
    typeof obj === 'object' &&
    'data' in obj &&
    typeof obj.data === 'string' &&
    isBase64(obj.data) &&
    'mimeType' in obj &&
    typeof obj.mimeType === 'string' &&
    validImageMimeTypes.includes(obj.mimeType)
  );
};
export const validateInput = (data: IValidateInput): boolean => {
  const { inlineData, customer_code, measure_datetime, measure_type } = data;
  console.log(isInlineObjProps(inlineData));

  if (!isInlineObjProps(inlineData)) return false;
  if (!customer_code || typeof customer_code !== 'string') return false;
  if (!measure_datetime || isNaN(Date.parse(measure_datetime))) return false;
  if (!measure_type || !['WATER', 'GAS'].includes(measure_type)) return false;

  return true;
};
