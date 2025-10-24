import { TranslationsType } from '../types/locales';
import { z } from 'zod';

const investorList = ['venture', 'angel', 'private'];
const regionList = [
  'andijon',
  'buxoro',
  'fargona',
  'jizzax',
  'qashqadaryo',
  'xorazm',
  'namangan',
  'navoiy',
  'samarqand',
  'sirdaryo',
  'surxandaryo',
  'tashkent',
  'tashkent_city',
  'qoraqalpogiston',
];

export const InvestorTypeEnum = (t: TranslationsType) =>
  z.enum(investorList).refine((val) => investorList.includes(val), {
    message: t('Schemas.investor_type.invalid'),
  });

export const RegionTypeEnum = (t: TranslationsType) =>
  z.enum(regionList).refine((val) => regionList.includes(val), {
    message: t('Schemas.region.invalid'),
  });
