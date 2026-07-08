import {
  AppBar,
  Toolbar,
  Button,
  Typography
} from "@mui/material";

import { openFolder, prepareDataset } from "../../services/fileService";
import useProjectStore from "../../store/projectStore";
import { exportExcel } from "../../services/fileService";

export default function Header() {

  const setFolder = useProjectStore((state) => state.setFolder);
  const setVideos = useProjectStore((state) => state.setVideos);
  const setSchema = useProjectStore(state => state.setSchema);
  const videos =
    useProjectStore(state => state.videos);
  const schema =
    useProjectStore(state => state.schema);

  async function handleOpenFolder() {

    const result = await openFolder();

    if (!result) return;

    const dataset = await prepareDataset(result.folder);

    setFolder(result.folder);
    setVideos(result.videos, dataset.labels);
    setSchema(dataset.schema.categories);

  }

  return (

    <AppBar position="static">

      <Toolbar>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          Video Annotator
        </Typography>

        <Button
          color="inherit"
          onClick={handleOpenFolder}
        >
          Open Folder
        </Button>

        <Button
          color="inherit"
          onClick={() =>
            exportExcel(videos, schema)
          }
        >

          Export Excel

        </Button>

      </Toolbar>

    </AppBar>

  );

}