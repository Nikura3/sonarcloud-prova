import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./view/Home";
import Upload from "./view/Upload";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
