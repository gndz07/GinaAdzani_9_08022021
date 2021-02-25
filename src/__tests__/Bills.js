<<<<<<< HEAD
import { fireEvent, screen } from "@testing-library/dom"
import jestdom from '@testing-library/jest-dom'
=======
import { screen } from "@testing-library/dom"
>>>>>>> main
import userEvent from '@testing-library/user-event'
import Bills  from "../containers/Bills.js"
import BillsUI from "../views/BillsUI.js"
import { bills } from "../fixtures/bills.js"
<<<<<<< HEAD
import VerticalLayout from "./VerticalLayout.js"
import { localStorageMock } from "../__mocks__/localStorage.js"
import firebase from "../__mocks__/firebase"
import { ROUTES, ROUTES_PATH } from "../constants/routes"
import Router from "../app/Router.js"
=======
import VerticalLayout from './VerticalLayout.js'
import { localStorageMock } from "../__mocks__/localStorage.js"
import firebase from "../__mocks__/firebase"
import { ROUTES } from "../constants/routes"
>>>>>>> main


describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
<<<<<<< HEAD
    test("Then bill icon in vertical layout should be highlighted", () => {  
      //define window.location
      let windowCopy = {...window}
      let windowSpy = jest.spyOn(global, "window", "get")
      windowSpy.mockImplementation(() => ({
        ...windowCopy,
        location: {
          ...windowCopy.location,
          pathname: ROUTES_PATH['Bills'],
          //hash: ROUTES_PATH['Bills']
        },
      }))
      //fill the document body
      Object.defineProperty(window, 'localStorage', {value: localStorageMock})
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      let rootDiv = document.createElement('div')
      rootDiv.setAttribute('id', 'root')
      document.body.appendChild(rootDiv)
      //call Router function
      //let mockRouter = jest.fn(Router)
      Router()
      //test the bill icon
      let divIcon1 = screen.getByTestId('icon-window')
      //expect(divIcon1).toBeTruthy()
      expect(divIcon1.classList.contains('active-icon')).toBeTruthy()
      //expect(divIcon1).toHaveClass('active-icon') //?????????????  
=======
    test("Then bill icon in vertical layout should be highlighted", () => {
      const html = BillsUI({ data: []})
      document.body.innerHTML = html
      //to-do write expect expression
      const billIcon = screen.getByTestId("icon-window")
      expect(billIcon.classList.contains("active-icon")).toBeTruthy()
>>>>>>> main
    })
    test("Then bills should be ordered from earliest to latest", () => {
      const billsToDisplay = [...bills]
      billsToDisplay.forEach(bill => {
        bill.dateFormatted = bill.date;
      })
      const html = BillsUI({ data: billsToDisplay })
      document.body.innerHTML = html
      const dates = screen.getAllByText(/^(19|20)\d\d[- \.](0[1-9]|1[012])[- \.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
<<<<<<< HEAD
      const antiChrono = (a, b) => ((a > b) ? 1 : -1)
=======
      const antiChrono = (a, b) => ((a < b) ? 1 : -1)
>>>>>>> main
      const datesSorted = [...dates].sort(antiChrono)
      expect(dates).toEqual(datesSorted)
    })
  })
  describe('When I am on bills page but it is loading', () => {
    test('Then, Loading page should be rendered', () => {
      const html = BillsUI({ loading: true })
      document.body.innerHTML = html
      expect(screen.getAllByText('Loading...')).toBeTruthy()
    })
  })
  describe('When I am on bills page but back-end send an error message', () => {
    test('Then, Error page should be rendered', () => {
      const html = BillsUI({ error: 'some error message' })
      document.body.innerHTML = html
      expect(screen.getAllByText('Erreur')).toBeTruthy()
    })
  })
})

describe('When I am connected as an employee and I am on the bills page', () => {
  describe('When I click on the Make New Bill button', () => {
    test('A new bill modal should open', () => {
      Object.defineProperty(window, 'localStorage', {value: localStorageMock})
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const html = BillsUI({data: []})
      document.body.innerHTML = html
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({pathname})
      }
      const firestore = null
      const bill = new Bills({ document, onNavigate, firestore, localStorage: window.localstorage })

      const handleClickNewBill = jest.fn(bill.handleClickNewBill)
      const newBillIcon = screen.getByTestId('btn-new-bill')
      newBillIcon.addEventListener('click', handleClickNewBill)
      userEvent.click(newBillIcon)
      expect(handleClickNewBill).toHaveBeenCalled()

      const modal = screen.getByTestId('form-new-bill')
      expect(modal).toBeTruthy()
    })
  })

  describe('When I click on the eye icon', () => {
    test('A modal should open', () => {
      Object.defineProperty(window, 'localStorage', {value: localStorageMock})
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const html = BillsUI({ data: bills })
      document.body.innerHTML = html
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({pathname})
      }
      const firestore = null
      const bill = new Bills({ document, onNavigate, firestore, localStorage: window.localstorage })

      const handleClickIconEye = jest.fn(bill.handleClickIconEye)
      const eyeIcon = screen.getAllByTestId('icon-eye')
<<<<<<< HEAD
      eyeIcon.forEach(icon => {icon.addEventListener('click', handleClickIconEye(icon))})

      userEvent.click(eyeIcon[0])
=======
      eye[0].addEventListener('click', handleClickIconEye(eye[0]))
      userEvent.click(eye[0])
>>>>>>> main
      expect(handleClickIconEye).toHaveBeenCalled()

      const modale = screen.getByTestId('modaleFileEmployee')
      expect(modale).toBeTruthy()
    })
  })
})

//GET integration test
describe("Given I am a user connected as an Employee", () => {
  describe("When I navigate to bills page", () => {
    test("fetches bills from mock API GET", async () => {
       const getSpy = jest.spyOn(firebase, "get")
       const bills = await firebase.get()
       expect(getSpy).toHaveBeenCalledTimes(1)
       expect(bills.data.length).toBe(4)
    })
    test("fetches bills from an API and fails with 404 message error", async () => {
      firebase.get.mockImplementationOnce(() =>
        Promise.reject(new Error("Erreur 404"))
      )
      const html = BillsUI({ error: "Erreur 404" })
      document.body.innerHTML = html
      const message = await screen.getByText(/Erreur 404/)
      expect(message).toBeTruthy()
    })
    test("fetches messages from an API and fails with 500 message error", async () => {
      firebase.get.mockImplementationOnce(() =>
        Promise.reject(new Error("Erreur 500"))
      )
      const html = BillsUI({ error: "Erreur 500" })
      document.body.innerHTML = html
      const message = await screen.getByText(/Erreur 500/)
      expect(message).toBeTruthy()
    })
  })
})