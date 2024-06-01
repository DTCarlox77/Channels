import PropTypes from 'prop-types'

function Mensaje({nombre, mensaje, fecha}) {
  return (
    <div>
        <h3>{ nombre }</h3>
        <p>{ mensaje }</p>
        <h6>{ fecha }</h6>
    </div>
  )
}

Mensaje.propTypes = {
    nombre: PropTypes.string.isRequired,
    mensaje: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
};

export default Mensaje