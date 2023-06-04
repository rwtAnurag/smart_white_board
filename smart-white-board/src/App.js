import './App.css';
import WhiteBoard from "./components/whiteBoard/index.js";
function App() {
  return (
    <div className="App">
      <WhiteBoard
              downloadFunctionCall={()=>{}}
              setDownloadFunctionCall={()=>{}}
              setLecturePdfFilePath={()=>{}}
              lecturePdfFilePath={"lecture.pdf"}
              WhiteBoardEnable={true}
              clearWhiteBoardData={()=>{}}
              setClearWhiteBoardData={()=>{}}
              saveWhiteBoardData={[]}
              setSaveWhiteBoardData={()=>{}}
            />
    </div>
  );
}

export default App;
