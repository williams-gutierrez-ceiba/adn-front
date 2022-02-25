// export const environment = {
//   production: true,
//   endpoint: '/prospectos-vida'
// };

export const environment = {
  productos: {
    production: true,
    endpoint: '/prospectos-vida'
  },
  usuarios: {
    production: true,
    endpoint: 'http://localhost:8081/usuarios'
  },
  archivos: {
    production: true,
    endpoint: 'http://localhost:8082/archivos'
  },
  viviendas: {
    production: true,
    endpoint: 'http://localhost:8083/viviendas'
  },
  reservas: {
    production: true,
    endpoint: 'http://localhost:8084/reservas'
  }
};