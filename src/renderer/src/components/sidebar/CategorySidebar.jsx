import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider
} from "@mui/material";

import useProjectStore from "../../store/projectStore";
import { saveLabels } from "../../services/fileService";
import { useRef } from "react";

export default function CategorySidebar() {
  const schema = useProjectStore((state) => state.schema);

  const currentVideo = useProjectStore((state) => state.currentVideo);

  const updateCurrentVideoLabel =
    useProjectStore((state) => state.updateCurrentVideoLabel);

  const saveTimeout = useRef(null);

  if (!currentVideo) {
    return (
      <Box sx={{ width: 360, p: 2 }}>
        No video loaded
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

  async function saveCurrentLabels() {
    const state = useProjectStore.getState();

    const labels = {};

    state.videos.forEach((video) => {
      labels[video.name] = video.labels;
    });

    await saveLabels(state.folder, labels);
  }

  function scheduleSave() {

    if (saveTimeout.current) {

      clearTimeout(saveTimeout.current);

    }

    saveTimeout.current = setTimeout(() => {

      saveCurrentLabels();

    }, 500);

  }

  return (
    <Box
      sx={{
        width: 450,
        p: 2,
        overflowY: "auto"
      }}
    >
      {schema.map((category, index) => (
        <Box key={category.id}>

          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontWeight: 600
            }}
          >
            {category.name}
          </Typography>

          {category.type === "simple" && (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel sx={inputLabelSx}>
                Select
              </InputLabel>

              <Select
                sx={selectSx}
                label="Select"
                value={currentVideo.labels[category.id] || ""}
                onChange={async (e) => {
                  updateCurrentVideoLabel(
                    category.id,
                    e.target.value
                  );

                  scheduleSave();
                }}
              >
                {category.options?.map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {category.type === "group" && (
            <>
              <FormControl
                fullWidth
                sx={{ mt: 2 }}
              >
                <InputLabel sx={inputLabelSx}>
                  Group
                </InputLabel>

                <Select
                  sx={selectSx}
                  label="Group"
                  value={
                    currentVideo.labels[
                    `${category.id}Group`
                    ] || ""
                  }
                  onChange={async (e) => {

                    updateCurrentVideoLabel(
                      `${category.id}Group`,
                      e.target.value
                    );

                    updateCurrentVideoLabel(
                      category.id,
                      ""
                    );

                    scheduleSave();

                  }}
                >
                  {category.groups?.map((group) => (
                    <MenuItem
                      key={group.name}
                      value={group.name}
                    >
                      {group.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                fullWidth
                sx={{ mt: 2 }}
              >
                <InputLabel sx={inputLabelSx}>
                  Option
                </InputLabel>

                <Select
                  sx={selectSx}
                  label="Option"
                  value={
                    currentVideo.labels[
                    category.id
                    ] || ""
                  }
                  onChange={async (e) => {

                    updateCurrentVideoLabel(
                      category.id,
                      e.target.value
                    );

                    scheduleSave();

                  }}
                >
                  {category.groups
                    ?.find(
                      (group) =>
                        group.name ===
                        currentVideo.labels[
                        `${category.id}Group`
                        ]
                    )
                    ?.options?.map((option) => (
                      <MenuItem
                        key={option}
                        value={option}
                      >
                        {option}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </>
          )}

          {index !== schema.length - 1 && (
            <Divider sx={{ my: 4 }} />
          )}

        </Box>
      ))}
    </Box>
  );
}