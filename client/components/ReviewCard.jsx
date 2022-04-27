const ReviewCard = (props) => {
    const { rating, service_type, cost, review } = props;
    // display rating, service type, cost, review
    const starObj = {
        1: '✩',
        2: '✩✩',
        3: '✩✩✩',
        4: '✩✩✩✩',
        5: '✩✩✩✩✩'
    }

    return(
        <div className="reviewCard">
            
        </div>
    )
}

export default ReviewCard;