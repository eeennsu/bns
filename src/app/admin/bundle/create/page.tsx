'use client';

import type { FC } from 'react';

import useCreateBundleForm from '@features/bundle/hooks/useCreateForm';
import BundleForm from '@features/bundle/ui/admin/Form';

import { SelectProductItem } from '@entities/bundle/types';

import usePreventRefresh from '@hooks/usePreventRefresh';

import PageContainer from '@components/PageContainer';

const AdminBundleCreatePage: FC = () => {
  const { form, onSubmit, files, setFiles } = useCreateBundleForm();
  usePreventRefresh();

  return (
    <PageContainer>
      <BundleForm
        form={form}
        files={files}
        setFiles={setFiles}
        submitProps={{
          label: '생성',
          onSubmit,
        }}
        breadList={DUMMY_BREADS}
        sauceList={DUMMY_SAUCES}
      />
    </PageContainer>
  );
};

export default AdminBundleCreatePage;

const DUMMY_BREADS: SelectProductItem[] = [
  { label: '고소한 통밀식빵', value: '1', price: 12000 },
  { label: '달콤한 크림소보로', value: '2', price: 6800 },
  { label: '부드러운 우유모닝롤', value: '3', price: 5400 },
  { label: '바삭한 크로와상', value: '4', price: 7500 },
  { label: '촉촉한 초코칩 머핀', value: '5', price: 6300 },
  { label: '쫄깃한 치즈베이글', value: '6', price: 7100 },
  { label: '담백한 바게트', value: '7', price: 8200 },
  { label: '호두 건포도빵', value: '8', price: 9700 },
  { label: '매콤한 소시지롤', value: '9', price: 8800 },
  { label: '녹차 마블식빵', value: '10', price: 7900 },
  { label: '꿀 고구마페이스트리', value: '11', price: 6700 },
  { label: '딸기크림 크루아상', value: '12', price: 7200 },
  { label: '단호박 호밀빵', value: '13', price: 6000 },
  { label: '크림치즈 팡도르', value: '14', price: 9100 },
  { label: '감자 샐러드번', value: '15', price: 5800 },
];

const DUMMY_SAUCES: SelectProductItem[] = [
  { label: '스위트 칠리소스', value: '1', price: 12000 },
  { label: '허니 머스터드', value: '2', price: 3000 },
  { label: '갈릭 마요네즈', value: '3', price: 2000 },
  { label: '트러플 마요소스', value: '4', price: 5300 },
  { label: '바베큐 소스', value: '5', price: 3400 },
  { label: '크리미 시저소스', value: '6', price: 2500 },
];
