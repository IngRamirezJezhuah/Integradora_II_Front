import DetallesPedidos from './DetallesPedidos'

const ReciboPedidos = ({ onClose}) => {
    return (
        <div className='modal-overlay'>
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>x</button>
                <h1>Recibos Pedidos </h1>   
                <div>
                    <div className='margen'>
                    <div className='scale-up-ver-center'>
                        
                    </div>
                    <div className='scale-up-ver-center'>
                        <DetallesPedidos/>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReciboPedidos