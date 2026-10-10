
const Ratings = ({ rating = 0 }) => {
    const numericRating = Number(rating) || 0;
    const fullStars = Math.floor(numericRating);
    const hasHalf = numericRating - fullStars >= 0.5;
    const stars = [];

    for (let i = 1; i <= 5; ++i) {
        const className = i <= fullStars
            ? 'ri-star-fill'
            : (i === fullStars + 1 && hasHalf ? 'ri-star-half-fill' : 'ri-star-line');
        stars.push(
            <span key={i} className={className} aria-hidden="true"></span>
        )
    }

    return (
        <div className="product__rating" role="img" aria-label={`Rated ${numericRating} out of 5`}>{stars}</div>
    )
}

export default Ratings