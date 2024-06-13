'use client';

import deliveryAnimation from '@/public/animations/hero-animation.json';
import Lottie from 'react-lottie-player';

const Animation = () => {
    const handleScroll = () => {
        const mainElement = document.getElementById('container');
        if (mainElement) {
            const mainPosition = mainElement.offsetTop;
            window.scrollTo({
                top: mainPosition,
                behavior: 'smooth',
            });
        }
    };
    return (
        <div className="w-full overflow-hidden relative">
            <Lottie
                loop
                animationData={deliveryAnimation}
                play
                className="w-screen"
            />
            <h1 className="absolute top-[20%] w-1/4 right-20 text-[#154f41] font-semibold text-5xl">
                Online Software Products Store .
            </h1>

            <button
                onClick={handleScroll}
                className="absolute top-1/3 right-80 hover:opacity-90 bg-[#154f41] text-white rounded-3xl p-4"
            >
                Buy Products
            </button>
        </div>
    );
};

export default Animation;
