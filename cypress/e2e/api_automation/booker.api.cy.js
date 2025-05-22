/// <reference types="Cypress" />
import { getAuthToken } from '../../utils/helpers'
import { generateBookingData } from '../../utils/testdata'

describe('Verify that Booking APIs works correctly', () => {
    let authToken

    before(() => {
        getAuthToken().then((token) => {
            authToken = token
        })
    })

    it('[GET] - Retrieve the reservation list', () => {
        cy.request('/booking').then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.length).to.be.greaterThan(0)
            expect(response.body[0]).to.have.property('bookingid')
        })
    })

    it('[POST] - Create a new reservation', () => {
        const bookingData = generateBookingData()

        cy.request({
            method: 'POST',
            url: '/booking',
            body: {
                firstname: bookingData.firstName,
                lastname: bookingData.lastName,
                totalprice: bookingData.totalPrice,
                depositpaid: bookingData.depositPaid,
                bookingdates: {
                    checkin: bookingData.bookingDates.checkin,
                    checkout: bookingData.bookingDates.checkout
                },
                additionalneeds: bookingData.additionalNeeds
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.booking).to.include({
                firstname: bookingData.firstName,
                lastname: bookingData.lastName,
                totalprice: bookingData.totalPrice,
                depositpaid: bookingData.depositPaid
            })
        })
    })

    it('[PATCH] - Update partial reservation details', () => {
        const bookingData = generateBookingData()

        cy.request({
            method: 'PATCH',
            url: '/booking/2',
            body: {
                firstname: bookingData.firstName,
                lastname: bookingData.lastName,
                additionalneeds: bookingData.additionalNeeds
            },
            headers: {
                'Content-Type': 'application/json',
                Cookie: `token=${authToken}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.include({
                firstname: bookingData.firstName,
                lastname: bookingData.lastName,
                additionalneeds: bookingData.additionalNeeds
            })
        })
    })

    it('[DELETE] - Delete a reservation', () => {
        cy.request({
            method: 'DELETE',
            url: '/booking/1',
            headers: {
                Cookie: `token=${authToken}`
            },
            failOnStatusCode: false // Por si ya fue eliminado
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.statusText).to.eq('Created')
        })
    })
})