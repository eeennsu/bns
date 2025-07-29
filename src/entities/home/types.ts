import { BundleProductValue } from '@entities/bundle/types';

export interface ISignatureProduct {
  id: number;
  type: BundleProductValue;
  name: string;
  description: string;
  image: string;
}
