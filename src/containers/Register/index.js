import { connect } from 'react-redux';
import Register from 'src/components/Register';
import { register } from 'src/actions';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    register: (payload) => {
        dispatch(register(payload));
      },
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
