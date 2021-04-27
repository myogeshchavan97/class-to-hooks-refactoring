import React from 'react';
import Header from './components/Header';
import axios from 'axios';
import UsersList from './components/UsersList';

export default class App extends React.Component {
  state = {
    users: [],
    page: 0,
    isLoading: false,
    errorMsg: ''
  };

  componentDidMount() {
    this.loadUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.loadUsers();
    }
  }

  loadUsers = async () => {
    try {
      const { page } = this.state;

      this.setState({ isLoading: true });
      const response = await axios.get(
        `https://randomuser.me/api/?page=${page}&results=10`
      );

      this.setState((prevState) => ({
        users: [...prevState.users, ...response.data.results],
        errorMsg: ''
      }));
    } catch (error) {
      this.setState({
        errorMsg: 'Error while loading data. Try again later.'
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1
    }));
  };

  render() {
    const { users, isLoading, errorMsg } = this.state;

    return (
      <div className="main-section">
        <Header />
        <UsersList users={users} />
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <div className="load-more">
          <button onClick={this.loadMore} className="btn-grad">
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      </div>
    );
  }
}
