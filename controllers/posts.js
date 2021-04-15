// Gives access to model
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
	try {
		// If the req is successful get all posts from db
		const postMessages = await PostMessage.find();
		res.status(200).json(postMessages);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createPosts = async (req, res) => {
	// A frontend form is required in  order to have a req.body
	const post = req.body;

	const newPost = new PostMessage(post);
	try {
		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};
