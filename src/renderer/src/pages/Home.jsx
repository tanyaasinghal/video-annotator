import Header from "../components/layout/Header";
import VideoPlayer from "../components/player/VideoPlayer";
import CategorySidebar from "../components/sidebar/CategorySidebar";
import BottomNavigation from "../components/navigation/BottomNavigation";

import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Header />

      <Box
        sx={{
          flex: 1,
          display: "flex"
        }}
      >
        <VideoPlayer />

        <CategorySidebar />
      </Box>

      <BottomNavigation />
    </Box>
  );
}