import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Pagination, Box, CircularProgress, Typography, Alert } from "@mui/material";
import { getIssues, getRepo } from "../api/github";
import IssueCard from "../components/issue";

const Issues = ({ itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalIssues, setTotalIssues] = useState(0);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState({ repo: false, issues: false });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepoData = async () => {
      setLoading((prev) => ({ ...prev, repo: true }));
      try {
        const { data } = await getRepo();
        setTotalIssues(data.open_issues_count);
      } catch (err) {
        setError(err);
      } finally {
        setLoading((prev) => ({ ...prev, repo: false }));
      }
    };
    fetchRepoData();
  }, []);

  useEffect(() => {
    const fetchIssues = async () => {
      setLoading((prev) => ({ ...prev, issues: true }));
      try {
        const { data } = await getIssues(currentPage);
        setIssues(
          data.map((issue) => ({
            title: issue.title,
            number: issue.number,
            status: issue.state,
            bodyContent: issue.body,
          }))
        );
      } catch (err) {
        setError(err);
      } finally {
        setLoading((prev) => ({ ...prev, issues: false }));
      }
    };
    fetchIssues();
  }, [currentPage]);

  const handlePageChange = (_, page) => {
    setCurrentPage(page);
  };

  if (loading.repo || loading.issues) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={2} display="flex" justifyContent="center">
        <Alert severity="error">Error: {error.message}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{display: "flex", flexDirection: "column", padding: "0 20px"}}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        GitHub Issues
      </Typography>
      <Box sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
        {issues.map((issue) => (
          <IssueCard {...issue} key={issue.number} />
        ))}
      </Box>
      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(totalIssues / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

Issues.propTypes = {
  itemsPerPage: PropTypes.number,
};

export default Issues;
