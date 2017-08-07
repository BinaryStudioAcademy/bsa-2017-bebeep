import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

class MainNavigation extends Component {

  render() {
    return (
      <nav>
        <ul>
          <li>
            <IndexLink to="/">Home page</IndexLink>
          </li>
          <li>
            <Link to="users">Users page</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default MainNavigation;
