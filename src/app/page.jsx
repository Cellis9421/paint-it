"use client"
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import Button from '@/components/Button';
import { useState } from 'react';
import LargeInput from '@/components/LargeInput';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [ isFetching, setIsFetching ] = useState(false)
  const [ fetchError, setFetchError ] = useState(false)
  const [ variantImages, setVariantImages] = useState([])
  const [ urlInputValue, setUrlInputValue] = useState('')
  const [ lastSrcUrl, setLastSrcUrl] = useState('')

  const generateVariants = async (imgUrl) => {
    try{
      setIsFetching(true)
      const response = await fetch('/api/openai/images/generateVariants', { method: 'POST', body: JSON.stringify({ imgUrl }) });
      const responseData = await response.json()
      console.log('responseData', responseData)
      setLastSrcUrl(imgUrl);
      setVariantImages([...responseData.variantImages]);
      setIsFetching(false)
    } catch(e){
      setLastSrcUrl('');
      setFetchError(e)
      setIsFetching(false)
    }
  }
  const showVariantImages = variantImages?.length

  const VariantImages = () => {
    if(!showVariantImages) return null;
    return (
      <div className='flex'>
        {variantImages.map(variantImage => <img className='mb-4 mr-2 rounded-lg' key={variantImage} src={variantImage.url} alt="Image variant" width={256} height={256} />)}
      </div>
    )
  }

  const GeneratePaintingButton = () => {
    if(isFetching) return <Button>Generating...</Button>
    return <Button onClick={() => generateVariants(urlInputValue)}>Generate P(ai)nting</Button>
  }

  const LastSrcImage = () => {
    if(!lastSrcUrl) return null;
    return <img className='mb-4 rounded-lg' src={lastSrcUrl} alt="Image Src" width={256} height={256} />
  }

  return (
    <main className='flex flex-col justify-center items-center min-h-screen'>
        <div className='text-3xl mb-4'>p(ai)nt</div>
        <LastSrcImage />
        <div className={`flex w-full justify-center ${isFetching ? 'cursor-progress' : ''}`}>
          <LargeInput value={urlInputValue} setValue={setUrlInputValue} title="Input PNG Image URL" disabled={isFetching} />
          <GeneratePaintingButton />
        </div>
        <VariantImages />
    </main>
  )
}
