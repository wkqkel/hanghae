import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';
import Main from '../pages/Main';
import Header from '../components/Header';
import { ThemeProvider } from 'styled-components';
import theme from './Theme';
import MoreInfoModal from '../components/MoreInfoModal';
import RoomClickModal from '../components/RoomClickModal';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <Header></Header>
          <Route path="/" exact component={Main}></Route>
        </ConnectedRouter>
      </ThemeProvider>
    </>
  );
}
// 컴포넌트에서 theme 사용법
// const Title = styled.h1`
//   color: ${props => props.theme.color.primary};
// `;
export default App;
