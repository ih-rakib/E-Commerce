import dealsImg from "../../assets/header1.png"


const Deals = () => {
    return (
        <section className="section__container deals__container">
            <div className="deals__image">
                <img src={dealsImg} alt="deals image" />
            </div>
            <div className="deals__content">
                <h5>Get upto 27% discount</h5>
                <h4>Deals of the month</h4>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed praesentium excepturi distinctio architecto saepe illum modi sequi! Ea, quo et.</p>

                <div className="deals__countdown flex-wrap">
                    <div className="deals__countdown__card">
                        <h4>17</h4>
                        <p>Days</p>
                    </div>
                    <div className="deals__countdown__card">
                        <h4>32</h4>
                        <p>Hours</p>
                    </div>
                    <div className="deals__countdown__card">
                        <h4>18</h4>
                        <p>Mins</p>
                    </div>
                    <div className="deals__countdown__card">
                        <h4>47</h4>
                        <p>Secs</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Deals