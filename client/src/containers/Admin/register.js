import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {getUsers, registerUser} from '../../actions';

class Register extends PureComponent {

    state = {
        name: '',
        lastname: '',
        email: '',
        password: '',
        error: ''
    }

    handleInputEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    handleInputPassword = (event) => {
        this.setState({
            password: event.target.value
        });
    }
    handleInputName = (event) => {
        this.setState({
            name: event.target.value
        });
    }
    handleInputLastname = (event) => {
        this.setState({
            lastname: event.target.value
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.register === false) {
            this.setState({
                error: 'Error, try again'
            });
        } else {
            this.setState({
                name: '',
                lastname: '',
                password: '',
                email: ''
            })
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({error: ''});

        this.props.dispatch(registerUser({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            lastname: this.state.lastname
        }, this.props.user.users))


    }

    showUsers = (user) => (
        this.props.user.users ?
            this.props.user.users.map(item =>
                (
                    <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.lastname}</td>
                        <td>{item.email}</td>
                    </tr>
                ))
            : null
    )

    componentWillMount() {
        this.props.dispatch(getUsers());
    }

    render() {
        let user = this.props.user;
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>

                    <h2>Add User</h2>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={this.state.name}
                            onChange={this.handleInputName}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter lastname"
                            value={this.state.lastname}
                            onChange={this.handleInputLastname}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                        />
                    </div>

                    <button type="submit">Add User</button>

                    <div className="error">
                        {this.state.error}
                    </div>

                </form>


                <div className="current_users">
                    <h4>Current users:</h4>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Lastname</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.showUsers(user)}
                        </tbody>
                    </table>

                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Register);