'use client';
import { Header } from '@/layout/Header/page';
import React from 'react';

export default function CreateTenant() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen justify-top flex-col px-6">
        <p className="pt-2 text-lg">ようこそ！ 管理者さん</p>
        <h1 className="flex pt-6 text-3xl font-bold">テナント作成</h1>
        <form action="">
          <div className="flex flex-col gap-8 mt-16">
            <div className='flex flex-col gap-2 font-bold'>
              <label htmlFor="name">テナント名<span className='text-red-500'>*</span></label>
              <input type="text" id="name" className='border-2 h-10 rounded-md border-[#808080] px-2 font-normal' placeholder='テナント名を入力してください' />
            </div>
            <div className='flex flex-col gap-2 font-bold'>
              <label htmlFor="name">メールアドレス<span className='text-red-500'>*</span></label>
              <input type="text" id="email" className='border-2 h-10 rounded-md border-[#808080] px-2 font-normal' placeholder='メールアドレスを入力してください' />
            </div>
            <button type='submit' className="px-3 py-2 rounded-md font-medium bg-[#0584c7] text-white border-0 mt-8">
              作成
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
