import PropTypes from "prop-types";

const contentShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image_src: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  date: PropTypes.string,
  type: PropTypes.string.isRequired,
});

export default contentShape;
