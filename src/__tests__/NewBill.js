import { screen, fireEvent, getByTestId } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import firebase from "../__mocks__/firebase"
import BillsUI from "../views/BillsUI.js"
import {firestore} from '../__mocks__/firestore';
import { localStorageMock } from "../__mocks__/localStorage.js"
import { bills } from "../fixtures/bills"
import userEvent from '@testing-library/user-event'
import {ROUTES} from '../constants/routes'


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
      
      beforeEach(() => {
      const html = NewBillUI()
      document.body.innerHTML = html
      //to-do write assertion
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      
          
    })
    test("submit button's handleSubmit function is working or not",  () => {
        // Mock navigate function
        const onNavigate = jest.fn((pathname) => {
          document.body.innerHTML = ROUTES({ pathname })
        })
        const newBill = new NewBill({
          document, onNavigate, firestore, localStorage: window.localStorage
        })  
        const handleSubmit = jest.fn(newBill.handleSubmit);
        const submitBtn = screen.getByTestId('form-new-bill');
        submitBtn.addEventListener('submit', handleSubmit);
        fireEvent.submit(submitBtn);
        expect(handleSubmit).toHaveBeenCalled();
    })
    
     
    test("the option needs to be selected ", () => {
      const expenseType =  screen.getByTestId("expense-type");
      expect(expenseType).not.toBeNull();
    });
    test("the option needs to be selected ", () => {
      const html = NewBillUI({ loading: true })
      document.body.innerHTML = html
      const datePicker =  screen.getByTestId("datepicker");
      const date = new Date(datePicker.value)
      expect(date.valueOf()).toEqual(expect.any(Number))
    });
    test("the option needs to be selected ", () => {``
      const AmountInput =  screen.getByTestId("amount");
      userEvent.type(AmountInput, "123")
      expect(parseInt(AmountInput.value)).toEqual(expect.any(Number));
    });
    test("file's image has to be png or jpg or jpeg", () => {
      const onNavigate = jest.fn((pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      })
      const newBill = new NewBill({
        document, onNavigate, firestore, localStorage: window.localStorage
      })  
      const handleChangeFile = jest.fn(newBill.handleChangeFile);
      const inputFile = screen.getByTestId("file");
      inputFile.addEventListener('change', handleChangeFile);
      fireEvent.change(inputFile, {
        target: {
          files: [new File(['image.png'], 'image.png', { type: 'image/png' }) || (['image.jpg'], 'image.jpg', { type: 'image/jpg' }) || (['image.jpeg'], 'image.jpeg', { type: 'image/jpeg' }) ],
        },
      });
      expect(handleChangeFile).toHaveBeenCalled();
      expect(inputFile.files[0].name).toBe('image.png' || 'image.jpg' || 'image.jpeg');
    });
    })
  })


// test d'intégration GET
describe("Given I am a user connected as Employee", () => {
  describe("When I post a new bill from the new bill form", () => {
    test("posts bills from mock API", async () => {
       const postSpy = jest.spyOn(firebase, "post")
       const response = await firebase.post();
       expect(postSpy).toHaveBeenCalledTimes(1)
       expect(response).toEqual({ 200: "<data_message>" });
    })
  
    test("posts new bill from API and fails with 404 message error", () => {
      firebase.post = jest.fn(firebase.post).mockImplementationOnce(() =>
      // 
        Promise.reject(new Error("Error 404"))
      );
      console.log("screen", screen)
      const html = BillsUI({ error: "Error 404" })
      document.body.innerHTML = html
      const message = screen.getByText(/Error 404/)
      
      expect(message).toBeTruthy()
    })
    test("posts message from an API and fails with 500 message error", async () => {
      firebase.post.mockImplementationOnce(() =>
        Promise.reject(new Error('Error 500'))
      )
      const html = BillsUI({ error: 'Error 500' })
      document.body.innerHTML = html
      const message = screen.getByText(/Error 500/)
      expect(message).toBeTruthy()
    })
    
  })
  
})
