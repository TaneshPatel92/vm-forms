import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionRouteNavigate } from "../../store/actions/actions-route";
import ROUTES from '../../configs/routes';


class ErrorPage404 extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="text-center">
                    <div className="error mx-auto mt-5" data-text="404">404</div>
                    <p className="lead text-gray-800 mb-5">Page Not Found</p>
                    <p className="text-gray-500 mb-0">It looks like you found a glitch in the matrix...</p>
                    <button className="btn btn-primary mt-5" onClick={() => {
                        this.props.ActionRouteNavigate(ROUTES.HOME)
                    }}>&larr; Back to Dashboard</button>
                </div>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ActionRouteNavigate
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(ErrorPage404)