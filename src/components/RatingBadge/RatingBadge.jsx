import './RatingBadge.css';

function RatingBadge(promise) {
  return (
    <>
      <div className="rating-badge">
        <span className="rating-badge__value">{promise.rating.Value}</span>
        <span className="rating-badge__source">{promise.rating.Source}</span>
      </div>
    </>
  );
}

export default RatingBadge;
