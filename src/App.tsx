import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const router = createBrowserRouter(routes);

function App () {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </Provider>
  );
}

export default App;
