function Rating({ value, text }) {
  return (
    <div className="d-flex align-items-center mb-2">

      <span className="text-warning fs-5">
        {value >= 1 ? "★" : "☆"}
        {value >= 2 ? "★" : "☆"}
        {value >= 3 ? "★" : "☆"}
        {value >= 4 ? "★" : "☆"}
        {value >= 5 ? "★" : "☆"}
      </span>

      <small className="ms-2 text-muted">
        {value.toFixed(1)} ({text})
      </small>

    </div>
  );
}

export default Rating;