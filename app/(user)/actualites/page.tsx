"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

interface Post {
  id: number;
  userName: string;
  userImage: string;
  date: string;
  text: string;
  image?: string | null;
  likes: number;
  comments?: { id: string | number; text: string }[];
}

function PostCard({ post }: { post: Post }) {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {
    if (!isLiked) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
    setIsLiked(!isLiked);
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    setComments([...comments, { text: commentText, id: Date.now() }]);
    setCommentText("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-0 border-b border-gray-200">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.userImage || "/placeholder.svg"} />
            <AvatarFallback>{post.userName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-black">{post.userName}</p>
            <span className="text-xs text-gray-500">{post.date}</span>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {post.image && (
        <div className="relative w-full aspect-square bg-gray-100">
          <Image
            src={post.image || "/placeholder.svg"}
            alt="post"
            fill
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div className="flex gap-4">
            <button
              onClick={handleLike}
              className="group transition transform hover:scale-110"
            >
              <Heart
                className={`w-6 h-6 transition ${
                  isLiked
                    ? "fill-red-500 text-red-500"
                    : "text-gray-600 group-hover:text-gray-800"
                }`}
              />
            </button>
            <button className="hover:text-gray-800 transition">
              <MessageCircle className="w-6 h-6 text-gray-600" />
            </button>
            <button className="hover:text-gray-800 transition">
              <Share2 className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <button className="hover:text-gray-800 transition">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V5z"
              />
            </svg>
          </button>
        </div>

        <p className="text-sm font-semibold text-black mb-2">{likes} j aime</p>

        <div className="mb-3">
          <p className="text-sm">
            <span className="font-semibold">{post.userName}</span>{" "}
            <span className="text-gray-800">{post.text}</span>
          </p>
        </div>

        {comments.length > 0 && (
          <button className="text-xs text-gray-500 hover:text-gray-700 mb-3">
            Voir les {comments.length} commentaire
            {comments.length > 1 ? "s" : ""}
          </button>
        )}

        <div className="flex gap-2 border-t border-gray-200 pt-3">
          <Input
            placeholder="Ajouter un commentaire..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleComment();
            }}
            className="text-sm border-0 bg-transparent placeholder:text-gray-500 focus:ring-0 p-0"
          />
          {commentText.trim() && (
            <button
              onClick={handleComment}
              className="text-blue-500 hover:text-blue-700 text-sm font-semibold"
            >
              Envoyer
            </button>
          )}
        </div>

        {comments.length > 0 && (
          <div className="mt-3 space-y-2 max-h-40 overflow-y-auto">
            {comments.map((c) => (
              <div key={c.id} className="text-sm">
                <span className="font-semibold text-gray-900">
                  Utilisateur{" "}
                </span>
                <span className="text-gray-800">{c.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ActualitesPage() {
  const fakePosts = [
    {
      id: 15,
      userName: "Technicien",
      userImage: "/profile-avatar.png",
      date: "Il y a 2h",
      text: "Inspection du toit effectuée. Aucun problème détecté.",
      image: "https://picsum.photos/id/1049/800/500",
      likes: 4,
      comments: [],
    },
    {
      id: 16,
      userName: "Gardien",
      userImage: "/gardien-avatar.jpg",
      date: "Il y a 10h",
      text: "Livraison de colis pour l'appartement 12C.",
      image: "https://picsum.photos/id/1068/800/500",
      likes: 1,
      comments: [],
    },
    {
      id: 17,
      userName: "Syndic Admin",
      userImage: "/profile-avatar.png",
      date: "Il y a 3 jours",
      text: "Avis : coupure d'eau prévue demain entre 9h et 11h.",
      image: "https://picsum.photos/id/1033/800/500",
      likes: 9,
      comments: [],
    },
    {
      id: 18,
      userName: "Résident",
      userImage: "/resident-avatar.jpg",
      date: "Il y a 4 jours",
      text: "Suggestion : organiser une réunion mensuelle entre voisins.",
      image: "https://picsum.photos/id/1084/800/500",
      likes: 6,
      comments: [{ id: "d", text: "Bonne initiative !" }],
    },
    {
      id: 19,
      userName: "Gardien",
      userImage: "/gardien-avatar.jpg",
      date: "Il y a 5 jours",
      text: "Alerte : fuite d'eau détectée dans le bloc C. Intervention en cours.",
      image: "https://picsum.photos/id/109/800/500",
      likes: 2,
      comments: [],
    },
  ];

  return (
    <>
      <div className="w-full bg-white">
        <div className="max-w-2xl mx-auto">
          {fakePosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
