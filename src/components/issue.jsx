import { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  Collapse,
  Box,
  IconButton,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import LabelIcon from "@mui/icons-material/Label";


const IssueCard = ({ title, number, status, bodyContent }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const statusColor = status === "open" ? "green": "red";

  return (
    <Card
      elevation={1}
      sx={{
        mb: 2,
        padding: "8px",
        border: "1px solid #e1e4e8",
        borderRadius: "6px",
        width: "100%",
        ":hover": {
          boxShadow: 2,
        },
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h6" component="div" sx={{ fontSize: "16px", fontWeight: 600 }}>
            {title}
          </Typography>
          <Box display="flex" alignItems="center" gap={1} mt={0.5}>
            <Typography variant="caption" color="text.secondary">
              #{number}
            </Typography>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                px: 1,
                py: 0.5,
                backgroundColor: `${statusColor}.100`,
                color: statusColor,
                borderRadius: "12px",
                fontSize: "12px",
              }}
            >
              <LabelIcon sx={{ fontSize: "14px", mr: 0.5 }} />
              {status === "open" ? "Open" : "Closed"}
            </Box>
          </Box>
        </Box>

        <IconButton onClick={handleExpandClick} size="small">
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ padding: "8px 16px" }}>
          <Typography variant="body2" color="text.secondary">
            {bodyContent}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

IssueCard.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  status: PropTypes.oneOf(["open", "closed"]).isRequired,
  bodyContent: PropTypes.string,
};

export default IssueCard;
