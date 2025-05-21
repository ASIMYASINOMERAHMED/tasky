import "./App.css";
import TodoList from "./components/TodoList";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AlertProvider } from "./contexts/AlertContext";
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#83cbff",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
 
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AlertProvider>
      <div
        className="App"
        style={{
          backgroundImage: "linear-gradient(to right , #ffe9ed , #eaffe5)",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
          <TodoList style={{ height: "90%" }} />
      </div>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
