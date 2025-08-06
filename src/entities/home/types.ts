import { BundleProductValue } from '@entities/bundle/types';

export interface ISignatureProduct {
  id: number;
  type: BundleProductValue;
  name: string;
  description: string;
  image: string;
}

export interface ISummaryEvent {
  id: number;
  name: string;
  shortDescription: string;
  startDate: Date;
  endDate: Date;
  image: string;
}
