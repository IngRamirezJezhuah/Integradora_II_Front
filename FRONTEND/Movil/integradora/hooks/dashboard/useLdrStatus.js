import { DashboardStyles } from '../../themes';

export const useLdrStatus = () => {
  const getLdrStatus = (ldr) => {
    if (!ldr && ldr !== 0) {
      return { 
        estado: 'Sin datos', 
        style: DashboardStyles.cprecaucion,
        description: 'No se pueden obtener datos del sensor'
      };
    }

    if (ldr <= 600) {
      return { 
        estado: 'En peligro', 
        style: DashboardStyles.cprecaucion,
        description: 'Nivel de luz muy bajo - Las muestras pueden estar en riesgo'
      };
    }
    
    if (ldr <= 1500) {
      return { 
        estado: 'Protegida', 
        style: DashboardStyles.cmuestra,
        description: 'Nivel de luz óptimo - Las muestras están protegidas'
      };
    }
    
    return { 
      estado: 'Echada a perder', 
      style: DashboardStyles.cprecaucion,
      description: 'Nivel de luz muy alto - Las muestras pueden haberse deteriorado'
    };
  };

  const getLdrColor = (ldr) => {
    const status = getLdrStatus(ldr);
    if (status.estado === 'Protegida') return '#28A745'; // Verde
    return '#DC3545'; // Rojo para peligro y echada a perder
  };

  const getLdrIcon = (ldr) => {
    const status = getLdrStatus(ldr);
    switch (status.estado) {
      case 'Protegida':
        return 'shield-check-outline';
      case 'En peligro':
        return 'alert-circle-outline';
      case 'Echada a perder':
        return 'close-circle-outline';
      default:
        return 'help-circle-outline';
    }
  };

  return {
    getLdrStatus,
    getLdrColor,
    getLdrIcon,
  };
};
