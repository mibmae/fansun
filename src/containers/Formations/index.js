import { connect } from 'react-redux';
import Formations from 'src/components/Formations';
import { addToCart } from 'src/actions/';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    addToCart: (payload) => {
        dispatch(addToCart(payload));
      },
});

export default connect(mapStateToProps, mapDispatchToProps)(Formations);
