import AppStyle from './App.module.scss';
import NoticeBoard from './components/notice_board';
import QuotationBoard from './components/quotation_board'
import Sidebar from './components/side_navbar'
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className={AppStyle.appContainer}>
        <Sidebar />
        <Route exact path='/boardApp/' component={NoticeBoard} />
        <Route exact path='/boardApp/QuotationBoard' component={QuotationBoard} />
    </div>
    </Router>
  );
}

export default App;
