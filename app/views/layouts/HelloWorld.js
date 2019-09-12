import React from "react"
import PropTypes from "prop-types"
import Button from '@material-ui/core/Button';
class HelloWorld extends React.Component {
  render () {
    return (
      <div>
       <Button variant="contained" color="primary">
       Hello World
     </Button>
     </div>
    );
  }
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};
export default HelloWorld
