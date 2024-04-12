import Header from './Header';
import Controllers from './Controllers';

import { motion } from 'framer-motion';

export default function Layout(props) {
  const { title, providerMode = true } = props;

  return (
    <motion.div
      className='relative w-full h-dvh text-slate-100 font-medium px-6 py-8'
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {providerMode && <Header title={title} />}
      {props.children}
      {providerMode && <Controllers {...props} />}
    </motion.div>
  );
}
