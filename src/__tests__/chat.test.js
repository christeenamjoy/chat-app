import { render, fireEvent, screen } from "@testing-library/react";
import Chat from "../components/Chat";
import { MockedProvider } from "@apollo/client/testing";

window.HTMLElement.prototype.scrollIntoView = function () {};

const setUp = () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Chat />
    </MockedProvider>
  );
};

describe("Chat component", () => {
  test("renders without crashing", () => {
    setUp();
  });

  test("renders the users dropdown with the correct options", () => {
    setUp();
    const selectElement = screen.getByTestId("select");
    expect(selectElement).toBeInTheDocument();
    expect(selectElement.children.length).toBe(3);
    expect(selectElement.children[0].value).toBe("Russell");
    expect(selectElement.children[1].value).toBe("Sam");
    expect(selectElement.children[2].value).toBe("Joyse");
    expect(selectElement.value).toBe("Russell");
  });

  test("renders the channels with the correct names", () => {
    setUp();
    const generalChannelElement = screen.getAllByTestId("channel")[0];
    expect(generalChannelElement).toBeInTheDocument();
    expect(generalChannelElement.className).toContain("bg-white");
  });

  test("renders the text area and send button correctly",  () => {
    setUp();
    const textAreaElement = screen.getByLabelText("text-area");
    const sendButton = screen.getByTestId("select");
    expect(textAreaElement).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
    expect(textAreaElement.value).toBe("");
  });

  test("updates the text area as the user types", () => {
    setUp();
    const textAreaElement = screen.getByLabelText("text-area");
    fireEvent.change(textAreaElement, { target: { value: "Hello world!" } });
    expect(textAreaElement.value).toBe("Hello world!");
  });

  test("updates the state when the user is changed", () => {
    setUp();
    const selectElement = screen.getByLabelText("select");
    fireEvent.change(selectElement, { target: { value: "Sam" } });
    expect(selectElement.value).toBe("Sam");
  });

  test("updates the state when a channel is clicked", () => {
    setUp();
    const randomChannelElement = screen.getByText(/Technology Channel/);
    fireEvent.click(randomChannelElement);
    expect(randomChannelElement.className).toContain("bg-white");
  });
});

