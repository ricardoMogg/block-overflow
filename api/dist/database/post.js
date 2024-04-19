"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePost = exports.UpdateComment = exports.DeletePost = exports.DeleteComment = exports.DownvotePost = exports.DownvoteComment = exports.GetComment = exports.UpvoteComment = exports.UpvotePost = exports.CreateComment = exports.GetPost = exports.GetPosts = exports.CreatePost = void 0;
const client_1 = __importDefault(require("./client"));
function CreatePost(post) {
    return client_1.default.post.create({
        data: {
            title: post.title,
            content: post.content,
            walletAddress: post.walletAddress,
            tags: post.tags,
        },
    });
}
exports.CreatePost = CreatePost;
function GetPost(id) {
    return client_1.default.post.findFirstOrThrow({
        where: {
            id: id,
        },
        include: {
            comments: true,
            upvotes: true,
            _count: {
                select: {
                    comments: true,
                    upvotes: true,
                },
            },
        },
    });
}
exports.GetPost = GetPost;
function GetPosts() {
    return client_1.default.post.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            _count: {
                select: {
                    comments: true,
                    upvotes: true,
                },
            },
        },
    });
}
exports.GetPosts = GetPosts;
function GetComment(id) {
    return client_1.default.comment.findFirstOrThrow({
        where: {
            id: id,
        },
        include: {
            _count: {
                select: {
                    upvotes: true,
                },
            },
        },
    });
}
exports.GetComment = GetComment;
function CreateComment(comment) {
    return client_1.default.post.update({
        where: {
            id: comment.postId,
        },
        data: {
            comments: {
                create: {
                    content: comment.content,
                    walletAddress: comment.walletAddress,
                },
            },
        },
        include: {
            _count: {
                select: {
                    comments: true,
                    upvotes: true,
                },
            },
        },
    });
}
exports.CreateComment = CreateComment;
function UpdatePost(updatePost) {
    return client_1.default.post.update({
        where: {
            id: updatePost.postId,
            walletAddress: updatePost.walletAddress,
        },
        data: {
            title: updatePost.title,
            content: updatePost.content,
            tags: updatePost.tags,
        },
        include: {
            _count: {
                select: {
                    comments: true,
                    upvotes: true,
                },
            },
        },
    });
}
exports.UpdatePost = UpdatePost;
function UpdateComment(updateComment) {
    return client_1.default.comment.update({
        where: {
            id: updateComment.commentId,
        },
        data: {
            content: updateComment.content,
        },
        include: {
            _count: {
                select: {
                    upvotes: true,
                },
            },
        },
    });
}
exports.UpdateComment = UpdateComment;
function DeletePost(deletePost) {
    return client_1.default.post.delete({
        where: {
            id: deletePost.postId,
            walletAddress: deletePost.walletAddress,
        },
    });
}
exports.DeletePost = DeletePost;
function DeleteComment(deleteComment) {
    return client_1.default.post.update({
        where: {
            id: deleteComment.postId,
        },
        data: {
            comments: {
                delete: {
                    id: deleteComment.commentId,
                },
            },
        },
        include: {
            _count: {
                select: {
                    comments: true,
                    upvotes: true,
                },
            },
        },
    });
}
exports.DeleteComment = DeleteComment;
function UpvotePost(upvote) {
    return client_1.default.post.update({
        where: {
            id: upvote.postId,
        },
        data: {
            upvotes: {
                create: {
                    walletAddress: upvote.walletAddress,
                },
            },
        },
        include: {
            _count: {
                select: {
                    comments: true,
                    upvotes: true,
                },
            },
        },
    });
}
exports.UpvotePost = UpvotePost;
function UpvoteComment(upvote) {
    return client_1.default.comment.update({
        where: {
            id: upvote.commentId,
        },
        data: {
            upvotes: {
                create: {
                    walletAddress: upvote.walletAddress,
                },
            },
        },
        include: {
            _count: {
                select: {
                    upvotes: true,
                },
            },
        },
    });
}
exports.UpvoteComment = UpvoteComment;
function DownvotePost(downvote) {
    return client_1.default.post.update({
        where: {
            id: downvote.postId,
        },
        data: {
            upvotes: {
                delete: {
                    postId_walletAddress: {
                        postId: downvote.postId,
                        walletAddress: downvote.walletAddress,
                    },
                },
            },
        },
        include: {
            _count: {
                select: {
                    comments: true,
                    upvotes: true,
                },
            },
        },
    });
}
exports.DownvotePost = DownvotePost;
function DownvoteComment(downvote) {
    return client_1.default.comment.update({
        where: {
            id: downvote.commentId,
        },
        data: {
            upvotes: {
                delete: {
                    commentId_walletAddress: {
                        commentId: downvote.commentId,
                        walletAddress: downvote.walletAddress,
                    },
                },
            },
        },
        include: {
            _count: {
                select: {
                    upvotes: true,
                },
            },
        },
    });
}
exports.DownvoteComment = DownvoteComment;
