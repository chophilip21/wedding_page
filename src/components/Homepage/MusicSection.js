"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import images from "@/utils/imagesImport";
import { Input } from "@/components/ui/input";
import { VscSearch } from "react-icons/vsc";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";
import { FaStop } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { getSpotifyAccessToken } from "@/utils/spotify";

const MusicSection = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const resultsRef = useRef(null);
  const audioRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [progress, setProgress] = useState(0);

  // Function to fetch search results from the API
  const searchTracks = async (searchQuery) => {
    if (!searchQuery) {
      setResults([]);
      return;
    }
    try {
      const response = await fetch(
        `/api/search-music?query=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setResults(data.tracks.items);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };
  // Handle typing in the input field
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    searchTracks(value);
    setIsFocused(true); // Ensure it's focused when typing
  };

  // Handle clicking outside the container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target)
      ) {
        setResults([]); // Close search results when clicking outside
        setIsFocused(false); // Reset focus state
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to play or stop the song preview
  const handlePlayPreview = (previewUrl, trackId) => {
    if (currentlyPlaying === trackId) {
      // Stop current song
      setCurrentlyPlaying(null);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset to start
      }
      setProgress(0);
    } else {
      // Play the selected song
      setCurrentlyPlaying(trackId);
      if (audioRef.current) {
        audioRef.current.src = previewUrl;
        audioRef.current.play().catch((error) => {
          console.error("Audio play error:", error);
        });
      }
    }
  };

  // Handle the progress of the song preview
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress); // Update progress
    }
  };

  // When the song preview ends, reset the button to the play icon
  const handleAudioEnd = () => {
    setCurrentlyPlaying(null);
    setProgress(0);
  };

  // function to add songs to the playlist
  const addTrackToPlaylist = async (trackUri) => {
    try {
      const response = await fetch("/api/add-track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackUri }), // Send the track URI to the API
      });

      const data = await response.json();

      if (response.ok) {
        alert("Track added to playlist!");
      } else {
        console.error("Failed to add track to playlist:", data);
      }
    } catch (error) {
      console.error("Error adding track to playlist:", error);
    }
  };

  // speed up the background video
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      // (130% speed)
      videoElement.playbackRate = 1.3;
    }
  }, []);

  return (
    <section
      id="comment-section"
      className="relative w-full h-svh bg-center bg-no-repeat bg-cover flex flex-col justify-start"
      style={{
        backgroundImage: `url(${images.musicsect.src})`,
      }}
    >
      <div className="w-full h-full z-20 flex flex-col justify-start items-center px-12 pb-12 pt-48">
        <div className="flex justify-center items-start">
          <h3
            translate="no"
            className=" text-7xl font-bold z-20  -mr-8 text-white"
          >
            OUR
          </h3>
          <h3
            translate="no"
            className="text-gold text-6xl sm:text-9xl alex-brush z-10 transform font-light"
          >
            Playlist
          </h3>
        </div>
        <p translate="no" className="max-w-[750px] text-white font-medium">
          Help us create the perfect soundtrack for our special day! Share your
          favorite songs for background ambiance or dance floor fun, and
          we&apos;ll add them to our wedding playlist.
        </p>

        {/* Music Input */}
        <div
          ref={containerRef}
          className="max-w-[500px] w-full h-14 bg-slate-50 rounded-md flex justify-center items-center mt-8 py-2 px-3"
        >
          <Image
            src={images.spotify}
            alt="spotify"
            width={95}
            height={95}
            quality={100}
            className=" w-[35px] h-auto"
          />
          <Input
            translate="no"
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter the name of the song"
            className="bg-slate-50 font-serif h-10 mb-4 focus:outline-none focus:ring-0 text-lg border-none mt-4 "
          />
          <BsFillSearchHeartFill
            size={30}
            className="transform scale-x-[-1] text-neutral-500 "
          />
        </div>

        {/* Display search results */}
        {isFocused && results.length > 0 && (
          <div
            ref={resultsRef}
            className="max-w-[500px] max-h-[400px] w-full bg-slate-50 rounded-lg mt-1 py-3 px-4 overflow-auto"
          >
            <ul className="w-full flex flex-col justify-center items-start gap-2">
              {results.map((track) => (
                <li
                  key={track.id}
                  className="w-full flex justify-between items-center border-b last:border-none gap-2"
                >
                  <div>
                    <p className="text-left">
                      {track.artists[0].name} - {track.name}
                    </p>
                  </div>
                  <div className="relative mb-3 flex justify-start items-center">
                    {/* Conditionally render the play button only if preview_url exists */}
                    {track.preview_url && (
                      <button
                        className="mr-2 flex justify-center items-center"
                        onClick={() =>
                          handlePlayPreview(track.preview_url, track.id)
                        }
                      >
                        {currentlyPlaying === track.id ? (
                          <FaStop
                            size={15}
                            className="text-neutral-500 mr-[6px]"
                          />
                        ) : (
                          <IoPlay size={25} className="text-neutral-500" />
                        )}
                      </button>
                    )}

                    {/* Add Button */}
                    <button
                      onClick={() => addTrackToPlaylist(track.uri)}
                      className="transform active:scale-[0.95]"
                    >
                      <IoIosAddCircle size={35} className="text-green-500" />
                    </button>

                    {/* Progress Bar (positioned below the buttons) */}
                    {currentlyPlaying === track.id && (
                      <div
                        className="absolute bottom-[-5px] left-0 h-[2px] bg-neutral-500 transition-all duration-300 ease-linear"
                        style={{ width: `${progress}%` }}
                      ></div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Background */}
      <div className="absolute top-0 w-full h-[300px] bg-gradient-to-b from-blue via-[#233d7475] z-10"></div>
      <div className="w-full h-full overlay z-[1] backdrop-blur-[2px]"></div>
      {!videoError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center opacity-20 mix-blend-screen z-0"
          onError={() => setVideoError(true)}
          aria-hidden="true"
        >
          <source src="/videos/bg_particles.webm" type="video/webm" />
        </video>
      )}
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnd}
      />
    </section>
  );
};

export default MusicSection;
