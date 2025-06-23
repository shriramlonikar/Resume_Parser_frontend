import React, { useState } from 'react';
import GetResume from '../components/getResume';
import TextArea from '../components/TextArea';

const Home = () => {
  const [geminiResponse, setGeminiResponse] = useState("");

  return (
    <div className='bg-zinc-900 min-h-screen w-full text-gray-300 px-4 py-6'>
      <div className='text-center md:text-left'>
        <h1 className='text-3xl md:text-4xl font-bold text-yellow-400 mb-2'>Resume Parser</h1>
        <p className='text-sm md:text-base'>Analyse your resume to get a better job!</p>
      </div>

      <div className='mt-8'>
        <GetResume setGeminiResponse={setGeminiResponse} />
      </div>

      <div className='py-11 mt-16'>
        <TextArea geminiResponse={geminiResponse} />
      </div>
    </div>
  );
};

export default Home;
