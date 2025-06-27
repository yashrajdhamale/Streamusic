import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "12px",
  marginBottom: theme.spacing(1.5),
  boxShadow: theme.shadows[1],
  transition: "all 0.3s ease-in-out",
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "1rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark"
    ? "rgba(255, 255, 255, .05)"
    : "rgba(0, 0, 0, .03)",
  borderRadius: "12px",
  flexDirection: "row-reverse",
  [`& .${accordionSummaryClasses.expandIconWrapper}`]: {
    transition: "transform 0.3s",
  },
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: "rotate(90deg)",
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.mode === "dark"
    ? "#1a1a1a"
    : "#f9f9f9",
  borderRadius: "0 0 12px 12px",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 0, my: 4, px: 2 }}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography variant="subtitle1" fontWeight={600}>
            What is "Personalized Music"?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Log in with Spotify to get song suggestions tailored to your taste.
            No more random songs — just your vibe.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography variant="subtitle1" fontWeight={600}>
            What is the "Collaborative Queue"?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Everyone can add their favorite tracks to a shared queue — perfect
            for parties, gyms, or trips.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography variant="subtitle1" fontWeight={600}>
            What does "Admin Control" mean?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Admins can manage the queue: approve, skip, or reorder songs to keep
            the mood just right.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography variant="subtitle1" fontWeight={600}>
            Where can I use Streamusic?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            House parties, workouts, cafés, road trips — Streamusic adapts to
            any group music experience.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
