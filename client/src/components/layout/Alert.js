import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; // connect component to redux

//access to props.alerts, destructured
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

// get the alert state into this component
const mapStateToProps = state => ({
  alerts: state.alert //rootReducer
});

export default connect(mapStateToProps)(Alert);
