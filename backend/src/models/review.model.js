import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({

});

const Review = mongoose.model("Review", reviewSchema);
export default Review;