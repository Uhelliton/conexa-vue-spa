import RestServices from '@/app/supports/services/rest-services'
import HttpServices from '@/app/supports/services/http-services'

class AppointmentService extends RestServices {
  endpoint = '/consulta'

  /**
   * @override
   * @param params
   * @returns {Promise}
   */
  all (params = {}) {
    return HttpServices.get('consultas', params)
  }
}

export default new AppointmentService()
