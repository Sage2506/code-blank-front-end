import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import configureStore from './store';
import Layout from './components/layout';
import ProspectsIndex from './components/prospects';
const store = configureStore();


function App() {
  return (
    <Provider store={store} >
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" Component={ProspectsIndex} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
