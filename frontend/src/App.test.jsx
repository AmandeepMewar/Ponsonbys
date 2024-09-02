import { render, screen } from "@testing-library/react";
import App from "./App";

test("testing", () => {
  render(<App />);
  const test = screen.getByText(/learn/i, { exact: false });
  expect(test).toHaveTextContent(
    "Click on the Vite and React logos to learn more"
  );
});
