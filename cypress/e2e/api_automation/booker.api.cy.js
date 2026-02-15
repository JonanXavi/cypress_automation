/// <reference types="Cypress" />
import * as allure from 'allure-js-commons';
import { getAuthToken } from '../../utils/auth.api';
import { generateBookingData } from '../../utils/testdata';

describe('Booking API | Reservation management', () => {
    let authToken;

    beforeEach(() => {
        allure.owner('Jonathan Fernández');
        allure.tags('Booking API', 'API');
    });

    before(() => {
        getAuthToken().then((token) => {
            authToken = token;
        });
    });

    it('[GET] Returns the list of existing reservations', () => {
        cy.api('/booking').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.length).to.be.greaterThan(0);
            expect(response.body[0]).to.have.property('bookingid');
        });
    });

    it('[POST] Creates a new reservation successfully', () => {
        const bookingData = generateBookingData();

        cy.api({
            method: 'POST',
            url: '/booking',
            body: {
                firstname: bookingData.firstName,
                lastname: bookingData.lastName,
                totalprice: bookingData.totalPrice,
                depositpaid: bookingData.depositPaid,
                bookingdates: {
                    checkin: bookingData.bookingDates.checkin,
                    checkout: bookingData.bookingDates.checkout,
                },
                additionalneeds: bookingData.additionalNeeds,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.booking).to.include({
                firstname: bookingData.firstName,
                lastname: bookingData.lastName,
                totalprice: bookingData.totalPrice,
                depositpaid: bookingData.depositPaid,
            });
        });
    });

    it('[PATCH] Updates specific fields of an existing reservation', () => {
        const bookingData = generateBookingData();

        cy.api({
            method: 'PATCH',
            url: '/booking/2',
            body: {
                firstname: bookingData.firstName,
                lastname: bookingData.lastName,
                additionalneeds: bookingData.additionalNeeds,
            },
            headers: {
                'Content-Type': 'application/json',
                Cookie: `token=${authToken}`,
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.include({
                firstname: bookingData.firstName,
                lastname: bookingData.lastName,
                additionalneeds: bookingData.additionalNeeds,
            });
        });
    });

    it('[DELETE] Deletes an existing reservation', () => {
        cy.api({
            method: 'DELETE',
            url: '/booking/1',
            headers: {
                Cookie: `token=${authToken}`,
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.statusText).to.eq('Created');
        });
    });
});
