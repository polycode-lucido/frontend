import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import HeroTile from "../HeroTile";

export default function LandingPage() {
  const naviguate = useNavigate();
  const { user } = React.useContext(UserContext);

  useEffect(() => {
    if (user === null) {
      naviguate("/");
    }
  }, [user]);

  return (
    <Container maxWidth={false} disableGutters={true}>
      <HeroTile />
    </Container>
  );
}
