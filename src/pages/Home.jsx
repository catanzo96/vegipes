import React from 'react';
import Form from '../components/Form';
import Popular from '../components/Popular';
import Vegan from '../components/Vegan';

import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className='page'>
      <div className='page-center'>
        <Form />
        <motion.div
          animate={{opacity: 1}}
          initial={{opacity: 0}}
          exit={{opacity: 0}}
          transition={{duration: 0.5}}
        >
          <Popular />
          <Vegan />
        </motion.div>
      </div>
    </div>
  )
}
