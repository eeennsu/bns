'use client';

import { ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, FC } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shadcn-ui/ui/dialog';

interface IProps {}

const BreadDetailModal: FC = ({}: IProps) => {
  return (
    <Dialog>
      <DialogTrigger>heee</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-[#FFFFF0] shadow-lg'>
          <div className='p-6 md:p-8'>
            <div className='grid items-start gap-8 md:grid-cols-2'>
              <div className='relative'>
                <div className='relative h-[300px] w-full overflow-hidden rounded-lg md:h-[400px]'>
                  <Image
                    src={bread.image || '/placeholder.svg'}
                    alt={bread.name}
                    fill
                    className='object-cover'
                  />
                </div>
                {bread.isBestSeller && (
                  <div className='absolute top-4 right-4 rounded bg-[#8B4513] px-3 py-1 font-bold text-[#FFFFF0]'>
                    BEST
                  </div>
                )}
                {bread.isNew && (
                  <div className='absolute top-4 left-4 rounded bg-[#E74C3C] px-2 py-1 text-xs font-bold text-white'>
                    NEW
                  </div>
                )}
              </div>

              <div>
                <div className='mb-6'>
                  <h2 className='mb-2 text-3xl font-bold text-[#8B4513] md:text-4xl'>
                    {bread.name}
                  </h2>
                  <div className='mb-4 flex items-center gap-2'>
                    <div className='flex items-center text-[#F1C40F]'>
                      <Star size={16} fill='#F1C40F' />
                      <span className='ml-1 text-[#3E2723]'>{bread.rating}</span>
                    </div>
                    <span className='text-[#3E2723]/70'>({bread.reviewCount}개 리뷰)</span>
                  </div>
                  <p className='mb-4 text-xl font-bold text-[#3E2723]'>
                    {bread.price.toLocaleString()}원
                  </p>
                  <p className='mb-6 text-[#3E2723]'>{bread.description}</p>
                </div>

                <div className='mb-6'>
                  <h3 className='mb-2 text-lg font-bold text-[#8B4513]'>알레르기 정보</h3>
                  <p className='mb-4 text-[#3E2723]'>
                    알레르기 유발 성분: {bread.allergens.join(', ')}
                  </p>

                  <h3 className='mb-2 text-lg font-bold text-[#8B4513]'>보관 방법</h3>
                  <p className='text-[#3E2723]'>{bread.storageGuide}</p>
                </div>

                <div className='flex flex-col gap-4 sm:flex-row'>
                  <div className='flex items-center'>
                    <button
                      onClick={decreaseQuantity}
                      className='flex h-10 w-10 items-center justify-center rounded-l border border-[#8B4513]/20 bg-[#FFFFF0] transition-colors hover:bg-[#8B4513]/5'
                    >
                      -
                    </button>
                    <div className='flex h-10 w-12 items-center justify-center border-t border-b border-[#8B4513]/20 bg-[#FFFFF0]'>
                      {quantity}
                    </div>
                    <button
                      onClick={increaseQuantity}
                      className='flex h-10 w-10 items-center justify-center rounded-r border border-[#8B4513]/20 bg-[#FFFFF0] transition-colors hover:bg-[#8B4513]/5'
                    >
                      +
                    </button>
                  </div>
                  <button className='flex flex-1 items-center justify-center gap-2 rounded bg-[#8B4513] px-6 py-3 text-[#FFFFF0] transition-colors hover:bg-[#A0522D]'>
                    <ShoppingCart size={18} />
                    장바구니에 담기
                  </button>
                </div>
              </div>
            </div>

            {/* 상세 설명 */}
            <div className='mt-12 grid gap-8 md:grid-cols-2'>
              <div>
                <h3 className='mb-4 text-2xl font-bold text-[#8B4513]'>상세 설명</h3>
                <p className='whitespace-pre-line text-[#3E2723]'>{bread.longDescription}</p>
              </div>

              <div>
                <h3 className='mb-4 text-2xl font-bold text-[#8B4513]'>원재료 정보</h3>
                <ul className='mb-6 list-inside list-disc text-[#3E2723]'>
                  {bread.ingredients.map((ingredient: string, index: number) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>

                <h3 className='mb-4 text-2xl font-bold text-[#8B4513]'>영양 정보</h3>
                <div className='rounded-lg border border-[#8B4513]/10 bg-[#FFFFF0] p-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='border-b border-[#8B4513]/10 pb-2'>
                      <p className='text-sm text-[#3E2723]/70'>칼로리</p>
                      <p className='font-bold text-[#3E2723]'>
                        {bread.nutritionFacts.calories} kcal
                      </p>
                    </div>
                    <div className='border-b border-[#8B4513]/10 pb-2'>
                      <p className='text-sm text-[#3E2723]/70'>단백질</p>
                      <p className='font-bold text-[#3E2723]'>{bread.nutritionFacts.protein}g</p>
                    </div>
                    <div className='border-b border-[#8B4513]/10 pb-2'>
                      <p className='text-sm text-[#3E2723]/70'>탄수화물</p>
                      <p className='font-bold text-[#3E2723]'>{bread.nutritionFacts.carbs}g</p>
                    </div>
                    <div className='border-b border-[#8B4513]/10 pb-2'>
                      <p className='text-sm text-[#3E2723]/70'>지방</p>
                      <p className='font-bold text-[#3E2723]'>{bread.nutritionFacts.fat}g</p>
                    </div>
                    <div>
                      <p className='text-sm text-[#3E2723]/70'>식이섬유</p>
                      <p className='font-bold text-[#3E2723]'>{bread.nutritionFacts.fiber}g</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 추천 상품 */}
            {relatedProducts.length > 0 && (
              <div className='mt-12'>
                <h3 className='mb-6 text-2xl font-bold text-[#8B4513]'>함께 구매하면 좋은 빵</h3>
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
                  {relatedProducts.map(product => (
                    <div
                      key={product.id}
                      className='cursor-pointer overflow-hidden rounded-lg border border-[#8B4513]/10 bg-[#FFFFF0] shadow-sm transition-shadow hover:shadow-md'
                      onClick={() => {
                        setBread(null); // 현재 모달 내용 초기화
                        setTimeout(() => {
                          // 새 빵 정보로 모달 업데이트
                          const newBread = breadProducts.find(item => item.id === product.id);
                          if (newBread) {
                            setBread({
                              ...newBread,
                              longDescription:
                                '아티산 브레드의 시그니처 제품 중 하나입니다. 100% 천연 발효종을 사용하여 24시간 이상 저온에서 천천히 발효시켜 만듭니다.',
                              ingredients: [
                                '유기농 밀가루',
                                '천연 발효종',
                                '히말라야 핑크 솔트',
                                '정제수',
                              ],
                              nutritionFacts: {
                                calories: 250,
                                protein: 8,
                                carbs: 48,
                                fat: 2,
                                fiber: 3,
                              },
                              allergens: ['밀'],
                              storageGuide:
                                '서늘하고 건조한 곳에 보관하세요. 당일 섭취를 권장합니다.',
                              rating: 4.5,
                              reviewCount: 98,
                            });
                          }
                        }, 100);
                      }}
                    >
                      <div className='relative h-48'>
                        <Image
                          src={product.image || '/placeholder.svg'}
                          alt={product.name}
                          fill
                          className='object-cover'
                        />
                      </div>
                      <div className='p-4'>
                        <h4 className='font-bold text-[#8B4513]'>{product.name}</h4>
                        <p className='text-[#3E2723]'>{product.price.toLocaleString()}원</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BreadDetailModal;
