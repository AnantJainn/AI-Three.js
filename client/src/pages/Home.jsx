// // import React from 'react'
// import { motion, AnimatePresence } from 'framer-motion';
// import { useSnapshot } from 'valtio';
// import { CustomButton } from '../components';
// import {
//   headContainerAnimation,
//   headContentAnimation,
//   headTextAnimation,
//   slideAnimation
// } from '../config/motion'
// import state from '../store'

// const Home = () => {
//   const snap = useSnapshot(state);
//   return (
//     <AnimatePresence>
//       {snap.intro && (
//         <motion.section className='home' {...slideAnimation('left')}>
//           <motion.header>
//             <img
//               src='./threejs.png'
//               alt='logo'
//               className='w-8 h-8 object-contain'
//             />
//           </motion.header>

//           <motion.div className='home-constant' {...headContainerAnimation}>
//           <motion.div {...headTextAnimation}>
//             <h1 className='head-text'>
//               LET'S <br className='xl:block hidden' /> DO oIT!!
//             </h1>
//           </motion.div>
//           <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
//             <p className='max-w-md font-normal text-gray-600 text-base'>
//               Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong>Unleash your imaginations</strong>{" "} and define your own style. 
//             </p>
//             <CustomButton 
//               type="filled"
//               title="Customize It"
//               handleClick={() => state.intro = false}
//               customStyles="w-fit px-4 py-2.5 font-bold text-sm"
//             />
//           </motion.div>
//           </motion.div>
//         </motion.section>
//       )}
//     </AnimatePresence>
//   )
// }

// export default Home

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { CustomButton } from '../components';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion';
import state from '../store';

const Home = () => {
  const snap = useSnapshot(state);
  const [firstRecord, setFirstRecord] = useState(null);

  useEffect(() => {
    const apiUrl = "http://3.27.158.70:5001/news/allNews?page=1&limit=10&type=press";

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Check if there is at least one record
        if (data.data && data.data.length > 0) {
          // Set the first record in state
          setFirstRecord(data);
        }
      })
      .catch(error => {
        // Handle errors here
        console.error("Error fetching data:", error);
      });
  }, []); // Run the effect only once when the component mounts

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className='home' {...slideAnimation('left')}>
          <motion.header>
            <img
              src='./threejs.png'
              alt='logo'
              className='w-8 h-8 object-contain'
            />
          </motion.header>

          <motion.div className='home-constant' {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className='head-text'>
                {firstRecord ? `First Record ID: ${firstRecord}` : `First Record ID: ${firstRecord}`}
              </h1>
            </motion.div>
            <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
              <p className='max-w-md font-normal text-gray-600 text-base'>
                Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong>Unleash your imaginations</strong>{" "} and define your own style.
              </p>
              <CustomButton
                type="filled"
                title="Customize It"
                handleClick={() => state.intro = false}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default Home;
