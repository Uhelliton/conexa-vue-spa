import mockAxios from 'axios'
import appointmentService from '@/app/domains/appointment/services/appointment-service'
import { appointment } from '../../__mocks__/appointment-mock'

describe('appointment-services.js', () => {
  it('fetches data from appointments', async () => {
    // setup
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve(appointment)
    )
    const service = await appointmentService.all()

    expect(service).toEqual(appointment)
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    // garantir que uma função simulada foi chamada com argumentos específico
    // expect(mockAxios.get).toHaveBeenCalledWith('https://api.github.com/users')
  })

  it('create appointment', async () => {
    // setup
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve(appointment)
    )
    const service = await appointmentService.create(appointment)

    expect(service).toEqual(appointment)
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
  })

  it('show appointment', async () => {
    // setup
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve(appointment)
    )
    const service = await appointmentService.show(16)

    expect(service).toEqual(appointment)
    expect(mockAxios.get).toHaveBeenCalledTimes(2)
  })
})
