import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";

const Task = (props) => {
  const priorityColor = () => {
    switch (props.priority) {
      case "Low":
        return "green";
      case "Medium":
        return "yellow";
      case "High":
        return "red";
      default:
        return "lightgrey";
    }
  };

  return (
    <Grid key={props.id} size={{ xs: 12, sm: 6, md: 4 }}>
      <Card
        sx={{
          backgroundColor: props.done ? "success.light" : "primary.light",
          borderRadius: "3px",
          padding: "20px",
          border: "1px solid",
          borderColor: props.done ? "success.main" : "primary.main",
          boxShadow: 3,
        }}
      >
        <CardHeader
          title={props.title}
          sx={{
            backgroundColor: "white",
            borderRadius: "3px",
            padding: "20px",
            textAlign: "center",
            "& .MuiCardHeader-title": {
              fontWeight: 700,
              textTransform: "uppercase",
            },
          }}
        />

        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
              mb: 2,
              padding: "20px",
            }}
          >
            <Chip
              label={props.done ? "Completed" : "In Progress"}
              color={props.done ? "success" : "warning"}
              size="small"
              variant="outlined"
              icon={props.done ? <DoneIcon /> : undefined}
              sx={{ mb: 1, fontWeight: 600 }}
            />
            <Typography component="p" variant="subtitle2" color="text.primary">
              Due: {props.deadline}
            </Typography>
          </Box>

          <Typography
            component="p"
            variant="subtitle1"
            align="center"
            sx={{ fontStyle: "italic" }}
          >
            {props.description}
          </Typography>
        </CardContent>

        <CardActions
          sx={{
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <Button
            variant="contained"
            size="small"
            color="success"
            startIcon={<DoneIcon />}
            onClick={props.markDone}
            sx={{ borderRadius: 5, textTransform: "none" }}
          >
            Done
          </Button>

          <Button
            variant="contained"
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={props.deleteTask}
            sx={{ borderRadius: 5, textTransform: "none" }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Task;
