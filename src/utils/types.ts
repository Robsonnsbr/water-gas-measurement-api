export type ValidImageMimeType =
  | 'image/png'
  | 'image/jpeg'
  | 'image/webp'
  | 'image/heic'
  | 'image/heif';

export type InlineObjProps = {
  data: string;
  mimeType: ValidImageMimeType;
};

export type IValidateInput = {
  inlineData: InlineObjProps;
  customer_code: string;
  measure_datetime: string;
  measure_type: string;
};
