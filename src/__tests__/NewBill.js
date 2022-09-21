import { screen, render } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import firebase from "../__mocks__/firebase"
import BillsUI from "../views/BillsUI.js"
import { localStorageMock } from "../__mocks__/localStorage.js"
import { bills } from "../fixtures/bills"
import userEvent from '@testing-library/user-event'

jest.mock('../app/Firestore');

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then ...", () => {
      let html;
      let onNavigate;
      let newBill;
      beforeEach(() => {
      const html = NewBillUI()
      document.body.innerHTML = html
      //to-do write assertion
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      const newBill = new NewBill({
        document, onNavigate, firestore: null, localStorage: window.localStorage
      })      
    })
      
    })
  })
})

// test d'intégration GET
describe("Given I am a user connected as Employee", () => {
  describe("When I fill a new bill from the new bill form", () => {
    test("fetches bills from mock API GET", async () => {
       const getSpy = jest.spyOn(firebase, "get")
       const bills = await firebase.get()
       expect(getSpy).toHaveBeenCalledTimes(1)
       expect(bills.data.length).toBe(4);
    })
  
    test("fetches new bill from API and fails with 404 message error", async () => {
      firebase.get.mockImplementationOnce(() =>
        Promise.reject(new Error("Error 404"))
      );
      console.log("screen", screen)
      const html = BillsUI({ error: "Error 404" })
      document.body.innerHTML = html
      const message = screen.getByText(/Error 404/)
      
      expect(message).toBeTruthy()
    })
    test("fetches message from an API and fails with 500 message error", async () => {
      firebase.get.mockImplementationOnce(() =>
        Promise.reject(new Error('Error 500'))
      );
      const html = BillsUI({ error: 'Error 500' })
      document.body.innerHTML = html
      const message = screen.getByText(/Error 500/)
      expect(message).toBeTruthy()
    })
    
  })
  
})
