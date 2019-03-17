import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';
import Nav from './Sidenav/sidenav';

class Header extends Component {

    state = {
        showNav: false
    }

    toggleNav = () => {
        this.setState({
            showNav: !this.state.showNav
        })
    }

    render() {
        return (
            <header>
                <div className="open_nav">
                    <FontAwesome
                        name="bars"
                        style={{
                            color: '#ffffff',
                            padding: '10px',
                            cursor: 'pointer'
                        }}
                        onClick={this.toggleNav}
                    />

                </div>
                <Nav
                    showNav={this.state.showNav}
                    onHideNav={() => this.toggleNav()}
                />
                <Link to="/" className="logo">
                    The Book Shelf
                </Link>
            </header>
        )
    }
}

export default Header;