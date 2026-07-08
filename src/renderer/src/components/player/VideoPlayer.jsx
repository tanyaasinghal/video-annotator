import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

import { useRef } from "react";
import { saveLabels } from "../../services/fileService";
import useProjectStore from "../../store/projectStore";

export default function VideoPlayer() {
  const videos = useProjectStore((state) => state.videos);
  const currentVideoIndex = useProjectStore(
    (state) => state.currentVideoIndex
  );

  const currentVideo = videos[currentVideoIndex];

  const updateCurrentVideoLabel =
    useProjectStore(state => state.updateCurrentVideoLabel);

  const folder =
    useProjectStore(state => state.folder);

  const saveTimeout = useRef(null);

  async function saveCurrentLabels() {

    const state = useProjectStore.getState();

    const labels = {};

    state.videos.forEach(video => {

      labels[video.name] = video.labels;

    });

    await saveLabels(folder, labels);

  }

  function scheduleSave() {

    if (saveTimeout.current) {

      clearTimeout(saveTimeout.current);

    }

    saveTimeout.current = setTimeout(() => {

      saveCurrentLabels();

    }, 500);

  }

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

  const selectSx = {
    color: "white",

    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "#666"
    },

    "& .MuiSvgIcon-root": {
      color: "white"
    }
  };

  const inputLabelSx = {
    color: "#cccccc"
  };

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

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            mt: 2
          }}
        >

          <FormControl size="small" sx={{ minWidth: 170 }}>

            <InputLabel sx={inputLabelSx}>
              Batsman Hand
            </InputLabel>

            <Select
              sx={selectSx}
              label="Batsman Hand"
              value={currentVideo.labels.batsmanHand}
              onChange={(e) => {

                updateCurrentVideoLabel(
                  "batsmanHand",
                  e.target.value
                );

                scheduleSave();

              }}
            >

              <MenuItem value="Left">
                Left
              </MenuItem>

              <MenuItem value="Right">
                Right
              </MenuItem>

            </Select>

          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>

            <InputLabel sx={inputLabelSx}>Contact</InputLabel>

            <Select
              sx={selectSx}
              label="Contact"
              value={currentVideo.labels.contact}
              onChange={(e) => {

                updateCurrentVideoLabel(
                  "contact",
                  e.target.value
                );

                scheduleSave();

              }}
            >

              <MenuItem value="Yes">
                Yes
              </MenuItem>

              <MenuItem value="No">
                No
              </MenuItem>

            </Select>

          </FormControl>

        </Box>
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