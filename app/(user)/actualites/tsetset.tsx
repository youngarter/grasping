"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle } from "lucide-react";

// --- PostCard Component ---
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
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");

  const handleLike = () => setLikes(likes + 1);

  const handleComment = () => {
    if (!commentText.trim()) return;
    setComments([...comments, { text: commentText, id: Date.now() }]);
    setCommentText("");
  };

  return (
    <Card className="w-full max-w-xl mx-auto mb-6">
      <CardHeader className="flex flex-row gap-3 items-center">
        <Avatar>
          <AvatarImage src={post.userImage} />
          <AvatarFallback>{post.userName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{post.userName}</p>
          <span className="text-xs text-gray-500">{post.date}</span>
        </div>
      </CardHeader>

      <CardContent>
        {post.image && (
          <Image
            src={post.image}
            alt="post-img"
            width={500}
            height={300}
            className="rounded-xl w-full object-cover"
          />
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <div className="flex gap-5 text-gray-600">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 hover:text-red-500 transition"
          >
            <Heart className="w-5 h-5" /> {likes}
          </button>

          <div className="flex items-center gap-1">
            <MessageCircle className="w-5 h-5" /> {comments.length}
          </div>
        </div>

        {/* Comment Input */}
        <div className="flex gap-2 w-full">
          <Input
            placeholder="Ajouter un commentaire..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button onClick={handleComment}>Envoyer</Button>
        </div>

        {/* Comments */}
        <div className="w-full mt-2">
          {comments.map((c) => (
            <p key={c.id} className="text-sm border-b py-1 text-gray-700">
              {c.text}
            </p>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}

// --- Actualités Page ---
export default function ActualitesPage() {
  const fakePosts = [
    {
      id: 1,
      userName: "Syndic Admin",
      userImage: "/avatars/1.png",
      date: "Il y a 1h",
      text: "Une panne d'ascenseur a été signalée. Intervention prévue demain matin.",
      image: "https://picsum.photos/id/1050/800/500",
      likes: 3,
      comments: [{ id: "a", text: "Merci pour l'info" }],
    },
    {
      id: 2,
      userName: "Gardien",
      userImage: "/avatars/2.png",
      date: "Il y a 5h",
      text: "Nettoyage terminé dans le hall A.",
      image: "https://picsum.photos/id/1066/800/500",
      likes: 1,
      comments: [],
    },
    {
      id: 3,
      userName: "Syndic Admin",
      userImage: "/avatars/3.png",
      date: "Hier",
      text: "Réunion avec les copropriétaires dimanche prochain.",
      image: "https://picsum.photos/id/1031/800/500",
      likes: 8,
      comments: [],
    },
    {
      id: 4,
      userName: "Résident",
      userImage: "/avatars/4.png",
      date: "Il y a 2 jours",
      text: "Suggestion : ajouter un banc dans l’espace vert.",
      image: "https://picsum.photos/id/1003/800/500",
      likes: 5,
      comments: [{ id: "b", text: "Bonne idée !" }],
    },
  ];

  return (
    <div className="w-full py-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Actualités</h1>

      {fakePosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
