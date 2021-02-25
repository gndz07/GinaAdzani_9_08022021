import { fireEvent, screen } from "@testing-library/dom"
import userEvent from '@testing-library/user-event'
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { localStorageMock } from "../__mocks__/localStorage.js"
import firebase from "../__mocks__/firebase"
import { ROUTES } from "../constants/routes"
import Router from "../app/Router.js"
import '@testing-library/jest-dom';


describe('Given I am connected as an employee', () => {
  describe('When I am on NewBill Page', () => {
  	describe('When I choose a file to upload', () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      jest.spyOn(window, 'alert').mockImplementation(() => {});

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({pathname})
      }
      let firestore = null
      const newBill = new NewBill({ document, onNavigate, firestore, localStorage: window.localStorage })

      const input = screen.getByTestId('file')
      const falseAlert = jest.fn(newBill.falseAlert)
      const handleChangeFile = jest.fn(newBill.handleChangeFile)
      input.addEventListener('change', handleChangeFile)

    	test('When I choose a file in a correct format to upload, the file should be loaded and handled', async () => {
        const fileTrue = new File(['testFile'], 'testFile.jpg', {type: 'image/jpg'})

        fireEvent.change(input, { target: { files: [fileTrue] } })
        await handleChangeFile()
     		expect(handleChangeFile).toHaveBeenCalled()
        expect(input.files[0]).toStrictEqual(fileTrue)
     		expect(window.alert).not.toHaveBeenCalled()
    	})

      test('When I choose a new file in an incorrect format, there should be an alert', async () => {
        const fileFalse = new File(['testFile'], 'testFile.txt', {type: 'text/txt'})

        fireEvent.change(input, { target: { files: [fileFalse] } })
        await handleChangeFile()
        expect(handleChangeFile).toHaveBeenCalled()
        expect(input.files[0]).toStrictEqual(fileFalse)
        expect(input).toHaveValue('')
        expect(window.alert).toHaveBeenCalled()
        })
  	})
    
    test('When I click on the submit button with the right input, my new bill should be submitted and I go back to bills page', () => {
    	const html = NewBillUI()
     	document.body.innerHTML = html

    	const inputData = {
    		type: "Transports",
    		name: "test",
    		amount: "100",
    		date: "2020-12-01",
    		vat: "10",
    		pct: "20",
    		commentary: "ok",
    		fileUrl: "thisurl",
    		fileName: "thisName",
    	}

    	const billType = screen.getByTestId('expense-type')
    	userEvent.selectOptions(billType, screen.getByText('Transports'))
    	expect(billType.value).toBe(inputData.type)

    	const billName = screen.getByTestId('expense-name')
    	fireEvent.change(billName, { target: { value: inputData.name } })
    	expect(billName.value).toBe(inputData.name)

   		const billDate = screen.getByTestId('datepicker')
    	fireEvent.change(billDate, { target: { value: inputData.date } })
    	expect(billDate.value).toBe(inputData.date)

    	const billVat = screen.getByTestId('vat')
    	fireEvent.change(billVat, { target: { value: inputData.vat } })
    	expect(billVat.value).toBe(inputData.vat)

    	const billPct = screen.getByTestId('pct')
    	fireEvent.change(billPct, { target: { value: inputData.pct } })
    	expect(billPct.value).toBe(inputData.pct)

    	const billComment = screen.getByTestId('commentary')
    	fireEvent.change(billComment, { target: { value: inputData.commentary } })
    	expect(billComment.value).toBe(inputData.commentary)

    	const submitNewBill = screen.getByTestId('form-new-bill')
      Object.defineProperty(window, 'localStorage', { value: localStorageMock})
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee',
        email: 'johndoe@email.com'
      }))

    	const onNavigate = (pathname) => {
    		document.body.innerHTML = ROUTES({pathname})
    	}

    	const PREVIOUS_LOCATION = ''

    	const firestore = null
    	const newBill = new NewBill({ document, onNavigate, firestore, localStorage: window.localStorage })

    	const handleSubmit = jest.fn(newBill.handleSubmit)	
   		submitNewBill.addEventListener('submit', handleSubmit)
        
     	fireEvent.submit(submitNewBill)
     	expect(handleSubmit).toHaveBeenCalled()
      expect(screen.getAllByText('Mes notes de frais')).toBeTruthy()
    })
  })
})

/*
//POST integration test
describe("Given I am a user connected as an Employee", () => {
  describe("When I submit new bill", () => {
    test("post bill to mock API SET", async () => {
       const getSpy = jest.spyOn(firebase)
       const newBill = await firebase.set()
       expect(getSpy).toHaveBeenCalledTimes(1)
       expect(bills.data.length).toBe(5)
    })
  })
})
*/