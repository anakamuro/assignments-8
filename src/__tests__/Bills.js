import { screen } from "@testing-library/dom";
import BillsUI from "../views/BillsUI.js";
import Bills from "../containers/Bills.js";
import { bills } from "../fixtures/bills.js"
import { localStorageMock } from "../__mocks__/localStorage"
import Dashboard, { filteredBills, cards } from "../containers/Dashboard.js"
import Logout from "../containers/Logout.js"
import userEvent from "@testing-library/user-event";
import firestore from "../app/Firestore.js";

describe('When I am on Dashboard page but it is loading', () => {
  test('Then, Loading page should be rendered', () => {
    const html = BillsUI({ loading: true })
    document.body.innerHTML = html
    expect(screen.getAllByText('Loading...')).toBeTruthy()
  })
})
describe('When I am on Dashboard page but back-end send an error message', () => {
  test('Then, Error page should be rendered', () => {
    const html = BillsUI({ error: 'some error message' })
    document.body.innerHTML = html
    expect(screen.getAllByText('Error')).toBeTruthy()
  })
})

describe('Given I am connected as an employee', () => {
  describe('When I am on Bills page, there are bills, and there is one pending', () => {
    test('Then, filteredBills by pending status should return 1 bill', () => {
      const filtered_bills = filteredBills(bills, "pending")
      expect(filtered_bills.length).toBe(1)
    })
  })
  describe('When I am on Bills page, there are bills, and there is one accepted', () => {
    test('Then, filteredBills by accepted status should return 1 bill', () => {
      const filtered_bills = filteredBills(bills, "accepted")
      expect(filtered_bills.length).toBe(1)
    })
  })
  describe('When I am on Bills page, there are bills, and there is two refused', () => {
    test('Then, filteredBills by accepted status should return 2 bills', () => {
      const filtered_bills = filteredBills(bills, "refused")
      expect(filtered_bills.length).toBe(2)
    })
  })
})

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    test("Then bill icon in vertical layout should be highlighted", () => {
      const html = BillsUI({ data: bills})
      document.body.innerHTML = html
      const iconOne = screen.getByTestId('icon-window');
      expect(iconOne.classList.contains('active-icon')).toBeTruthy;
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