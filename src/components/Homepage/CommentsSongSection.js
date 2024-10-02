"use client";

import React, { useState } from "react";

const CommentsSongSection = () => {
  const [comment, setComment] = useState("");
  const [song, setSong] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission for comment and song
  };

  return (
    <section id="comment-section" className="py-12">
      <h2 className="text-3xl text-center">Guest Comments & Song Requests</h2>
      <form className="flex flex-col items-center mt-6" onSubmit={handleSubmit}>
        <textarea
          placeholder="Leave a comment"
          className="border p-2 mb-4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <input
          type="text"
          placeholder="Suggest a song"
          className="border p-2 mb-4"
          value={song}
          onChange={(e) => setSong(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default CommentsSongSection;
