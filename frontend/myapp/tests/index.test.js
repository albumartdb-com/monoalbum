import { expect, it } from "@jest/globals"
import { fireEvent, render, screen, mount } from "@testing-library/react"
import Home from "../pages/index"

describe("Home", () => {
  it("renders without crashing", () => {
    render(<Home/>)
    //screen.debug()
    const title = screen.getByText('albumartdb')
    const input = screen.getByPlaceholderText('Search for albums, artists, singles')
    expect(title).toBeInTheDocument()
    expect(input).toBeInTheDocument()
  });

  it("sets the search value to the current string", () => {
    render(<Home/>)
    const input = screen.getByPlaceholderText('Search for albums, artists, singles')
    fireEvent.change(input, {target: {value: '23'}})
    expect(input.value).toBe('23')
  })
});