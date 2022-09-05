import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login, { IUser } from "./Login";
import { Validation } from "../../hooks/Validation";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../../App";

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

jest.mock('../../hooks/Validation', () => {
    return {
        Validation: jest.fn(),
    }
});

test("email input rendered", () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText(/Email address/i)
    expect(emailInput).toBeInTheDocument()
})

test("password input rendered", () => {
    render(<Login />);
    const passwordInput = screen.getByPlaceholderText(/Password/i)
    expect(passwordInput).toBeInTheDocument()
})

test("button rendered", () => {
    render(<Login />);
    const buttonEl = screen.getByRole("button", { name: "Log In" })
    expect(buttonEl).toBeInTheDocument()
})

test("email input check empty", () => {
    render(<Login />);
    const emailInput: HTMLInputElement = screen.getByPlaceholderText(/Email address/i);
    expect(emailInput.value).toBe("")
    expect(emailInput.name).toBe("email")
})

test("password input check empty", () => {
    render(<Login />);
    const passwordInput: HTMLInputElement = screen.getByPlaceholderText(/Password/i);
    expect(passwordInput.value).toBe("")
    expect(passwordInput.name).toBe("password")
})

test("button check disabled", () => {
    render(<Login />);
    const buttonEl = screen.getByRole("button", { name: "Log In" })
    expect(buttonEl).toBeDisabled();
})

test("email input should change", () => {
    render(<Login />);
    const emailInputEl: HTMLInputElement = screen.getByPlaceholderText(/Email address/i);
    const testValue = "test";

    fireEvent.change(emailInputEl, { target: { value: testValue } });
    expect(emailInputEl.value).toBe(testValue);
});

test("password input should change", () => {
    render(<Login />);
    const passwordInputEl: HTMLInputElement = screen.getByPlaceholderText(/Password/i);
    const testValue = "test";

    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    expect(passwordInputEl.value).toBe(testValue);
});

test("button should not be disabled", () => {
    render(<Login />);
    const buttonEl = screen.getByRole("button",{name:"Log In"});
    const emailInputEl = screen.getByPlaceholderText(/Email address/i);
    const passwordInputEl = screen.getByPlaceholderText(/Password/i);
  
    const testValue = "test";
  
    fireEvent.change(emailInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
  
    expect(buttonEl).not.toBeDisabled();
  });
  

test("form validation works properly", () => {
    render(<Login />);

    const errorText = screen.getByTestId("error-text");
    const errorPassword = screen.getByTestId("error-password");
    (Validation as jest.MockedFunction<any>).mockReturnValue({ email: "email error", password: "password error" });
    expect(errorText).toHaveTextContent("");
    expect(errorPassword).toHaveTextContent("");
    fireEvent.submit(screen.getByRole("button", { name: "Log In" }));
    expect(errorText).toHaveTextContent("email error");
    expect(errorPassword).toHaveTextContent("password error")
})

test("submit login", () => {
    const formData = {
        email: "arazmemmedli@gmail.com",
        password: "11may2002"
    }
    render(<Router><App /></Router>)
    fireEvent.paste(screen.getByPlaceholderText(/Email address/i), formData.email);
    fireEvent.paste(screen.getByPlaceholderText(/Password/i), formData.password);
    (Validation as jest.MockedFunction<any>).mockReturnValue({ email: "", password: "" });
    fireEvent.submit(screen.getByRole("button", { name: "Log In" }));
    expect(screen.queryByTestId('test-head')).not.toBeInTheDocument();
})

