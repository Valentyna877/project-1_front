import OnboardingForm from '@/components/profile/OnboardingForm/OnboardingForm';
import css from './page.module.css';
import { IMG_VARS } from '@/app/imgVars';

export default function OnboardingPage() {
    return (
        <div className={css.page}>
            <div className={css.formSide}>
                <h2 className={css.header}>Давайте познаймимось ближче</h2>
                <OnboardingForm />
            </div>
            <div className={css.imageSide}>
                <img src={IMG_VARS.PLANT1X}
                    srcSet={`${IMG_VARS.PLANT1X} 1x, ${IMG_VARS.PLANT2X} 2x`}
                    alt='plant' />
            </div>
        </div>
    );
}