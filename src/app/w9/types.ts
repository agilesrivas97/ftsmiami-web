export interface W9FormData {
  name: string;
  businessName: string;
  taxClassification: string;
  llcCode: string;
  exemptPayeeCode: string;
  fatcaCode: string;
  address: string;
  cityStateZip: string;
  accountNumbers: string;
  tinType: 'ssn' | 'ein';
  ssn1: string;
  ssn2: string;
  ssn3: string;
  ein: string;
}
