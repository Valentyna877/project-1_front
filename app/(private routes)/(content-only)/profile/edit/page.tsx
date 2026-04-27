// import OnboardingForm from '@/components/profile/OnboardingForm/OnboardingForm';
import '@/styles/container.css'
import css from './page.module.css';
import { IMG_VARS } from '@/app/imgVars';
import OnboardingClient from '@/components/profile/OnboardingForm/OnboardingClient';

export default function OnboardingPage() {
    return (
        <div className={`${css.page} container`}>
            <div className={css.formSide}>
                <img src="../../../../../public/logo.png" alt='Лелека лого'/>
                <h2 className={css.header}>Давайте познаймимось ближче</h2>
                {/* <OnboardingForm /> */}
                <OnboardingClient/>
            </div>
            <div className={css.imageSide}>
                <img src={IMG_VARS.PLANT1X}
                    srcSet={`${IMG_VARS.PLANT1X} 1x, ${IMG_VARS.PLANT2X} 2x`}
                    alt='plant' />
            </div>
        </div>
    );
}