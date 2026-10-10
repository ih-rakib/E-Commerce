import { useState } from 'react';
import commentorImg from '../../../assets/avatar1.png';
import { formateDate } from '../../../utils/formatDate';
import Ratings from '../../../components/Ratings';
import PostReview from './PostReview';

const ReviewsCard = ({ productReviews }) => {
    const reviews = productReviews || [];
    // console.log(reviews);

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenReviewModal = () => {
        setIsModalOpen(true)
    }
    const handleCloseReviewModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className='my-6 bg-white p-4 sm:p-6 md:p-8 rounded-lg'>
            {reviews.length > 0 ? (
                <div>
                    <h3 className='text-lg font-medium'>Reviews: </h3>
                    <div>
                        {reviews.map((review) => (
                            <div key={review?._id || review?.id || `${review?.userId?._id}-${review?.createdAt}`} className='mt-4'>
                                <div className='flex gap-4 items-center'>
                                    <img src={commentorImg} alt={`${review?.userId?.username || 'Reviewer'} avatar`} className='size-14 rounded-full object-cover' loading="lazy" />
                                    <div className='space-y-1'>
                                        <p className='text-lg font-medium capitalize text-slate-800'>{review?.userId?.username || 'Anonymous'}</p>
                                        <p className='text-sm italic'>{formateDate(review?.createdAt)}</p>
                                        <Ratings rating={review?.rating} />
                                    </div>
                                </div>
                                <div className='text-gray-600 mt-5 border p-4 md:p-6 w-full md:w-4/5 break-words'>
                                    <p>{review?.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <span>No reviews found</span>
            )}

            {/* add review button */}
            <div className='mt-12'>
                <button onClick={handleOpenReviewModal} className='px-6 py-3 text-white bg-green-500 rounded-md'>Add a Review</button>
            </div>

            {/* review modal */}
            <PostReview isModalOpen={isModalOpen} handleCloseReviewModal={handleCloseReviewModal}></PostReview>
        </div>
    );
};

export default ReviewsCard;
