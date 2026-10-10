import { useEffect, useState } from "react";
import dealsImg from "../../assets/header1.png"

const getTimeLeft = (target) => {
    const diff = Math.max(0, target - Date.now());
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
    };
};

const Deals = () => {
    // Rolling 30-day deal window so the countdown is always live
    const [target] = useState(() => Date.now() + 17 * 24 * 60 * 60 * 1000 + 32 * 60 * 60 * 1000 + 18 * 60 * 1000 + 47 * 1000);
    const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

    useEffect(() => {
        const t = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
        return () => clearInterval(t);
    }, [target]);

    return (
        <section className="section__container deals__container">
            <div className="deals__image">
                <img src={dealsImg} alt="Deals of the month promotion" loading="lazy" />
            </div>
            <div className="deals__content">
                <h5>Get upto 27% discount</h5>
                <h4>Deals of the month</h4>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed praesentium excepturi distinctio architecto saepe illum modi sequi! Ea, quo et.</p>

                <div className="deals__countdown flex-wrap" role="timer" aria-label="Deal countdown">
                    <div className="deals__countdown__card">
                        <h4>{timeLeft.days}</h4>
                        <p>Days</p>
                    </div>
                    <div className="deals__countdown__card">
                        <h4>{timeLeft.hours}</h4>
                        <p>Hours</p>
                    </div>
                    <div className="deals__countdown__card">
                        <h4>{timeLeft.mins}</h4>
                        <p>Mins</p>
                    </div>
                    <div className="deals__countdown__card">
                        <h4>{timeLeft.secs}</h4>
                        <p>Secs</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Deals
