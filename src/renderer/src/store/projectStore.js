import { create } from "zustand";

const useProjectStore = create((set) => ({
  folder: "",

  videos: [],

  currentVideoIndex: 0,

  currentVideo: null,

  schema: [],

  setFolder: (folder) =>
    set({
      folder
    }),

  setVideos: (videos, savedLabels = {}) => {

    const updatedVideos = videos.map((video) => ({

      ...video,

      labels:
        savedLabels[video.name] || { }

    }));

    set({

      videos: updatedVideos,

      currentVideoIndex: 0,

      currentVideo:
        updatedVideos.length
          ? updatedVideos[0]
          : null

    });

  },

  setSchema: (schema) =>
    set({
      schema
    }),

  setCurrentVideoIndex: (index) =>
    set((state) => ({
      currentVideoIndex: index,
      currentVideo: state.videos[index] || null
    })),

  updateCurrentVideoLabel: (key, value) =>
    set((state) => {

      const videos = [...state.videos];

      videos[state.currentVideoIndex] = {

        ...videos[state.currentVideoIndex],

        labels: {

          ...videos[state.currentVideoIndex].labels,

          [key]: value

        }

      };

      return {

        videos,

        currentVideo: videos[state.currentVideoIndex]

      };

    }),
}));

export default useProjectStore;