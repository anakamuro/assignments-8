import { screen, fireEvent} from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import firebase from "../__mocks__/firebase"
import BillUI from "../views/NewBillUI.js"
import { localStorageMock } from "../__mocks__/localStorage.js"
import { bills } from "../fixtures/bills"

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
  describe("When I post a new bill from the new bill form", () => {
    test("fetches bills from mock API GET", async () => {
       const postSpy = jest.spyOn(firebase, "post")
       const bills = await firebase.post()
       expect(postSpy).toHaveBeenCalledTimes(1)
       expect(response).toEqual({ 200: "<data_at_path>"})
    })
    test("posts bills from mock API and fails with 404 message error", async () => {
      firebase.post.mockImplementationOnce(() =>
        Promise.reject(new Error("Erreur 404"))
      )
      const html = BillsUI({ error: "Erreur 404" })
      document.body.innerHTML = html
      const message = screen.getByText(/Erreur 404/)
      expect(message).toBeTruthy()
    })
    test("posts bill from mock API and fails with 500 message error", async () => {
      firebase.post.mockImplementationOnce(() =>
        Promise.reject(new Error("Erreur 500"))
      )
      const html = BillsUI({ error: "Erreur 500" })
      document.body.innerHTML = html
      const message = screen.getByText(/Erreur 500/)
      expect(message).toBeTruthy()
    })
  })
})
