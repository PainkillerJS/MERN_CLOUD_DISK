import { useAppSelector } from "./store/hooks/reduxHooks";

function App() {
  const counterValue = useAppSelector((store) => store.counter.value);

  return <div className="App">{counterValue}</div>;
}

export default App;
