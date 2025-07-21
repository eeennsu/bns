'use client';

import type { FC } from 'react';

import DetailWidget from '@widgets/admin/detail';

import useGetAllProducts from '@features/bundle/hooks/useGetAllProducts';
import useGetBundle from '@features/bundle/hooks/useGetBundle';
import useModifyBundle from '@features/bundle/hooks/useModifyBundleForm';
import BundleForm from '@features/bundle/ui/admin/Form';

import { IBundleItem, IProduct } from '@entities/bundle/types';

import useConfirmBeforeBack from '@hooks/usePreventGoBack';
import usePreventRefresh from '@hooks/usePreventRefresh';

const AdminBundleModifyPage: FC = () => {
  const {
    allProducts,
    isLoading: isAllProductsLoading,
    isError: isAllProductsError,
  } = useGetAllProducts();
  const { bundle, bundleProducts, isError, isLoading } = useGetBundle(allProducts);

  usePreventRefresh();
  useConfirmBeforeBack();

  return (
    <DetailWidget
      isError={isError || isAllProductsError}
      isLoading={isLoading || isAllProductsLoading}
    >
      <BundleModify
        bundle={bundle}
        bundleProducts={bundleProducts}
        allProducts={allProducts}
        isAllProductsLoading={isAllProductsLoading}
      />
    </DetailWidget>
  );
};

interface IProps {
  bundle: IBundleItem;
  bundleProducts: IProduct[];
  allProducts: IProduct[];
  isAllProductsLoading: boolean;
}

const BundleModify: FC<IProps> = ({
  bundle,
  bundleProducts,
  allProducts,
  isAllProductsLoading,
}) => {
  const { files, form, onSubmit, setFiles } = useModifyBundle(bundle, bundleProducts);

  return (
    <BundleForm
      files={files}
      form={form}
      setFiles={setFiles}
      submitProps={{
        label: '수정하기',
        onSubmit,
      }}
      isModify
      allProducts={allProducts}
      isAllProductsLoading={isAllProductsLoading}
    />
  );
};

export default AdminBundleModifyPage;
