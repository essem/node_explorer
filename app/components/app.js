import { connect } from 'react-redux';
import * as actions from '../actions';
import React from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import { urlToLoc } from '../common/util';
import Alert from './alert';
import Bookmark from './bookmark';
import Location from './location';
import Toolbar from './toolbar';
import Upload from './upload';
import FileList from './fileList';
import ThumbnailList from './thumbnailList';
import BottomBar from './bottomBar';
import Preview from './preview';
import Spinner from 'react-spin';

class App extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    view: React.PropTypes.string,
    loading: React.PropTypes.bool,
    bookmarks: React.PropTypes.array,
  };

  componentDidMount() {
    window.addEventListener('popstate', this.handlePopState);
    this.props.dispatch(actions.initApp());
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  handlePopState = () => {
    const loc = urlToLoc(location.pathname);
    this.props.dispatch(actions.changeLoc(loc, false));
  };

  renderList() {
    switch (this.props.view) {
      case 'thumbnail': return <ThumbnailList />;
      default:
        return <FileList />;
    }
  }

  render() {
    if (this.props.bookmarks.length === 0) {
      return <div></div>;
    }

    return (
      <div className="container">
        <ButtonToolbar>
          <Bookmark />
          <Location />
          <Toolbar />
        </ButtonToolbar>
        <Upload />
        <Alert />
        {this.renderList()}
        <BottomBar />
        <Preview />
        {this.props.loading ? <div className="loading"><Spinner /></div> : ''}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  view: state.ui.view,
  loading: state.ui.loading,
  bookmarks: state.bookmarks,
});

export default connect(mapStateToProps)(App);
