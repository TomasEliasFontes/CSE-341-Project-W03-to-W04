// controllers/reviewsController.js
exports.getAllReviews = (req, res) => {
  res.json({ message: 'GET /reviews funcionando' });
};
exports.getReviewById = (req, res) => {
  res.json({ message: 'GET /reviews/:id funcionando' });
};
exports.createReview = (req, res) => {
  res.status(201).json({ message: 'POST /reviews funcionando' });
};
exports.updateReview = (req, res) => {
  res.json({ message: 'PUT /reviews/:id funcionando' });
};
exports.deleteReview = (req, res) => {
  res.json({ message: 'DELETE /reviews/:id funcionando' });
};
