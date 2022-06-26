import React, { createContext, useContext, useState } from 'react';

const CommentContext = createContext();
export const useCommentContext = () => useContext(CommentContext);

const initialComments = [
  {
    text: "hello",
    id: 1,
    replies: []
  },
  {
    text: "cool",
    id: 4,
    replies: [
      {
        text: "right",
        id: 23,
        replies: []
      },
      {
        text: "+",
        id: 3,
        replies: [
          {
            text: "i agree",
            id: 2,
            replies: []
          }
        ]
      },
    ]
  },
];

export default function CommentContextProvider({ children }) {
  const [comments, setComments] = useState(initialComments);

  const newComment = text => ({ text, id: new Date().getTime(), replies: [] });

  const createComment = text => setComments([...comments, newComment(text)]);

  const createReply = (parentId, text) => {
    const commentsWithNewReply = [...comments];
    insertComment(commentsWithNewReply, parentId, text);
    setComments(commentsWithNewReply);
  }

  const insertComment = (comments, parentId, text) => {
  }

  const value = {
    comments,
    createComment,
    createReply
  }

  return (
    <CommentContext.Provider value={value}>
      {children}
    </CommentContext.Provider>
  )
}
