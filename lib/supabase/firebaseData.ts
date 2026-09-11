import { db, storage } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  increment,
  Timestamp,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Posts
export const postsCollection = collection(db, 'posts');

export async function createPost(postData: {
  userId: string;
  textContent: string;
  imageUrl?: string | null;
  userName: string;
  userAvatar: string;
}) {
  const docRef = await addDoc(postsCollection, {
    user_id: postData.userId,
    text_content: postData.textContent,
    image_url: postData.imageUrl || null,
    likes_count: 0,
    comments_count: 0,
    shares_count: 0,
    created_at: Timestamp.now(),
    user: {
      id: postData.userId,
      full_name: postData.userName,
      avatar_url: postData.userAvatar,
    },
  });
  return docRef.id;
}

export function onPostsSnapshot(callback: (posts: any[]) => void) {
  const q = query(postsCollection, orderBy('created_at', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || doc.data().created_at,
    }));
    callback(posts);
  });
}

export async function toggleLike(postId: string, userId: string) {
  const likeRef = doc(db, 'likes', `${postId}_${userId}`);
  const postRef = doc(db, 'posts', postId);
  
  const likeDoc = await getDoc(likeRef);
  
  if (likeDoc.exists()) {
    await deleteDoc(likeRef);
    await updateDoc(postRef, { likes_count: increment(-1) });
    return false;
  } else {
    await setDoc(likeRef, { post_id: postId, user_id: userId, created_at: Timestamp.now() });
    await updateDoc(postRef, { likes_count: increment(1) });
    return true;
  }
}

export async function getLikedPosts(userId: string) {
  const q = query(collection(db, 'likes'), where('user_id', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data().post_id);
}

// Comments
export const commentsCollection = collection(db, 'comments');

export async function addComment(postId: string, userId: string, content: string, userName: string, userAvatar: string) {
  await addDoc(commentsCollection, {
    post_id: postId,
    user_id: userId,
    content,
    created_at: Timestamp.now(),
    user: {
      id: userId,
      full_name: userName,
      avatar_url: userAvatar,
    },
  });
  
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, { comments_count: increment(1) });
}

export function onCommentsSnapshot(postId: string, callback: (comments: any[]) => void) {
  const q = query(
    commentsCollection,
    where('post_id', '==', postId),
    orderBy('created_at', 'asc')
  );
  return onSnapshot(q, (snapshot) => {
    const comments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || doc.data().created_at,
    }));
    callback(comments);
  });
}

// Stories
export const storiesCollection = collection(db, 'stories');

export async function createStory(storyData: {
  userId: string;
  imageUrl?: string;
  textContent?: string;
  userName: string;
  userAvatar: string;
}) {
  const docRef = await addDoc(storiesCollection, {
    user_id: storyData.userId,
    image_url: storyData.imageUrl || null,
    text_content: storyData.textContent || null,
    has_unseen: true,
    created_at: Timestamp.now(),
    expires_at: Timestamp.fromDate(new Date(Date.now() + 24 * 60 * 60 * 1000)), // 24h
    user: {
      id: storyData.userId,
      full_name: storyData.userName,
      avatar_url: storyData.userAvatar,
    },
  });
  return docRef.id;
}

export function onStoriesSnapshot(callback: (stories: any[]) => void) {
  const q = query(
    storiesCollection,
    where('expires_at', '>', Timestamp.now()),
    orderBy('created_at', 'desc')
  );
  return onSnapshot(q, (snapshot) => {
    const stories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || doc.data().created_at,
    }));
    callback(stories);
  });
}

// Storage
export async function uploadToStorage(file: File, path: string) {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

// Share
export async function incrementShareCount(postId: string) {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, { shares_count: increment(1) });
}
