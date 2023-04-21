import  { PostType }  from "@/types/types";

export default function instanceOfPost(obj: any): obj is PostType {
    return 'postImage' in obj && 'createdAt' in obj && 'authorName' in obj && 'authorAvatar' in obj && 'postText' in obj && 'id' in obj; 
}