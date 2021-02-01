import './App.css';
import 'antd/dist/antd.css';

import SearchBar from './components/search-bar/search-bar.component';
import MainComponent from './components/main-component/main-component';
import Store from './context-store/store'
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;



function App() {
  return (
    <Store>
      <Layout>
      <Header className="header-container">
        <SearchBar/>
      </Header>
      <Layout>
        <Content>
          <MainComponent/>
        </Content>
      </Layout>
      <Footer>Developed by Luis Fernando Ramirez</Footer>
    </Layout>
    </Store>
  );
}

export default App;
