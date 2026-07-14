function Contact() {
  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2>Contact Us</h2>

      <input
        className="form-control mb-3"
        placeholder="Your Name"
      />

      <input
        className="form-control mb-3"
        placeholder="Email"
      />

      <textarea
        className="form-control mb-3"
        rows="5"
        placeholder="Message"
      />

      <button className="btn btn-primary">
        Send Message
      </button>
    </div>
  );
}

export default Contact;