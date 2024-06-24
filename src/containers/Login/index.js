import { connect } from 'react-redux';
import Login from 'src/components/Login';
import { login, setAdmin, setUserInfos } from 'src/actions';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    login: (payload) => {
        dispatch(login(payload));
      },
    setAdmin: (payload) => {
        dispatch(setAdmin(payload));
      },
    setUserInfos: (payload) => {
        dispatch(setUserInfos(payload));
      },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
