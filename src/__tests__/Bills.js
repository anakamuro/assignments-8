import { screen } from "@testing-library/dom";
import BillsUI from "../views/BillsUI.js";
import Bills from "../containers/Bills.js";
import { bills } from "../fixtures/bills.js"
import { localStorageMock } from "../__mocks__/localStorage"
import Dashboard, { filteredBills, cards } from "../containers/Dashboard.js"
import Logout from "../containers/Logout.js"
import userEvent from "@testing-library/user-event";
import firestore from "../app/Firestore.js";
import firebase from "../__mocks__/firebase"
import { ROUTES, ROUTES_PATH } from "../constants/routes";

describe('When I am on Bills page but it is loading', () => {
  test('Then, Loading page should be rendered', () => {
    const html = BillsUI({ loading: true })
    document.body.innerHTML = html
    expect(screen.getAllByText('Loading...')).toBeTruthy()
  })
})
describe('When I am on page but back-end send an error message', () => {
  test('Then, Error page should be rendered', () => {
    const html = BillsUI({ error: 'some error message' })
    document.body.innerHTML = html
    expect(screen.getAllByText('Error')).toBeTruthy()
  })
})

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    let onNavigate;
    beforeEach(() => {
      onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem("user", JSON.stringify({ type: "Employee" }));
    });
    test("Then bill icon in vertical layout should be highlighted", () => {
      const html = BillsUI({ data: bills})
      document.body.innerHTML = html
      const iconOne = screen.getByTestId("icon-window");
      expect(iconOne.classList.contains("active-icon")).toBeTruthy;
    })
    test("Then bills should be ordered from earliest to latest", () => {
      const html = BillsUI({ data: bills })
      document.body.innerHTML = html
      const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
      const antiChrono = (a, b) => ((a < b) ? 1 : -1)
      const datesSorted = [...dates].sort(antiChrono)
      expect(dates).toEqual(datesSorted)
    })
  })
})

describe("When I click on the New Bill button", () => {
  test("Then the New Bill form should be rendered", () => {
    document.body.innerHTML = BillsUI({ data: bills });
    let onNavigate;
     onNavigate = jest.fn();

    new Bills({
      document,
      onNavigate,
      firestore,
      localStorage,
    });

    const newBillButton = screen.getByTestId("btn-new-bill");
    userEvent.click(newBillButton);
    expect(onNavigate).toHaveBeenCalledWith(ROUTES_PATH["NewBill"]);

    const data = [];
    const loading = false;
    const error = null;
    const pathname = ROUTES_PATH["NewBill"];
    const newBillHtml = ROUTES({ pathname, data, loading, error });
    document.body.innerHTML = newBillHtml;
    expect(screen.getAllByText("Send a fee")).toBeTruthy();
  });
});
/*
describe("When I click on icon Eye button", () => {
  test("Then the modal which has a form will show", () => {
    handleClickIconEye() = jest.fn()
    const iconEye = screen.getAllByTestId("icon-eye");
    userEvent.click(iconEye)
    expect('handleClickIconEye').toHaveBeenCalled;
  })
})
*/
describe('Given I am connected', () => {
  describe('When I click on disconnect button', () => {
    test(('Then, I should be sent to login page'), () => {
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      document.body.innerHTML = BillsUI({ bills })
      const logout = new Logout({ document, onNavigate, localStorage })
      const handleClick = jest.fn(logout.handleClick)

      const disco = screen.getByTestId('layout-disconnect')
      disco.addEventListener('click', handleClick)
      userEvent.click(disco)
      expect(handleClick).toHaveBeenCalled()
    })
  })
})

describe('When I click an eye icon button in a bill', () => {
  test('the image in a modal will appear', () => {
    $.fn.modal = jest.fn();
    document.body.innerHTML = BillsUI({ data: bills });
    const bill = new Bills({
      document,
      onNavigate,
      firestore: null,
      localStorage: window.localStorage,
    });
    const onNavigate = (pathname) => {
      document.body.innerHTML = ROUTES({ pathname });
    };
    const eye = screen.getAllByTestId("icon-eye")[0];
    const modal = document.querySelector('.modal');
    
    userEvent.click(eye);
    expect($.fn.modal).toHaveBeenCalled()
    expect(modal).toBeTruthy();
  });
});


// test d'intégration GET
describe("Given I am a user connected as Employee", () => {
  describe("When I navigate to Bills Overview", () => {
    test("fetches bills from mock API GET", async () => {
       const getSpy = jest.spyOn(firebase, "get")
       const bills = await firebase.get()
       expect(getSpy).toHaveBeenCalledTimes(1)
       expect(bills.data.length).toBe(4)
    })
    test("fetches bills from an API and fails with 404 message error", () => {
      firebase.get.mockImplementationOnce(() =>
        Promise.reject(new Error("Error 404"))
      )
      const html = BillsUI({ error: "Error 404" })
      document.body.innerHTML = html
      const message = screen.getByText(/Error 404/)
      expect(message).toBeTruthy()
    })
    test("fetches messages from an API and fails with 500 message error",  () => {
      firebase.get.mockImplementationOnce(() =>
        Promise.reject(new Error("Error 500"))
      )
      const html = BillsUI({ error: "Error 500" })
      document.body.innerHTML = html
      const message = screen.getByText(/Error 500/)
      expect(message).toBeTruthy()
    })
  })
})