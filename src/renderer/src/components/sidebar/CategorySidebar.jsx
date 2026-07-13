import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  IconButton
} from "@mui/material";

import useProjectStore from "../../store/projectStore";
import { saveLabels } from "../../services/fileService";
import { useRef, useState, useEffect } from "react";
import ClearableSelect from "../common/ClearableSelect";

export default function CategorySidebar() {
  const schema = useProjectStore((state) => state.schema);

  const currentVideo = useProjectStore((state) => state.currentVideo);

  const currentVideoIndex =
    useProjectStore((state) => state.currentVideoIndex);

  const updateCurrentVideoLabel =
    useProjectStore((state) => state.updateCurrentVideoLabel);

  const saveTimeout = useRef(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {

    const timer = setTimeout(() => {

      setOpenDropdownId("shotElevation");

    }, 150);

    return () => clearTimeout(timer);

  }, [currentVideoIndex]);

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
      {schema
        .filter(
          category =>
            category.id !== "batsmanHand" &&
            category.id !== "contact"
        )
        .map((category, index) => (
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

              <ClearableSelect

                label="Select"

                value={
                  currentVideo.labels[category.id] || ""
                }

                options={
                  category.options || []
                }

                open={
                  openDropdownId === category.id
                }

                onOpen={() => {

                  setOpenDropdownId(category.id);

                }}

                onClose={() => {

                  setOpenDropdownId(null);

                }}

                selectSx={selectSx}

                inputLabelSx={inputLabelSx}

                onChange={(e) => {

                  updateCurrentVideoLabel(
                    category.id,
                    e.target.value
                  );
                  setOpenDropdownId(null);

                  scheduleSave();

                }}

                onClear={() => {

                  updateCurrentVideoLabel(
                    category.id,
                    ""
                  );

                  scheduleSave();

                }}

              />

            )}

            {category.type === "group" && (
              <>
                <ClearableSelect

                  label="Group"

                  placeholder="Group"

                  value={
                    currentVideo.labels[
                    `${category.id}Group`
                    ] || ""
                  }

                  options={
                    category.groups?.map(
                      group => group.name
                    ) || []
                  }

                  selectSx={selectSx}

                  inputLabelSx={inputLabelSx}

                  onChange={(e) => {

                    updateCurrentVideoLabel(
                      `${category.id}Group`,
                      e.target.value
                    );

                    updateCurrentVideoLabel(
                      category.id,
                      ""
                    );

                    setTimeout(() => {

                      setOpenDropdownId(`${category.id}-option`);

                    }, 100);

                    scheduleSave();

                  }}

                  onClear={() => {

                    updateCurrentVideoLabel(
                      `${category.id}Group`,
                      ""
                    );

                    updateCurrentVideoLabel(
                      category.id,
                      ""
                    );

                    scheduleSave();

                  }}

                />
                <ClearableSelect

                  label="Option"

                  placeholder="Option"

                  value={
                    currentVideo.labels[
                    category.id
                    ] || ""
                  }

                  options={
                    category.groups
                      ?.find(
                        group =>
                          group.name ===
                          currentVideo.labels[
                          `${category.id}Group`
                          ]
                      )
                      ?.options || []
                  }

                  disabled={
                    !currentVideo.labels[
                    `${category.id}Group`
                    ]
                  }

                  selectSx={selectSx}

                  inputLabelSx={inputLabelSx}

                  open={
                    openDropdownId === `${category.id}-option`
                  }

                  onOpen={() => {

                    setOpenDropdownId(`${category.id}-option`);

                  }}

                  onClose={() => {

                    setOpenDropdownId(null);

                  }}

                  onChange={(e) => {

                    updateCurrentVideoLabel(
                      category.id,
                      e.target.value
                    );
                    setOpenDropdownId(null);

                    scheduleSave();

                  }}

                  onClear={() => {

                    updateCurrentVideoLabel(
                      category.id,
                      ""
                    );

                    scheduleSave();

                  }}

                />
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