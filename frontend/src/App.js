import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="home-title text-7xl pt-5 pb-4 mt-5">Take Me</p>
        <p className="text-sm px-8 pb-7 leading-tight">
          Take me is an application through which users can view and adopt rescued pets online
          directly.
        </p>
        <a className="bg-white hover:bg-violet-100 text-violet-900 font-semibold py-2 px-8 py-3 mb-4 rounded-full cursor-pointer">
          Login to your account
        </a>
        <a className="bg-transparent hover:bg-violet-100 text-violet-900 font-semibold py-2 px-8 py-3 border border-white-600 rounded-full cursor-pointer">
          Register
        </a>
      </header>
    </div>
  );
}

export default App;
