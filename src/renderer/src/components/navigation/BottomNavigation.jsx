import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import useProjectStore from "../../store/projectStore";


export default function BottomNavigation() {

  const videos = useProjectStore(state => state.videos);

  const currentVideoIndex =
    useProjectStore(state => state.currentVideoIndex);

  const setCurrentVideoIndex =
    useProjectStore(state => state.setCurrentVideoIndex);

  function previousVideo() {

    if (currentVideoIndex === 0)
      return;

    setCurrentVideoIndex(currentVideoIndex - 1);

  }

  function nextVideo() {

    if (currentVideoIndex === videos.length - 1)
      return;

    setCurrentVideoIndex(currentVideoIndex + 1);

  }

  useEffect(() => {

  function handleKeyDown(event) {

    // Ignore shortcuts while typing/selecting
    const tag = document.activeElement?.tagName;

    if (
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      tag === "SELECT"
    ) {
      return;
    }

    if (event.key === "a" || event.key === "A") {

      previousVideo();

    }

    if (event.key === "d" || event.key === "D") {

      nextVideo();

    }

  }

  window.addEventListener(
    "keydown",
    handleKeyDown
  );

  return () => {

    window.removeEventListener(
      "keydown",
      handleKeyDown
    );

  };

}, [currentVideoIndex, videos]);

  return (

    <Box
      sx={{
        height: 70,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 3,
        bgcolor: "#202020"
      }}
    >

      <Button
        variant="contained"
        onClick={previousVideo}
        disabled={currentVideoIndex === 0}
      >
        Previous
      </Button>
      
      <Box
        sx={{
          color: "white",
          fontWeight: 600,
          fontSize: 18
        }}
      >
        {currentVideoIndex + 1} / {videos.length}
      </Box>

      <Button
        variant="contained"
        onClick={nextVideo}
        disabled={currentVideoIndex === videos.length - 1}
      >
        Next
      </Button>

    </Box>

  );

}