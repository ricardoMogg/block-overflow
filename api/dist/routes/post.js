"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const post_1 = require("../database/post");
exports.postRouter = (0, express_1.Router)();
// create post
exports.postRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, walletAddress, tags } = req.body;
        const post = {
            title,
            content,
            walletAddress,
            tags,
        };
        const posts = yield (0, post_1.CreatePost)(post);
        return res.json(posts);
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// get single post
exports.postRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const post = yield (0, post_1.GetPost)(id);
        return res.json(post);
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// get all posts
exports.postRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield (0, post_1.GetPosts)();
        return res.json(posts);
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// add comment to post
exports.postRouter.post('/:id/comment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const { content, walletAddress } = req.body;
        const comment = {
            content: content,
            walletAddress,
            postId,
        };
        const posts = yield (0, post_1.CreateComment)(comment);
        return res.json(posts);
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// upvote a post
exports.postRouter.post('/:id/upvote', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const input = {
            postId,
            walletAddress: req.body.walletAddress,
        };
        const posts = yield (0, post_1.UpvotePost)(input);
        return res.json(posts);
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// upvote a comment
exports.postRouter.post('/:id/comment/upvote/:commentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const commentId = req.params.commentId;
        const { walletAddress } = req.body;
        const input = {
            postId,
            commentId,
            walletAddress,
        };
        const posts = yield (0, post_1.UpvoteComment)(input);
        return res.json(posts);
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// delete a post
exports.postRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const input = {
            postId,
            walletAddress: req.body.walletAddress,
        };
        const posts = yield (0, post_1.DeletePost)(input);
        return res.json(posts);
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// delete a comment
exports.postRouter.delete('/:id/comment/:commentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const commentId = req.params.commentId;
        const { walletAddress } = req.body;
        const input = {
            postId,
            commentId,
            walletAddress,
        };
        const posts = yield (0, post_1.DeleteComment)(input);
        return res.json(posts);
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// update a post
exports.postRouter.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const { walletAddress, content, title, tags } = req.body;
        const input = {
            postId,
            walletAddress,
            content,
            title,
            tags,
        };
        const posts = yield (0, post_1.UpdatePost)(input);
        return res.json(posts);
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// update a comment
exports.postRouter.patch('/:id/comment/:commentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const commentId = req.params.commentId;
        const { walletAddress, content } = req.body;
        const input = {
            postId,
            commentId,
            walletAddress,
            content,
        };
        const posts = yield (0, post_1.UpdateComment)(input);
        return res.json(posts);
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// downvote a post
exports.postRouter.delete('/:id/downvote', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const input = {
            postId,
            walletAddress: req.body.walletAddress,
        };
        const posts = yield (0, post_1.DownvotePost)(input);
        return res.json(posts);
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// downvote a comment
exports.postRouter.delete('/:id/comment/downvote/:commentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const commentId = req.params.commentId;
        const { walletAddress } = req.body;
        const input = {
            postId,
            commentId,
            walletAddress,
        };
        const posts = yield (0, post_1.DownvoteComment)(input);
        return res.json(posts);
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// sanity check
exports.postRouter.post('/health', (req, res) => {
    res.send('post malone!!');
});
