export interface Comment {
  timestamp: string;
  userComment: string;
  userEmail: string;
  userId: string;
  userName: string;
}

export interface Timestamp {
  toDate(): Date;
}

export interface Post {
  email: string;
  firstName: string;
  image: string;
  text: string;
  uid: string;
  id: string;
  timestamp: Timestamp | string;
  data(): {
    email: string;
    firstName: string;
    image: string;
    text: string;
    uid: string;
    timestamp: Timestamp;
  };
}
