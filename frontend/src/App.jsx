import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/authProvider";
import { AppProvider } from "./context/appProvider";
import Layout from "./paginas/Layout"
import Index from "./paginas/Index";
import Login from "./paginas/Login"
import CrearCuenta from "./paginas/CrearCuenta"
import Enlaces from "./paginas/Enlaces"

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<AppProvider>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Index />} />
							<Route path='login' element={<Login />} />
							<Route path='crearcuenta' element={<CrearCuenta />} />
							<Route path='enlaces/:url' element={<Enlaces />} />
						</Route>
					</Routes>
				</AppProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
