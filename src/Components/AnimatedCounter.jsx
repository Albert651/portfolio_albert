import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const AnimatedCounter = ({ to, duration = 2 }) => {
    const [count, setCount] = useState(0);
    const controls = useAnimation();

    useEffect(() => {
        let start = 0;
        const increment = to / (duration * 60); // 60 FPS
        const counter = setInterval(() => {
            start += increment;
            if (start >= to) {
                start = to;
                clearInterval(counter);
            }
            setCount(Math.floor(start));
        }, 1000 / 60);
    }, [to, duration]);

    return (
        <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold"
        >
            {count}
        </motion.span>
    );
};

export default AnimatedCounter;
