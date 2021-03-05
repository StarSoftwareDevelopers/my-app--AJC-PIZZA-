import React from 'react';
import {
    HeroContainer,
    HeroItems,
    HeroP,
    HeroBtn,
    HeroContent,
    HeroH1
} from './ElementsHero';

const Hero = () => {
    return (
        <div>
            <HeroContainer>
            
            <HeroContent>
                <HeroItems>
                <HeroH1>AJC Homemade Pizza</HeroH1>
                <HeroP>The Best & Mouth-watering Pizza in Ayala</HeroP>
                <HeroBtn>Order Now</HeroBtn>
                </HeroItems>
            </HeroContent>
            </HeroContainer>
            
        </div>
    )
}

export default Hero;