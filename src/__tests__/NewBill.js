import { fireEvent, screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { localStorageMock } from "../__mocks__/localStorage.js"
import firebase from "../__mocks__/firebase"
import { ROUTES } from "../constants/routes"


describe('Given I am connected as an employee', () => {
  describe('When I am on NewBill Page', () => {
    test('When I choose a new file to upload, the file should be loaded and handled', () => {
    	Object.defineProperty(window, 'localStorage', {value: localStorageMock})
    		window.localStorage.setItem('user', JSON.stringify({
    		type: 'Employee'
    	}))
    	const jsdomAlert = window.alert;  // remember the jsdom alert
  		window.alert = () => {};
     	const html = NewBillUI()
     	document.body.innerHTML = html
    	const onNavigate = (pathname) => {
    		document.body.innerHTML = ROUTES({pathname})
     	}
     	const firestore = null
     	const newBill = new NewBill({ document, onNavigate, firestore, localStorage: window.localStorage })
    
    	const handleChangeFile = jest.fn(newBill.handleChangeFile)
     	const fileUpload = screen.getByTestId('file')
     	fileUpload.addEventListener('change', handleChangeFile)
     	fireEvent.change(fileUpload)
     	expect(handleChangeFile).toHaveBeenCalled()
    })
    test('When I click on the submit button with the right input, my new bill should be submitted', () => {
    	Object.defineProperty(window, 'localStorage', {value: localStorageMock})
    		window.localStorage.setItem('user', JSON.stringify({
    		type: 'Employee'
    	}))
     	const html = NewBillUI()
     	document.body.innerHTML = html
    	const onNavigate = (pathname) => {
    		document.body.innerHTML = ROUTES({pathname})
     	}
     	const jsdomAlert = window.alert;  // remember the jsdom alert
		window.alert = () => {};
     	const firestore = null
     	const newBill = new NewBill({ document, onNavigate, firestore, localStorage: window.localStorage })

     	const handleSubmit = jest.fn(newBill.handleSubmit)
     	const createBill = jest.fn(newBill.createBill)
     	const submitNewBill = screen.getByTestId('form-new-bill')
     	submitNewBill.addEventListener('submit', handleSubmit)
     	fireEvent.submit(submitNewBill)
     	expect(handleSubmit).toHaveBeenCalled()
    })
  })
})