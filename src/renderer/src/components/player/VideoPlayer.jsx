import { Box, Typography } from "@mui/material";
import useProjectStore from "../../store/projectStore";

export default function VideoPlayer() {
  const videos = useProjectStore((state) => state.videos);
  const currentVideoIndex = useProjectStore(
    (state) => state.currentVideoIndex
  );

  const currentVideo = videos[currentVideoIndex];

  if (!currentVideo) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white"
        }}
      >
        Open a folder to begin
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        bgcolor: "#1e1e1e",
        overflow: "hidden"
      }}
    >
      {/* Header */}
      <Box
        sx={{
          py: 2,
          textAlign: "center",
          borderBottom: "1px solid #444"
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: 600,
            fontSize: 18
          }}
        >
          {currentVideo.name}
        </Typography>

        <Typography
          sx={{
            color: "#bbbbbb",
            mt: 0.5,
            fontSize: 14
          }}
        >
          Video {currentVideoIndex + 1} of {videos.length}
        </Typography>
      </Box>

      {/* Video */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2
        }}
      >
        <video
          key={currentVideo.fullPath}
          src={`file:///${currentVideo.fullPath.replace(/\\/g, "/")}`}
          controls
          autoPlay
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain"
          }}
        />
      </Box>
    </Box>
  );
}